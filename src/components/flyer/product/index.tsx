import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { type ProductProps } from '~/components/flyer/product/typings'
import { ProductWrapper } from '~/components/flyer/product/product-wrapper'
import { EventTracker } from '~/utilities/event-tracker'
import { EventNames } from '~/utilities/event-tracker/enums'
import { RefsManager } from '~/utilities/refs-manager'
import { RefKeys, RefTypes } from '~/utilities/refs-manager/enum'
import ChooseRenderProduct from './choose-render-product/ChooseRenderProduct'
import { getTemplate } from '~/hooks/use-template'
import { useIntersectionVisualizationProduct } from './use-intersection-virtualization-product'
import { useFlyoutStore } from '~/state/flyout'
import { useAppStore } from '~/state/app'
import useSection from '~/hooks/use-section'
import { useProductWithChildrens } from '~/hooks/use-product'
import { useSchemaStore } from '~/state/schema'
import { useFlyerUi } from '~/state/flyer-ui'
import ProductUtils from '~/utilities/product/ProductUtils'
import { IProductOpt } from '~/typings/schemaopt'

const MIN_DURATION_INTERVALL_FOR_TRACKING_PRODUCT = 500

const FlyerProductComponent = ({ productIndex, sectionIndex, ignoreModifier, indexForBackground, addCustomStyle }: ProductProps) => {
  const schema = useSchemaStore.getState().schema
  const section = useSection(sectionIndex)
  const { product } = useProductWithChildrens(sectionIndex, productIndex)
  const setActiveProduct = useFlyoutStore((state) => state.setActiveProduct)
  const isDesktop = useAppStore((state) => state.isDesktop)
  const template = getTemplate(schema, section)
  const isMedia = ProductUtils.checkMediaProduct(product)
  const isBundled = ProductUtils.checkBundleProduct(product as IProductOpt)
  const refKeyString = isMedia
    ? `banner-${product?.name}-${product?.position}`
    : isBundled
      ? `bundle-${product.id ?? `${product?.name}-${product.bundleProducts?.[0].name}`}`
      : `product-${product?.id ?? product?.name}`

  const show = useIntersectionVisualizationProduct(refKeyString)

  const intersectionObserver = useRef<IntersectionObserver | null>(null)
  const refKey = useRef<string>(refKeyString)
  const setProductWrapperRef = RefsManager.useReferencesManager({
    refKey: refKey.current,
    type: RefTypes.PRODUCT,
    removeOnUnmount: false,
  })
  const [showIconPlus, setShowIconPlus] = useState<boolean>(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { addElement } = useFlyerUi.getState()

  const intersectionObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (!product || productIndex == null || sectionIndex == null) return null
      const entry = entries[0]
      const iconPlusActive = template?.productInfo?.iconPlusActive

      if (timeout.current) clearTimeout(timeout.current)
      if (entry?.isIntersecting) {
        if (iconPlusActive) setShowIconPlus(true)

        timeout.current = setTimeout(() => {
          if (ProductUtils.checkMediaProduct(product) && (product as any)?.tracking) {
            //MEDIA PRODUCT
            void EventTracker.sendEvent<EventNames.MEDIA_PRODUCT_IMPRESSION>(EventNames.MEDIA_PRODUCT_IMPRESSION, {
              productIndex,
              sectionIndex,
            })
          } else {
            //PRODUCT;
            void EventTracker.sendEvent<EventNames.PRODUCT_IMPRESSION>(EventNames.PRODUCT_IMPRESSION, {
              productIndex,
              sectionIndex,
            })
            addElement(refKeyString)
          }
        }, MIN_DURATION_INTERVALL_FOR_TRACKING_PRODUCT)
      }
    },
    [product, productIndex, sectionIndex, template, addElement, refKeyString]
  )

  useEffect(() => {
    const mainWrapperRef = RefsManager.getRef<HTMLElement>(RefKeys.MAIN_WRAPPER)
    const productWrapperRef = RefsManager.getRef<HTMLDivElement>(refKey.current)
    if (!intersectionObserver.current && productWrapperRef?.ref && mainWrapperRef?.ref) {
      intersectionObserver.current = new IntersectionObserver(intersectionObserverCallback, {
        root: mainWrapperRef.ref,
        rootMargin: '0px',
        threshold: 0.9,
      })
    }
    if (productWrapperRef?.ref) {
      intersectionObserver.current?.observe(productWrapperRef.ref)
    }
    return () => {
      intersectionObserver.current?.disconnect()
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [intersectionObserverCallback])

  const onClickProductWrapper = useCallback(() => {
    if (!product) return null
    if (isMedia) return null
    setActiveProduct(product, sectionIndex, productIndex, isDesktop)
    if (productIndex != null && sectionIndex != null) {
      void EventTracker.sendEvent<EventNames.FLYOUT_OPEN>(EventNames.FLYOUT_OPEN, {
        productIndex,
        sectionIndex,
      })
    }
  }, [product, isMedia, setActiveProduct, sectionIndex, productIndex, isDesktop])

  if (!product) return null

  return (
    <ProductWrapper
      sectionIndex={sectionIndex}
      productIndex={productIndex}
      ref={setProductWrapperRef}
      onClick={onClickProductWrapper}
      ghost={false}
      indexForBackground={indexForBackground}
      addCustomStyle={addCustomStyle}
    >
      {show && (
        <ChooseRenderProduct productIndex={productIndex} sectionIndex={sectionIndex} ignoreModifier={ignoreModifier} showIconPlus={showIconPlus} />
      )}
    </ProductWrapper>
  )
}

export const FlyerProduct = memo(FlyerProductComponent)
