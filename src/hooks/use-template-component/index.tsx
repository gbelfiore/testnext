import { useSchemaStore } from '~/state/schema';
import { type IProductOpt, type ISchemaOpt, type ISectionOpt } from '~/typings/schemaopt';
import { type ITplSchema } from '~/typings/template';
import { type TTplComponents, type TType } from '~/typings/templateComponents';
import useTemplate from '../use-template';

const getTemplateComponent = (
	schema: ISchemaOpt | null,
	component: TType,
	template?: ITplSchema | null,
	section?: ISectionOpt | null,
	product?: IProductOpt | null
): TTplComponents | null => {
	if (schema) {
		let templateComponentId = template?.templateComponents?.[component];

		if (section?.templateComponents?.[component]) {
			templateComponentId = section?.templateComponents?.[component];
		}

		if (product?.templateComponents?.[component]) {
			templateComponentId = product?.templateComponents[component];
		}

		if (templateComponentId) {
			const { templatesComponents } = schema;
			const templateComponent = templatesComponents?.find((t) => t._id === templateComponentId) ?? null;
			return templateComponent;
		}
		return null;
	}

	return null;
};

const useTemplateComponent = (component: TType, section?: ISectionOpt | null, product?: IProductOpt | null): TTplComponents | null => {
	const { schema } = useSchemaStore((state) => state);
	const template = useTemplate(section);
	if (!section) return null;	
	return getTemplateComponent(schema, component, template, section, product);
};

export default useTemplateComponent;
export { getTemplateComponent };
