import { useSchemaStore } from '~/state/schema';
import { IProductOpt, ISectionOpt } from '~/typings/schemaopt';

const useSectionProduct = (product: IProductOpt | null): ISectionOpt | undefined => {
	const { schema } = useSchemaStore((state) => state);

	if (!product) return undefined;
	const sectionFind = schema?.sections?.find((s) => {
		const productFind = s.products?.find((p) => p.name === product.name);
		if (productFind) return true;
		return false;
	});
	return sectionFind;
};

export default useSectionProduct;
