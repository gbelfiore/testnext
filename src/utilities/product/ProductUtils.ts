import { IProductOpt } from '~/typings/schemaopt'
import { ITplProductInfo } from '~/typings/template'
import { VirtualizationConfig } from './VirtualizationUtility'
import { isEmpty } from 'lodash-es'

import { TSubModifier, eProductCellSubModifier, eProductModifier, eProductWideSubModifier } from '~/typings/eModifier'

import CellSizes from '~/utilities/product/product-sizes/cell.json'
import WideSizes from '~/utilities/product/product-sizes/wide.json'

class ProductUtils {
  static checkExistsPairedProduct(product?: IProductOpt): boolean {
    if (!product) return false
    const { pairedProduct } = product
    return Boolean(
      pairedProduct &&
        ((pairedProduct.description && pairedProduct.description !== '') ||
          (pairedProduct.productImage && pairedProduct.productImage !== '') ||
          (pairedProduct.heading && pairedProduct.heading !== ''))
    )
  }

  static checkBundleProduct(product?: IProductOpt): boolean {
    if (!product) return false
    return (product?.bundleProducts || []).length > 0
  }

  static checkVariantsProduct(product?: IProductOpt): boolean {
    if (!product) return false
    return product?.children ? product.children.length > 0 : false
  }

  static checkMultiImageProduct(product?: IProductOpt): boolean {
    if (!product) return false
    return product.productMultiImages ? product.productMultiImages.length > 0 : false
  }

  static checkMediaProduct(product?: IProductOpt): boolean {
    if (!product) return false
    return product.hasOwnProperty('type')
  }

  static checkSubNameProduct(product?: IProductOpt): boolean {
    if (!product) return false
    return !isEmpty(product.subName)
  }

  static getSingleCellHeight(product: IProductOpt, productInfo: ITplProductInfo | undefined) {
    const hasPaired = ProductUtils.checkExistsPairedProduct(product)
    const hasVariants = ProductUtils.checkVariantsProduct(product)
    const hasSubName = ProductUtils.checkSubNameProduct(product)

    //let singleCellHeight = ProductUtils.getSingleCellInitialHeight(productInfo)

    const { height, subNameHeight, variantsHeight, pairedHeight } = ProductUtils.getCellSizes(product)

    let cellHeight = height

    if (hasPaired) cellHeight += pairedHeight

    if (hasVariants) cellHeight += variantsHeight

    if (hasSubName) cellHeight += subNameHeight
    /*  if (hasPaired) cellHeight += VirtualizationConfig.pairedSingleCellHeight

    if (hasVariants) cellHeight += VirtualizationConfig.variantsSingleCellHeight

    if (hasSubName) cellHeight += VirtualizationConfig.subNameSingleCellHeight */

    return cellHeight
  }

  static getWideCellInitialHeight(productInfo: ITplProductInfo | undefined) {
    const templateHeight = productInfo?.wideCellHeight ? parseInt(productInfo.wideCellHeight) : 0
    const wideCellHeight = Math.max(VirtualizationConfig.wideCellHeight, templateHeight)

    return wideCellHeight
  }

  static getSingleCellInitialHeight(productInfo: ITplProductInfo | undefined) {
    const templateHeight = productInfo?.singleCellHeight ? parseInt(productInfo.singleCellHeight) : 0
    const singleCellHeight = Math.max(VirtualizationConfig.singleCellHeight, templateHeight)

    return singleCellHeight
  }
  static getCellSizes(product: IProductOpt) {
    const { modifier, subModifier } = ProductUtils.getModifier(product.modifier, product.subModifier)

    let sizes
    if (modifier === eProductModifier.CELL) {
      const cellSizes = CellSizes as any
      sizes = cellSizes[subModifier]
    } else if (modifier === eProductModifier.WIDE) {
      const wideSizes = WideSizes as any
      sizes = wideSizes[subModifier]
    }
    return sizes ?? CellSizes[eProductCellSubModifier.IMG_SQUARED_PB_VERTICAL]
  }

  static getWideCellHeight(product: IProductOpt, productInfo: ITplProductInfo | undefined) {
    const hasPaired = ProductUtils.checkExistsPairedProduct(product)
    const hasVariants = ProductUtils.checkVariantsProduct(product)
    const hasSubName = ProductUtils.checkSubNameProduct(product)

    const { height, subNameHeight, variantsHeight, pairedHeight } = ProductUtils.getCellSizes(product)

    let cellHeight = height

    if (hasPaired) cellHeight += pairedHeight

    if (hasVariants) cellHeight += variantsHeight

    if (hasSubName) cellHeight += subNameHeight

    return cellHeight
  }

  static getModifier(modifier: string, subModifier: string): { modifier: eProductModifier; subModifier: TSubModifier } {
    const result = { modifier: modifier as eProductModifier, subModifier: subModifier as TSubModifier }

    if (!result.modifier) {
      result.modifier = eProductModifier.CELL
    } else if (modifier == 'default') {
      result.modifier = eProductModifier.CELL
    } else if (modifier == 'cell-reverse') {
      result.modifier = eProductModifier.CELL
      result.subModifier = eProductCellSubModifier.REVERSE
    }

    if (result.modifier == eProductModifier.CELL && !result.subModifier && (!subModifier || subModifier == 'default')) {
      result.subModifier = eProductCellSubModifier.IMG_SQUARED_PB_VERTICAL
    } else if (result.modifier == eProductModifier.WIDE && !subModifier && !result.subModifier) {
      result.subModifier = eProductWideSubModifier.DEFAULT
    }

    return result
  }
}

export default ProductUtils
