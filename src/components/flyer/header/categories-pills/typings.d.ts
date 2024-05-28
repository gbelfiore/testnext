import type { ISchemaOpt, ISectionOpt } from "~/typings/schemaopt";

interface CategoriesPillsProps {
  openSection?: (id: ISectionOpt["id"]) => void;
  navKey?: string;
  schema?: ISchemaOpt;
  name?: string;
  isFullPage?: boolean;
}

export { CategoriesPillsProps };
