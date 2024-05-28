import { useSchemaStore } from '~/state/schema';
import { type ISchemaOpt, type ISectionOpt } from '~/typings/schemaopt';
import { type ITplSchema } from '~/typings/template';

const getTemplate = (schema: ISchemaOpt | null, section?: ISectionOpt | null) => {
	if (schema) {
		const { templates } = schema;

		let templateId = schema?.template;

		if (section?.template) {
			templateId = section.template;
		}

		const template = templates?.find((t: ITplSchema): boolean => t._id === templateId) ?? null;
		return template;
	}

	return null;
};

const useTemplate = (section?: ISectionOpt | null): ITplSchema | null => {
	const schema = useSchemaStore.getState().schema;
	if (schema) {
		return getTemplate(schema, section);
	}
	return null
};

export default useTemplate;
export { getTemplate };
