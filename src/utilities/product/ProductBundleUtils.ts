import { IProductOpt, ISchemaOpt } from "~/typings/schemaopt"
import { VirtualizationConfig } from "./VirtualizationUtility"
import { ITplSchema } from "~/typings/template"

export class ProductBundleUtils {
    static getBundleHeightPriceBlock(isRow = true) {
        return 110
    }
    static getHeightProductHorizontal(isDesktop: boolean) {
        return isDesktop ? VirtualizationConfig.bundledHeights.productHorizontalDesk : VirtualizationConfig.bundledHeights.productHorizontalMobile
    }

    static getBundleHeaderHeight(product: IProductOpt | null) {
        if (product && product.name && product.name.trim() !== '') {
            return 52
        }
        return 0
    }

    static getBundleColumnCount(product: IProductOpt | null) {
        return parseInt(`${product?.bundleInfo?.columnsNumber || 0}`) || 2
    }

    static getBundleProductHeight(product: IProductOpt | null, template: ITplSchema | null, schema: ISchemaOpt | null, isDesktop = false) {
        if (!product || !template || !schema) {
            return 0
        }
        const columnsCount = ProductBundleUtils.getBundleColumnCount(product)

        const getHeightVertical = () => {
            let toAdd = 0
            const header = ProductBundleUtils.getBundleHeaderHeight(product)
            toAdd += header
            let productsHeight = 0
                ; (product.bundleProducts || []).forEach(() => {
                    productsHeight += ProductBundleUtils.getHeightProductHorizontal(isDesktop)
                })
            toAdd += productsHeight
            toAdd += ProductBundleUtils.getBundleHeightPriceBlock(true)
            const gapHeight = (2) * VirtualizationConfig.bundledHeights.gap
            toAdd += gapHeight
            return toAdd
        }

        const getHeightHorizontal = () => {
            let toAdd = 0
            const header = ProductBundleUtils.getBundleHeaderHeight(product)
            toAdd += header

            const totalProducts = (product.bundleProducts || []).length
            const isExactRows = totalProducts % columnsCount === 0

            if (isExactRows) {
                const rows = totalProducts / columnsCount
                toAdd += VirtualizationConfig.bundledHeights.productVerticalDesk * rows
                toAdd += ProductBundleUtils.getBundleHeightPriceBlock(false)
                toAdd += 2 * VirtualizationConfig.bundledHeights.gap

                return toAdd
            }
            const rows = Math.ceil(totalProducts / columnsCount)
            toAdd += VirtualizationConfig.bundledHeights.productVerticalDesk * rows
            toAdd += 2 * VirtualizationConfig.bundledHeights.gap
            return toAdd
        }

        return isDesktop ? getHeightHorizontal() : getHeightVertical()
    }
}
