import { EventNames } from '~/utilities/event-tracker/enums';

export interface FlyerOpen {
  event: "catalogue_opened",
  id: string,
  custom_label: string,
  title: string,
  format: "next"
  validity_start: TDateISO | "",
  validity_end: TDateISO | "",
  original_timestamp: TDateISO,
}

export interface ProductImpression {
  event: "product_impression",
  id: string,
  custom_label: string,
  title: string,
  format: "next",
  section: string,
  product_name: string,
  full_price: string,
  discounted_price: string,
  original_timestamp: TDateISO,
}

export interface ProductDetailsOpened {
  event: "product_details_opened",
  id: string,
  custom_label: string,
  title: string,
  format: "next",
  section: string,
  product_name: string,
  full_price: string,
  discounted_price: string,
  original_timestamp: TDateISO,
}

export interface ProductCTA {
  event: "product_cta_clicked",
  id: string,
  custom_label: string,
  title: string,
  format: "next",
  section: string,
  product_name: string,
  full_price: string,
  discounted_price: string,
  cta_label: string,
  url: string,
  original_timestamp: TDateISO,
}

export type SmartViewerRetailerDataLayerEventPayloads = {
  [EventNames.FLYER_OPEN]: FlyerOpen,
  [EventNames.PRODUCT_IMPRESSION]: ProductImpression,
  [EventNames.FLYOUT_OPEN]: ProductDetailsOpened,
  [EventNames.CTA_CLICK]: ProductCTA,
}