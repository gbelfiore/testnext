import { useSchemaStore } from "~/state/schema";
import { EventNames } from "~/utilities/event-tracker/enums";
import { EventsArgs, IProvider } from "~/utilities/event-tracker/typings";
import { EventPayloads } from "~/utilities/event-tracker/typings";
import { SmartViewerRetailerDataLayerEventPayloads } from "./typings";
import { useQueryStringStore } from "~/state/queryString";
import { IProductOpt, ISchemaOpt, ISectionOpt } from "~/typings/schemaopt";

const PRECISION_IN_MS = 500;

function formatDate(timestamp: number) {
  const date = new Date(timestamp);

  const roundedTime =
    Math.round(date.getMilliseconds() / PRECISION_IN_MS) * PRECISION_IN_MS;
  date.setMilliseconds(roundedTime);

  return date.toISOString();
}

const eventFields = {
  flyer: {
    getId: (schema: ISchemaOpt) => ({
      id: schema.id ? `${schema.id}` : "",
    }),
  },
  section: {
    getName: (section: ISectionOpt) => ({
      section: section.name || "",
    }),
  },
  product: {
    getName: (product: IProductOpt) => ({
      product_name: product.name || "",
    }),
    getPosition: (product: IProductOpt) => ({
			product_position: typeof product.position === 'number' ? `${product.position}` : '',
		}),
    getFullPrice: (product: IProductOpt) => ({
      full_price: product.price?.full || "",
    }),
    getDiscountedPrice: (product: IProductOpt) => ({
      discounted_price: product.price?.discounted || "",
    }),
  },
  qs: {
    getCustomLabel: () => ({
      custom_label: useQueryStringStore.getState()?.params?.svCustomLabel || "",
    }),
    getTitle: () => ({
			title: useQueryStringStore.getState()?.params?.svFlyerTitle || '',
		}),
  },
  date: {
    getOriginalTimestamp: () => ({
      original_timestamp: formatDate(Date.now()),
    }),
  },
  cta: {
    getLabel: (data: EventsArgs[EventNames.CTA_CLICK]) => ({
      cta_label: data.ctaLabel || "",
    }),
    getUrl: (data: EventsArgs[EventNames.CTA_CLICK]) => ({
      url: data.ctaUrl || "",
    }),
  },
};

function isParentIframeAvailable() {
  try {
    if (
      window.parent === window.self ||
      typeof window.parent.postMessage !== "function"
    )
      return false;
    return true;
  } catch {
    return false;
  }
}

function sendSvRetailerDataLayerEvent(
  params: SmartViewerRetailerDataLayerEventPayloads[keyof SmartViewerRetailerDataLayerEventPayloads],
) {
  const targetOrigin = process.env.NEXT_PUBLIC_SV_TARGET_ORIGIN || "*";

  window.parent.postMessage(
    {
      eventType: "retailerDataLayerNextEvent", // retailerDataLayerNextEvent is used in SV
      data: params,
    },
    targetOrigin,
  );
}

class SVRetailerDataLayer implements IProvider {
  private static _instance: SVRetailerDataLayer;

  // https://doveconviene.atlassian.net/browse/RPUB-652
  private _allowedMethods: EventNames[] = [
    EventNames.FLYER_OPEN, // Open
    EventNames.PRODUCT_IMPRESSION, // Product impression
    EventNames.FLYOUT_OPEN, // Product details opened
    EventNames.CTA_CLICK, // Product CTA
  ];

  public static get instance(): SVRetailerDataLayer {
    if (!this._instance) this._instance = new SVRetailerDataLayer();
    return this._instance;
  }

  public get allowedMethods(): EventNames[] {
    if (!isParentIframeAvailable()) return [];

    const params = useQueryStringStore.getState()?.params;
    const isSv = params?.isSv === "1";
    const svEnableRetailerDataLayer = params?.svEnableRetailerDataLayer === "1";

    if (!isSv || !svEnableRetailerDataLayer) return [];

    return this._allowedMethods;
  }

  constructor() {}

  sendEvent<T extends EventNames>(
    params: EventPayloads[T],
    eventName?: EventNames | undefined,
  ): Promise<void> {
    return Promise.resolve();
  }

  private getEntities(sectionIndex: number, productIndex: number) {
    const state = useSchemaStore.getState();
    if (!state.schema) return undefined;

    const section = state.schema.sections?.[sectionIndex];
    if (!section) return undefined;

    const product: IProductOpt | undefined = section.products?.[productIndex];
    if (!product) return undefined;

    return {
      anyData: true,
      schema: state.schema,
      section,
      product,
    };
  }

  public async [EventNames.FLYER_OPEN](): Promise<void> {
    const { schema } = useSchemaStore.getState();
    if (!schema) return;

    const payload: SmartViewerRetailerDataLayerEventPayloads[EventNames.FLYER_OPEN] =
      {
        event: "catalogue_opened",
        ...eventFields.flyer.getId(schema),
        ...eventFields.qs.getCustomLabel(),
        ...eventFields.qs.getTitle(),
        format: "next",
        validity_start: schema.dateFrom
          ? formatDate(new Date(schema.dateFrom).getTime())
          : "",
        validity_end: schema.dateTo
          ? formatDate(new Date(schema.dateTo).getTime())
          : "",
        ...eventFields.date.getOriginalTimestamp(),
      };

    sendSvRetailerDataLayerEvent(payload);
  }

  public async [EventNames.PRODUCT_IMPRESSION](
    data: EventsArgs[EventNames.PRODUCT_IMPRESSION],
  ): Promise<void> {
    if (data.productIndex <= -1) return;

    const entities = this.getEntities(data.sectionIndex, data.productIndex);
    if (!entities?.anyData) return;
    const { schema, section, product } = entities;

    const payload: SmartViewerRetailerDataLayerEventPayloads[EventNames.PRODUCT_IMPRESSION] =
      {
        event: "product_impression",
        ...eventFields.flyer.getId(schema),
        ...eventFields.qs.getCustomLabel(),
        ...eventFields.qs.getTitle(),
        format: "next",
        ...eventFields.section.getName(section),
        ...eventFields.product.getName(product),
        ...eventFields.product.getPosition(product),
        ...eventFields.product.getFullPrice(product),
        ...eventFields.product.getDiscountedPrice(product),
        ...eventFields.date.getOriginalTimestamp(),
      };

    sendSvRetailerDataLayerEvent(payload);
  }

  public async [EventNames.MEDIA_PRODUCT_IMPRESSION](
    data: EventsArgs[EventNames.MEDIA_PRODUCT_IMPRESSION],
  ): Promise<void> {
    // noop
  }

  public async [EventNames.FLYOUT_OPEN](
    data: EventsArgs[EventNames.FLYOUT_OPEN],
  ): Promise<void> {
    if (data.productIndex <= -1) return;

    const entities = this.getEntities(data.sectionIndex, data.productIndex);
    if (!entities?.anyData) return;
    const { schema, section, product } = entities;

    const payload: SmartViewerRetailerDataLayerEventPayloads[EventNames.FLYOUT_OPEN] =
      {
        event: "product_details_opened",
        ...eventFields.flyer.getId(schema),
        ...eventFields.qs.getCustomLabel(),
        ...eventFields.qs.getTitle(),
        format: "next",
        ...eventFields.section.getName(section),
        ...eventFields.product.getName(product),
        ...eventFields.product.getFullPrice(product),
        ...eventFields.product.getDiscountedPrice(product),
        ...eventFields.date.getOriginalTimestamp(),
      };

    sendSvRetailerDataLayerEvent(payload);
  }

  public async [EventNames.CTA_CLICK](
    data: EventsArgs[EventNames.CTA_CLICK],
  ): Promise<void> {
    if (data.productIndex <= -1) return;

    const entities = this.getEntities(data.sectionIndex, data.productIndex);
    if (!entities?.anyData) return;
    const { schema, section, product } = entities;

    const payload: SmartViewerRetailerDataLayerEventPayloads[EventNames.CTA_CLICK] =
      {
        event: "product_cta_clicked",
        ...eventFields.flyer.getId(schema),
        ...eventFields.qs.getCustomLabel(),
        ...eventFields.qs.getTitle(),
        format: "next",
        ...eventFields.section.getName(section),
        ...eventFields.product.getName(product),
        ...eventFields.product.getFullPrice(product),
        ...eventFields.product.getDiscountedPrice(product),
        ...eventFields.cta.getLabel(data),
        ...eventFields.cta.getUrl(data),
        ...eventFields.date.getOriginalTimestamp(),
      };

    sendSvRetailerDataLayerEvent(payload);
  }

  public async [EventNames.MEDIA_CLICK](
    data: EventsArgs[EventNames.MEDIA_CLICK],
  ): Promise<void> {
    // noop
  }
}

export type SVRetailerDataLayerKeys = keyof SVRetailerDataLayer;
export { SVRetailerDataLayer };
