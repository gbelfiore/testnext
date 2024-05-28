import { HeaderContent } from '~/components/flyer/header/header-content/HeaderContent'
import { MainHeader } from '~/components/flyer/header/main-header/main-header-ssr'
import { getSchemaWithStore } from '~/mongo/api/schema-with-store'
import { TFlatMapProduct } from '~/typings/flatMapProducts'
import { IProductOpt, ISchemaOpt } from '~/typings/schemaopt'

interface ISearchProps {
  params: { slug: string; flyerId: string }
  searchParams: any
}

const getFlatMapProducts = (flyer: ISchemaOpt): TFlatMapProduct => {
  const flatMap: TFlatMapProduct = {}
  flyer.sections?.forEach((section, sectionIndex) => {
    section.products?.forEach((product: IProductOpt, productIndex) => {
      if (product.id) {
        flatMap[product.id] = {
          product,
          productIndex,
          section,
          sectionIndex,
        }

        if (product.children) {
          product.children.forEach((variant, variantIndex) => {
            if (variant.id) {
              flatMap[variant.id] = {
                product: variant,
                productIndex: variantIndex,
                section,
                sectionIndex,
                parentProduct: product,
                variantIndex: variantIndex,
              }
            }
          })
        }
      }
    })
  })
  return flatMap
}

const SearchPage = async ({ params, searchParams }: ISearchProps) => {
  const flyer = await getSchemaWithStore(params, searchParams)

  const flatMapProducts = getFlatMapProducts(flyer.value)

  return (
    <MainHeader schema={flyer.value} isFullPage>
      <HeaderContent isSearch={true} schema={flyer.value} urlParams={params} flatMapProducts={flatMapProducts} />
    </MainHeader>
  )
}

export default SearchPage
