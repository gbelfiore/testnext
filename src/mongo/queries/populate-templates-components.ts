import { ObjectId } from "mongodb";
import { getTemplateComponentByIds } from "./get-template-component-by-ids";
import { cache } from "react";

const populateTemplatesComponents = cache(async (sa: any) => {
  let templatesComponentsReferences =
    sa.templatesComponents?.map((t: any) => new ObjectId(t)) ?? [];
  if (sa.template.templateComponents) {
    templatesComponentsReferences = [
      ...templatesComponentsReferences,
      ...Object.values(sa.template.templateComponents),
    ];
  }
  const templatesComponentsResult = getTemplateComponentByIds(templatesComponentsReferences);
  return templatesComponentsResult;
});

export { populateTemplatesComponents };
