import { type ReactElement, useMemo, useCallback, CSSProperties, Fragment } from 'react'
import { FlyerProduct } from '../../product'
import { useSchemaStore } from '~/state/schema'
import styles from './ProductGrid.module.css'
import { eProductModifier } from '~/typings/eModifier'
import ProductUtils from '~/utilities/product/ProductUtils'
import { useAppStore } from '~/state/app'
import { isEmpty } from 'lodash-es'
import { getTemplate } from '~/hooks/use-template'
import { ITplCssVars } from '~/typings/template'
import MediaUtils from '~/utilities/product/MediaUtils'
import { ProductBundleUtils } from '~/utilities/product/ProductBundleUtils'

interface IProductGridProps {
  sectionIndex: number
}

interface IRowSection {
  type: 'wide' | 'cell' | 'bundle' | 'media'
  elements: Array<ReactElement>
  height: number
}

const ProductGrid = ({ sectionIndex }: IProductGridProps) => {
  const schema = useSchemaStore.getState().schema
  const section = schema?.sections?.[sectionIndex]
  const template = getTemplate(schema, section)

  const isDesktop = useAppStore((state) => state.isDesktop)
  const cssVars = getTemplate(schema)?.cssVars
  const { gridColor, gridThickness } = (cssVars as ITplCssVars) ?? {}
  const withGrid = gridColor && gridThickness

  const getProductsGrid = useMemo((): Array<IRowSection> => {
    const columnsCount = isDesktop ? schema?.columnsCount ?? 2 : 2
    const products = section?.products

    if (!products) return []

    const rows: Array<IRowSection> = []
    let newRowIndex = 0
    let indexForBackground = -1

    products.forEach((product, index) => {
      indexForBackground += product.modifier == 'wide' || product.hasOwnProperty('type') ? 2 : 1

      if (product) {
        const isWide = product.modifier === eProductModifier.WIDE
        const isMedia = ProductUtils.checkMediaProduct(product)
        const isBundle = ProductUtils.checkBundleProduct(product)

        rows[newRowIndex] = rows[newRowIndex] ?? { elements: [] }

        if (isMedia || isWide || isBundle) {
          if (rows[newRowIndex].elements.length > 0) {
            newRowIndex++
            rows[newRowIndex] = rows[newRowIndex] ?? { elements: [] }
          }

          const productComponent = (
            <FlyerProduct
              key={`${product.id}_${index}`}
              productIndex={index}
              sectionIndex={sectionIndex}
              indexForBackground={indexForBackground}
            />
          )

          if (isMedia) {
            rows[newRowIndex].type = 'media'
            rows[newRowIndex].height = MediaUtils.getMediaHeight(product, isDesktop)
          } else if (isWide) {
            rows[newRowIndex].type = 'wide'
            rows[newRowIndex].height = ProductUtils.getWideCellHeight(product, template?.productInfo)
          } else if (isBundle) {
            rows[newRowIndex].type = 'bundle'
            rows[newRowIndex].height = ProductBundleUtils.getBundleProductHeight(product, template, schema, isDesktop)
          }

          rows[newRowIndex].elements.push(productComponent)
          newRowIndex++
        } else {
          const isNextWide = section.products?.[index + 1]?.modifier === eProductModifier.WIDE
          const isNextMedia = ProductUtils.checkMediaProduct(section.products?.[index + 1])
          const isNextBundle = ProductUtils.checkBundleProduct(section.products?.[index + 1])
          const isNotLastInRow = rows[newRowIndex].elements.length < columnsCount - 1
          const isNotLastInSection = section.products && index < section.products?.length - 1
          const cellHaveRightBord = isNotLastInRow && isNotLastInSection && !(isNextWide || isNextMedia || isNextBundle)
          const style =
            cellHaveRightBord && withGrid ? { borderRight: `${parseInt(gridThickness)}px solid ${gridColor}` } : {}

          const productComponent = (
            <FlyerProduct
              key={`${product.id}_${index}`}
              productIndex={index}
              sectionIndex={sectionIndex}
              indexForBackground={indexForBackground}
              addCustomStyle={style}
            />
          )
          const productHeight = ProductUtils.getSingleCellHeight(product, template?.productInfo)
          rows[newRowIndex].type = 'cell'
          rows[newRowIndex].elements.push(productComponent)
          rows[newRowIndex].height = Math.max(rows[newRowIndex].height ?? 0, productHeight)

          if (rows[newRowIndex].elements.length == columnsCount) newRowIndex++
        }
      }
    })

    return rows
  }, [isDesktop, schema, section, sectionIndex, template, withGrid, gridThickness, gridColor])

  const getStyle = useCallback(
    (row: IRowSection, prevRow: IRowSection | null, isFirst: boolean): CSSProperties => {
      let style: CSSProperties = {
        height: row.height,
      }

      if (withGrid) {
        const border = `${parseInt(gridThickness!)}px solid ${gridColor}`
        if (['wide', 'cell', 'bundle'].includes(row.type)) {
          style = {
            borderLeft: border,
            borderRight: border,
            borderBottom: border,
          }
          if (prevRow?.type == 'media' || isFirst) style.borderTop = border
        }
      }

      return style
    },
    [gridColor, gridThickness, withGrid]
  )

  return getProductsGrid?.map((row, rowIndex) => {
    const prevRow = rowIndex > 0 ? getProductsGrid[rowIndex - 1] : null
    return (
      <div
        key={`row_${rowIndex}`}
        className={styles.productGridRow}
        style={getStyle(row, prevRow, rowIndex == 0 && (!isEmpty(section?.name) || !isEmpty(section?.header)))}
      >
        {row.elements.map((element, elementIndex) => {
          return <Fragment key={`element_${elementIndex}`}>{element}</Fragment>
        })}
      </div>
    )
  })
}

export default ProductGrid
