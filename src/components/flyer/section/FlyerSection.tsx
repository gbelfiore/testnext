'use client'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { RefsManager } from '~/utilities/refs-manager'
import { type IProductOpt } from '~/typings/schemaopt'
import { RefTypes } from '~/utilities/refs-manager/enum'
// import { useOptionsStore } from '~/state/options'

import { FlyerProduct } from '~/components/flyer/product'
import { SectionBgPattern } from '~/components/flyer/section/bg'
// import { SectionName } from '~/components/flyer/section/name'
import { type FlyerSectionProps } from '~/components/flyer/section/typings'
import Media from '~/components/flyer/product/media/Media'
import { SliderWrapper } from '~/components/flyer/section/slider-wrapper/SliderWrapper'
import { SliderGroup } from '~/components/flyer/section/slider-group/SliderGroup'
import { SliderDots } from '~/components/flyer/section/slider-dots/SliderDots'
import { SliderDot } from '~/components/flyer/section/slider-dots/SliderDot'
import { Container } from '~/components/flyer/section/container/Container'

import styles from './Section.module.css'
import { getTemplate } from '~/hooks/use-template'
// import { VirtualizationConfig } from '~/utilities/product/VirtualizationUtility'
// import { useAppStore } from '~/state/app'
import { useSchemaStore } from '~/state/schema'
import useSection from '~/hooks/use-section'
import ProductGrid from './product-grid/ProductGrid'

const FlyerSectionComponent = ({ sectionIndex }: FlyerSectionProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const schema = useSchemaStore.getState().schema
  const section = useSection(sectionIndex)
  const template = getTemplate(schema, section)
  // const isDesktop = useAppStore((state) => state.isDesktop);

  // const setSectionStickyHeading = useOptionsStore((state) => state.setSectionStickyHeading)

  const ref = RefsManager.useReferencesManager({
    refKey: `section-${section?.id}`,
    type: RefTypes.SECTION,
    removeOnUnmount: false,
  })

  const scrollHandler = useCallback(
    (e: any) => {
      const newSlide = Math.round(e.target.scrollLeft / e.target.offsetWidth)
      if (newSlide !== currentSlide) {
        setCurrentSlide(newSlide)
      }
    },
    [setCurrentSlide, currentSlide]
  )

  const renderProductsSlider = useMemo(() => {
    if (!section?.products) return null
    const productGroups = []
    let productCount = 0
    let productGroup: { product: IProductOpt; productIndex: number }[] = []
    const dots = []
    section.products.forEach((product, index) => {
      productGroup.push({ product: product, productIndex: index })
      productCount++
      if (productCount % 4 === 0) {
        productGroups.push(
          <SliderGroup key={productCount}>
            {productGroup.map((singleProduct, index) => (
              <FlyerProduct key={`${singleProduct.product.id}_${index}`} productIndex={singleProduct.productIndex} sectionIndex={sectionIndex} />
            ))}
          </SliderGroup>
        )
        dots.push(Math.floor(productCount / 4) - 1)
        productGroup = []
      }
    })
    if (productGroup.length) {
      productGroups.push(
        <SliderGroup key={productCount}>
          {productGroup.map((singleProduct, index) => {
            if (!section.products) return null
            return <FlyerProduct key={`${singleProduct.product.id}_${index}`} productIndex={singleProduct.productIndex} sectionIndex={sectionIndex} />
          })}
        </SliderGroup>
      )
      dots.push(Math.ceil(productCount / 4) - 1)
    }
    return (
      <>
        <SliderWrapper onScroll={scrollHandler}>{productGroups}</SliderWrapper>
        <SliderDots>
          {dots.map((n) => (
            <SliderDot active={n === currentSlide} key={n} />
          ))}
        </SliderDots>
      </>
    )
  }, [currentSlide, scrollHandler, section, sectionIndex])

  const renderProductsGrid = useMemo(() => {
    if (!section?.products) return null

    return <ProductGrid sectionIndex={sectionIndex} />
    // let indexForBackground = -1
    // return section.products.map((product, index) => {
    //   indexForBackground += product.modifier == 'wide' || product.hasOwnProperty('type') ? 2 : 1
    //   return <FlyerProduct key={`${product.id}_${index}`} productIndex={index} sectionIndex={sectionIndex} indexForBackground={indexForBackground} />
    // })
  }, [section, sectionIndex])

  const renderProducts = useMemo(() => {
    if (section?.products) {
      if (section.modifier === 'slider') {
        return renderProductsSlider
      } else {
        return renderProductsGrid
      }
    }
    return null
  }, [renderProductsGrid, renderProductsSlider, section])

  const renderSection = useMemo(() => {
    return (
      <>
        {/* <SectionName sectionIndex={sectionIndex} /> */}
        <Media sectionIndex={sectionIndex} position={'header'} />
        <div className={styles.sectionBody}>
          <SectionBgPattern sectionIndex={sectionIndex} />
          {renderProducts}
        </div>
        <Media sectionIndex={sectionIndex} position={'footer'} />
      </>
    )
  }, [renderProducts, sectionIndex])

  return (
    <Container ref={ref} template={template} data-section-name={section?.name}>
      {renderSection}
    </Container>
  )
}

// export const FlyerSection = FlyerSectionComponent;

export const FlyerSection = memo(FlyerSectionComponent)
