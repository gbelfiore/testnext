import { useSchemaStore } from "~/state/schema";
import { BrowserService } from "~/utilities/browser-service";

const TitleComponent = () => {
  const retailerName = useSchemaStore.getState().schema?.retailer?.name;
  // const dateFrom = useSchemaStore((state) => state.schema?.dateFrom);
  // const dateTo = useSchemaStore((state) => state.schema?.dateTo);
  const titleComposer = [];

  if (retailerName) titleComposer.push(retailerName);

  const seoTitle = titleComposer.join(" - ");

  if (!seoTitle || BrowserService.isBackoffice) return null;

  return <title>{seoTitle}</title>;
};

export const Title = TitleComponent;
