import { getTemplate } from '~/hooks/use-template'
import type { ISchemaOpt, ISectionOpt } from '~/typings/schemaopt'
import ProductUtils from './ProductUtils'
import { ITplCssVars } from '~/typings/template'
import { isEmpty } from 'lodash-es'
import { eProductModifier } from '~/typings/eModifier'
import MediaUtils from './MediaUtils'
import { ProductBundleUtils } from './ProductBundleUtils'

// interface IProdInfo {
//   sectionIndex: number
//   productIndex: number
//   width?: string
// }

const VirtualizationConfig = {
  headerDesktop: 57,
  headerMobile: 100,
  windowWidth: Math.min(globalThis.innerWidth, 758),

  // singleCellHeight: Math.max(Math.min(globalThis.innerWidth, 758) * 0.5, 219),
  // wideCellHeight: Math.max(Math.min(globalThis.innerWidth, 758) * 0.5, 226),
  // variantsSingleCellHeight: Math.max(Math.min(globalThis.innerWidth, 758) * 0.75, 270),
  // variantsWideCellHeight: Math.max(Math.min(globalThis.innerWidth, 758) * 0.75, 270),
  // pairedWideCellHeight: Math.max(Math.min(globalThis.innerWidth, 758) * 0.75, 270),
  // pairedSingleCellHeight: Math.max((Math.min(globalThis.innerWidth, 758) / 2) * 0.75, 270),

  singleCellHeight: 300,
  wideCellHeight: 226,

  variantsSingleCellHeight: 35,
  pairedSingleCellHeight: 20,
  subNameSingleCellHeight: 40,

  variantsWideCellHeight: 0,
  pairedWideCellHeight: 0,
  subNameWideCellHeight: 0,

  stickyHeadingHeight: 104,
  sectionPaddingBottom: 12,
  bundledHeights: {
    // header: Math.max(Math.min(globalThis.innerWidth, 758) * 0.142, 72),
    productHorizontalMobile: 128,
    productHorizontalDesk: 180,
    productVerticalDesk: 363,
    gap: Math.max(Math.min(globalThis.innerWidth, 758) * 0.014, 8),
  },
  mediaMultiImages: 600,
  headerMediaMultiImages: 70,
  dotsMediaMultiImages: 35,
}

const getSectionStickyHeaderHeight = (schema: ISchemaOpt, section: ISectionOpt): number => {
  if (!section.name) return 0
  const template = getTemplate(schema, section)
  const sectionHeaderHeight = template?.fontInfoCssVars.sectionHeaderLineHeight
  if (sectionHeaderHeight) return Number(sectionHeaderHeight.split('px')[0])
  return VirtualizationConfig.stickyHeadingHeight
}

const getSectionHeaderHeight = (section: ISectionOpt, isDesktop?: boolean): number => {
  if (!section.header) return 0
  return MediaUtils.getMediaHeight(section.header, isDesktop)
}

const getColumnCount = (schema: ISchemaOpt | null, isDesktop?: boolean) => {
  return isDesktop ? schema?.columnsCount ?? 2 : 2
}

const getSectionProductsHeight = (
  schema: ISchemaOpt,
  section: ISectionOpt,
  sectionIndex: number,
  isDesktop?: boolean
): number => {
  const template = getTemplate(schema, section)
  const { gridColor, gridThickness } = (template?.cssVars as ITplCssVars) ?? {}
  const withGrid = gridColor && gridThickness
  const productInfo = template?.productInfo

  const columnsCount = getColumnCount(schema, isDesktop)
  const productsCount = section?.products?.length ?? 0

  let productsHeight = 0

  //calc for first row: if it not has name or not have cover => no top bord else top bord
  let countBorderRow = isEmpty(section.name) && isEmpty(section.header) ? 0 : 1

  for (let index = 0; index < productsCount; index++) {
    const product = section.products?.[index]

    const isFirst = index == 0
    const isWide = product.modifier === eProductModifier.WIDE
    const isMedia = ProductUtils.checkMediaProduct(product)
    const isBundled = ProductUtils.checkBundleProduct(product)

    const prevProduct = section?.products?.[index - 1]
    const isMediaPrev = ProductUtils.checkMediaProduct(prevProduct)

    if (isBundled) {
      productsHeight += ProductBundleUtils.getBundleProductHeight(product, template, schema, isDesktop)
      countBorderRow += isMediaPrev || isFirst ? 2 : 1
    } else if (isMedia) {
      productsHeight += MediaUtils.getMediaHeight(product, isDesktop)
      //countBorderRow++ //sommo perchè quando c'è un media metto anche un bordo sul lato superiore
    } else if (isWide) {
      productsHeight += ProductUtils.getWideCellHeight(product, productInfo)
      countBorderRow += isMediaPrev || isFirst ? 2 : 1
    } else {
      let subIndex
      let countRowElement = 1

      let maxHeight = ProductUtils.getSingleCellHeight(product, productInfo)

      for (subIndex = index + 1; subIndex < productsCount; subIndex++) {
        const nextProduct = section?.products?.[subIndex]
        const isWideNext = nextProduct.modifier === 'wide'

        const isMediaNext = ProductUtils.checkMediaProduct(nextProduct)
        const isBundledNext = ProductUtils.checkBundleProduct(nextProduct)

        if (isMediaNext || isWideNext || isBundledNext || countRowElement == columnsCount) {
          countBorderRow += isMediaPrev || isFirst ? 2 : 1
          break
        } else {
          maxHeight = Math.max(maxHeight, ProductUtils.getSingleCellHeight(nextProduct, productInfo))
          countRowElement++
        }
      }

      productsHeight += maxHeight
      index = subIndex - 1
    }
  }

  //padding base
  productsHeight +=
    schema.sections && (!isEmpty(schema.sections[sectionIndex + 1]?.name) || sectionIndex == schema.sections.length - 1)
      ? VirtualizationConfig.sectionPaddingBottom
      : 0

  //border-bottom space

  if (withGrid) {
    productsHeight += countBorderRow * parseInt(gridThickness)
  }
  return productsHeight
}
const getSectionFooterHeight = (section: ISectionOpt, isDesktop?: boolean): number => {
  if (!section.footer) return 0
  return MediaUtils.getMediaHeight(section.footer, isDesktop)
}

const getSectionHeight = (
  schema: ISchemaOpt,
  section: ISectionOpt,
  sectionIndex: number,
  isDesktop?: boolean
): number => {
  // const stickyHeaderHeight = getSectionStickyHeaderHeight(schema, section);
  const headerHeight = getSectionHeaderHeight(section, isDesktop)
  const productsHeight = getSectionProductsHeight(schema, section, sectionIndex, isDesktop)
  const footerHeight = getSectionFooterHeight(section, isDesktop)

  // const total = stickyHeaderHeight + headerHeight + productsHeight + footerHeight;
  const total = headerHeight + productsHeight + footerHeight

  return total ?? 0
}

const getCoverHeight = (schema: ISchemaOpt) => {
  return MediaUtils.getImageHeight(schema.coverImage)
}

const getBackCoverHeight = (schema: ISchemaOpt) => {
  return MediaUtils.getImageHeight(schema.backcoverImage)
}

export {
  VirtualizationConfig,
  getSectionHeight,
  getCoverHeight,
  getBackCoverHeight,
  getSectionStickyHeaderHeight,
  getColumnCount,
}
