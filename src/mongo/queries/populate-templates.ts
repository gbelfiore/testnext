import { ObjectId } from "mongodb";
import { getTemplateByIds } from "./get-template-by-ids";
import { cache } from "react";

const populateTemplates = cache(async (sa: any) => {
  const templatesReferences = sa.templates?.map((t: any) => new ObjectId(t)) ?? [];
  const templates = [new ObjectId(sa.template), ...templatesReferences];
  const templatesResult = getTemplateByIds(templates);
  return templatesResult;
});

export { populateTemplates };
