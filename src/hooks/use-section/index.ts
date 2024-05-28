import { useSchemaStore } from '~/state/schema';
import { type ISectionOpt } from '~/typings/schemaopt';

const useSection = (sectionIndex: number | undefined | null): ISectionOpt | undefined => {
	const schema = useSchemaStore.getState().schema;
	if (sectionIndex == undefined) return undefined;
	return schema?.sections?.[sectionIndex];
};

export default useSection;
