import { type CSSProperties, useMemo, type LegacyRef, forwardRef } from 'react'
import { type ProductWrapperProps } from '~/components/flyer/product/product-wrapper/typings'
import { getTemplate } from '~/hooks/use-template'
import ProductUtils from '~/utilities/product/ProductUtils'
import { getStaticPath, getStaticPathForWebP } from '~/hooks/use-static-path'
import { isEmpty } from 'lodash-es'
import useWebP from '~/hooks/use-webp/useWebP'
import styles from './ProductWrapper.module.css'
import { useAppStore } from '~/state/app'
import { useSchemaStore } from '~/state/schema'
import useSection from '~/hooks/use-section'
import { useProductWithChildrens } from '~/hooks/use-product'
// import MediaUtils from '~/utilities/product/MediaUtils'
// import { ProductBundleUtils } from '~/utilities/product/ProductBundleUtils'

const ProductWrapper = forwardRef(
  (
    { productIndex, sectionIndex, ignoreModifier, ghost, children, onClick, indexForBackground, addCustomStyle }: ProductWrapperProps,
    ref: LegacyRef<HTMLElement> | undefined
  ) => {
    const schema = useSchemaStore.getState().schema
    const section = useSection(sectionIndex)
    const { product } = useProductWithChildrens(sectionIndex, productIndex)
    const template = getTemplate(schema, section)
    const isDesktop = useAppStore((state) => state.isDesktop)

    const backgroundImagePath = getStaticPath(product?.backgroundImage)
    const backgroundImagePathWebP = getStaticPathForWebP(product?.backgroundImage)
    const backgroundImageSrc = useWebP({
      src: backgroundImagePath,
      webp: backgroundImagePathWebP,
    })

    // const productInfo = template?.productInfo
    const columnsCount = !isDesktop ? 2 : schema?.columnsCount ?? 2

    // const isMedia = ProductUtils.checkMediaProduct(product)
    const isWide = useMemo(() => (ignoreModifier ? false : product?.modifier === 'wide'), [ignoreModifier, product])
    const isBundleProduct = useMemo(() => ProductUtils.checkBundleProduct(product), [product])

    const backgroundColor = useMemo(() => (ignoreModifier ? '' : product?.backgroundColor ?? ''), [ignoreModifier, product])

    const getBackgroundColor = useMemo(() => {
      if (!isEmpty(backgroundColor)) {
        return backgroundColor
      } else if (isWide) {
        return template?.cssVars?.productBackgroundWideColor ?? 'inherit'
      }
      return 'inherit'
    }, [backgroundColor, isWide, template])

    const gridLayout = useMemo(() => {
      const idx = indexForBackground ?? product?.position ?? 0
      if (!getBackgroundColor || getBackgroundColor === 'inherit') {
        if (columnsCount === 4) {
          if (idx != undefined && [0, 2, 5, 7].includes(idx % 8))
            return {
              backgroundColor: template?.cssVars?.productBackgroundAlternativeColor,
            }
          else
            return {
              backgroundColor: template?.cssVars?.productBackgroundColor,
            }
        } else if (columnsCount === 3) {
          if (idx != undefined && [0, 2, 4].includes(idx % 6))
            return {
              backgroundColor: template?.cssVars?.productBackgroundAlternativeColor,
            }
          else
            return {
              backgroundColor: template?.cssVars?.productBackgroundColor,
            }
        } else {
          if (idx != undefined && [0, 3].includes(idx % 4))
            return {
              backgroundColor: template?.cssVars?.productBackgroundAlternativeColor,
            }
          else
            return {
              backgroundColor: template?.cssVars?.productBackgroundColor,
            }
        }
      }
      return {}
    }, [getBackgroundColor, columnsCount, product, template, indexForBackground])

    const ghostStyle = useMemo(() => {
      if (ghost) {
        return { flex: 0 }
      }
      return {}
    }, [ghost])

    const background = useMemo(() => {
      if (backgroundImageSrc) {
        return {
          backgroundImage: `url(${backgroundImageSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: '50% 50%',
        }
      }
      return {}
    }, [backgroundImageSrc])

    const getCellWidth = useMemo(() => {
      if (isBundleProduct) {
        return '100%'
      }

      // return ignoreModifier ? "0 0 50%" : isWide ? "0 0 100%" : `0 0 25%`; //0 0 ${100 / (schema?.columnsCount ?? 2)}%`
      return ignoreModifier ? '50%' : isWide ? '100%' : `${100 / columnsCount}%`
    }, [isBundleProduct, ignoreModifier, isWide, columnsCount])

    // const getHeightFinal = useMemo(() => {
    //   if (isBundleProduct) {
    //     return ProductBundleUtils.getBundleProductHeight(product, template, schema, isDesktop)
    //   }
    //   if (isMedia) {
    //     return MediaUtils.getMediaHeight(product, isDesktop)
    //   }

    //   if (isWide) {
    //     return ProductUtils.getWideCellHeight(product, productInfo)
    //   }

    //   return ProductUtils.getSingleCellHeight(product, productInfo)
    // }, [isBundleProduct, isDesktop, isMedia, isWide, product, productInfo, schema, template])

    const getStyle = useMemo((): CSSProperties => {
      return {
        // height: '100%',
        flexBasis: getCellWidth,
        maxWidth: schema?.allowOrphanProducts ? getCellWidth : 'inherit',
        backgroundColor: getBackgroundColor,
        ...ghostStyle,
        ...gridLayout,
        ...background,
        ...addCustomStyle,
      }
    }, [background, getBackgroundColor, getCellWidth, ghostStyle, gridLayout, schema, addCustomStyle])

    return (
      <article ref={ref} style={getStyle} className={styles.productWrapper} onClick={onClick}>
        {children}
      </article>
    )
  }
)

export { ProductWrapper }
