import { useSchemaStore } from '~/state/schema';
import { type ITplSchema } from '~/typings/template';
import { getTemplate } from '../use-template';
import { type ISchemaOpt, type ISectionOpt } from '~/typings/schemaopt';

const getTemplateSections = (schema: ISchemaOpt | null, section?: ISectionOpt | null) => {
	if (schema) {

		const templates: ITplSchema[] = [];
		schema.sections?.forEach((section) => {
			let template: ITplSchema | null;
			if (section.template) {
				template = getTemplate(schema, section);
				if (template) {
					templates.push(template);
				}
			}
		});

		return templates;

	}

	return null;
};

const useTemplateSections = (): ITplSchema[] | null => {
	const { schema } = useSchemaStore((state) => state);
	if (schema) {
		return getTemplateSections(schema);
	}
	return null;
};

export default useTemplateSections;
export { getTemplateSections }
