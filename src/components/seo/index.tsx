import { type ITplSchema } from "~/typings/template";
import { Stylesheets } from "./stylesheets";
import { ISchemaOpt } from "~/typings/schemaopt";
import { PreloadImage } from "./preload-image";

interface ISeoProps {
  template: ITplSchema | null;
  templateSections: ITplSchema[] | null;
  schema: ISchemaOpt;
}
const Seo = ({ schema, template, templateSections }: ISeoProps) => {
  return (
    <>
      <Stylesheets
        template={template}
        templateSections={templateSections}
        onlyPrelod={true}
      />
      <PreloadImage schema={schema} template={template} />
    </>
  );
};

export { Seo };
