import { IProductOpt, ISchemaOpt, ISectionOpt } from '~/typings/schemaopt';

class SchemaUtility {
	static getProduct(schema: ISchemaOpt | null, productId: string | undefined): IProductOpt | null {
		const sections = [...(schema?.sections ?? [])];
		let product: IProductOpt | null = null;
		if (sections && productId) {
			for (const section of sections) {
				if (section.products) {
					for (const prod of section.products) {
						if (prod.id === productId) {
							product = prod;
							break;
						}
					}
				}
			}
		}
		return product;
	}

	static getSectionById(schema: ISchemaOpt, sectionId: string): ISectionOpt | null {
		const section = schema?.sections?.find(s => s.id == sectionId)
		return section ?? null;
	}

	static getSectionIndexById(schema: ISchemaOpt, sectionId: string): number {
		const sectionIndex = schema?.sections?.findIndex(s => s.id == sectionId)
		return sectionIndex ?? -1;
	}

	static getSectionByProductId(schema: ISchemaOpt | null, productId: string | undefined): ISectionOpt | null {
		const sections = [...(schema?.sections ?? [])];
		let section: ISectionOpt | null = null;
		if (sections && productId) {
			for (const sec of sections) {
				if (sec.products) {
					for (const prod of sec.products) {
						if (prod.id === productId) {
							section = sec;
							break;
						}
					}
				}
			}
		}
		return section;
	}
}

export default SchemaUtility;
