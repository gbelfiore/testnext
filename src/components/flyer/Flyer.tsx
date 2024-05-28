'use client'

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { RefsManager } from '~/utilities/refs-manager'
import { RefKeys, RefTypes } from '~/utilities/refs-manager/enum'

import styles from './Flyer.module.css'
import CoverSSR from '~/components/cover-ssr'
import { getStaticPath } from '~/hooks/use-static-path'
import { Range, defaultRangeExtractor, useVirtualizer } from '@tanstack/react-virtual'
import { FlyerSection } from './section/FlyerSection'
import { ComponentFlyerType, type IComponentFlyer, IFlyerProps } from './types'
import {
  VirtualizationConfig,
  getBackCoverHeight,
  getCoverHeight,
  getSectionHeight,
  getSectionStickyHeaderHeight,
} from '~/utilities/product/VirtualizationUtility'
import VirtualItemFlyer from './virtual-flyer-item/VirtualFlyerItem'
import SchemaUtility from '~/utilities/schema-utility'
import { useAppStore } from '~/state/app'
import dynamic from 'next/dynamic'
import { SectionName } from './section/section-name/SectionName'
import { isEmpty } from 'lodash-es'
import { getTemplate } from '~/hooks/use-template'
import { useQueryStringStore } from '~/state/queryString'
import { useOptionsStore } from '~/state/options'
import Modal from './modal'
import OffersToViewButton from './offers-to-view-button'
import { useFlyerUi } from '~/state/flyer-ui'
import { Colophon } from './colophon/Colophon'

const FlyoutComponent = dynamic(() => import(/* webpackChunkName: "Flyout"*/ './flyout'))

const FlyerComponent = ({ schema }: IFlyerProps) => {
  const { sectionId: sectionIdQuery, productId: productIdQuery } = useQueryStringStore.getState().params
  const template = getTemplate(schema)
  const withShadows = template?.cssVars?.withShadows
  // useVh(); //TODO[GB]: da verificare
  const isClient = useAppStore((state) => state.isClient)
  const isDesktop = useAppStore((state) => state.isDesktop)

  const activeSticky = useRef<number | null>(null)
  const initialGoToSection = useRef<boolean>(false)
  const initialGoToProduct = useRef<boolean>(false)

  const scrollTopMenu = useRef(0)
  const mainContent = useRef<HTMLDivElement>(null)
  const { setPosition } = useFlyerUi.getState()

  const onScroll = () => {
    const headerRef = document.querySelector<HTMLDivElement>('.main-header')

    if (mainRef.current && mainContent.current) {
      const diff = mainRef.current.getBoundingClientRect()?.top - mainContent.current.getBoundingClientRect()?.top
      useOptionsStore.getState().setCurrentScroll(diff)

      document.body.style.overflowY = diff === 0 ? 'unset' : 'hidden' // make pull-to-refresh work
    }

    if (isDesktop) return
    const currentScrollTop = document.querySelector('main')?.scrollTop ?? 0

    if (currentScrollTop > scrollTopMenu.current) {
      if (headerRef && mainRef.current) {
        if (currentScrollTop > 500) {
          headerRef.style.transform = 'translateY(-100px)'
          mainRef.current.style.transform = 'translateY(-100px)'
          mainRef.current.style.height = '100vh'
        }
      }
    } else if (currentScrollTop < scrollTopMenu.current) {
      if (headerRef && mainRef.current) {
        headerRef.style.transform = 'translateY(0px)'
        mainRef.current.style.transform = 'translateY(0px)'
        mainRef.current.style.height = 'calc(100vh-100px)'
      }
    }
    scrollTopMenu.current = currentScrollTop
  }

  const mainRef = useRef<HTMLElement | null>(null)

  const mainWrapperRef = RefsManager.useReferencesManager({
    refKey: RefKeys.MAIN_WRAPPER,
    type: RefTypes.MAIN,
    removeOnUnmount: false,
  })

  const getComponentFlyer = useMemo((): {
    components: Array<IComponentFlyer>
    mapSectionHeaderPosition: Record<number, number>
  } => {
    let nextPosition = -1
    const components: Array<IComponentFlyer> = []

    if (schema.coverImage) {
      components[++nextPosition] = {
        type: ComponentFlyerType.COVER,
        component: <CoverSSR src={getStaticPath(schema.coverImage, schema.basePath)} refKey="topCover" />,
      }
    }

    const mapSectionHeaderPosition: Record<number, number> = {}
    schema.sections?.forEach((section, sectionIndex) => {
      let headerPos: number = -1
      let sectionPos: number = -1
      if (!isEmpty(section.name)) {
        headerPos = ++nextPosition
        components[headerPos] = {
          type: ComponentFlyerType.SECTION_NAME,
          component: <SectionName key={`section_name_${section.id}`} sectionIndex={sectionIndex} />,
          sectionIndex,
        }
      }

      sectionPos = ++nextPosition
      components[sectionPos] = {
        type: ComponentFlyerType.SECTION,
        component: <FlyerSection key={`section_${section.id}`} sectionIndex={sectionIndex} />,
        sectionIndex,
      }

      if (sectionPos !== -1 && headerPos !== -1) mapSectionHeaderPosition[sectionPos] = headerPos
    })

    if (schema.backcoverImage) {
      components[++nextPosition] = {
        type: ComponentFlyerType.BACKCOVER,
        component: <CoverSSR src={getStaticPath(schema.backcoverImage, schema.basePath)} refKey={'bottomCover'} />,
      }
    }

    if (schema.colophon) {
      components[++nextPosition] = {
        type: ComponentFlyerType.COLOPHON,
        component: <Colophon colophon={schema.colophon} refKey="colophon" />,
      }
    }

    return {
      components,
      mapSectionHeaderPosition,
    }
  }, [schema])

  const getEstimateSize = useCallback(
    (index: number): number => {
      const componentRender = getComponentFlyer.components[index]
      if (componentRender?.type == ComponentFlyerType.COVER) {
        return getCoverHeight(schema)
      } else if (componentRender?.type == ComponentFlyerType.SECTION_NAME && componentRender.sectionIndex != undefined) {
        const section = schema.sections?.[componentRender.sectionIndex]
        if (section) {
          return getSectionStickyHeaderHeight(schema, section)
        }
      } else if (componentRender?.type == ComponentFlyerType.SECTION && componentRender.sectionIndex != undefined) {
        const section = schema.sections?.[componentRender.sectionIndex]
        if (section) {
          return getSectionHeight(schema, section, componentRender.sectionIndex, isDesktop)
        }
      } else if (componentRender?.type == ComponentFlyerType.BACKCOVER) {
        return getBackCoverHeight(schema)
      } else if (componentRender?.type == ComponentFlyerType.COLOPHON) {
        return 50
      }
      return 0
    },
    [getComponentFlyer.components, schema, isDesktop]
  )

  const getScrollElement = useCallback(() => {
    return mainRef.current
  }, [])

  const elemIndexIsSection = useCallback(
    (index: number) => {
      return Object.keys(getComponentFlyer.mapSectionHeaderPosition).includes(`${index}`)
    },
    [getComponentFlyer]
  )

  const elemIndexIsHeaderSection = useCallback(
    (index: number) => {
      return Object.values(getComponentFlyer.mapSectionHeaderPosition).includes(index)
    },
    [getComponentFlyer]
  )

  const rangeExtractor = useCallback(
    (range: Range) => {
      setPosition(range)
      if (elemIndexIsHeaderSection(range.startIndex) || elemIndexIsSection(range.startIndex)) {
        const sectionIndex = getComponentFlyer.components[range.startIndex].sectionIndex
        if (sectionIndex) {
          const section = schema.sections?.[sectionIndex]
          section && useOptionsStore.getState().setSectionStickyHeading(section, true)
        }
      } else if (activeSticky.current) {
        const sectionIndex = getComponentFlyer.components[activeSticky.current].sectionIndex
        if (sectionIndex) {
          const section = schema.sections?.[sectionIndex]
          section && useOptionsStore.getState().setSectionStickyHeading(section, false)
        }
      }

      if (elemIndexIsHeaderSection(range.startIndex)) {
        activeSticky.current = range.startIndex
      } else if (elemIndexIsSection(range.startIndex)) {
        activeSticky.current = getComponentFlyer.mapSectionHeaderPosition[range.startIndex] as number
      } else {
        activeSticky.current = null
      }

      return Array.from(new Set([activeSticky.current ?? 0, ...defaultRangeExtractor(range)]))
    },
    [
      elemIndexIsHeaderSection,
      elemIndexIsSection,
      getComponentFlyer.components,
      getComponentFlyer.mapSectionHeaderPosition,
      schema.sections,
      setPosition,
    ]
  )

  const rowVirtualizer = useVirtualizer({
    count: getComponentFlyer.components.length,
    getScrollElement: getScrollElement,
    estimateSize: getEstimateSize,
    overscan: 3,
    rangeExtractor: rangeExtractor,
  })

  useEffect(() => {
    useFlyerUi.getState().setIsUserScrolling(rowVirtualizer.isScrolling)
  }, [rowVirtualizer.isScrolling])

  const goToProduct = useCallback((productId: string) => {
    const productWrapperDivRef = RefsManager.getRef<HTMLDivElement>(`product-${productId}`)
    productWrapperDivRef?.ref?.click()
  }, [])

  const goToSection = useCallback(
    (sectionId: string, productIdQuery?: string) => {
      const sectionIndex = SchemaUtility.getSectionIndexById(schema, sectionId)
      if (sectionIndex >= 0) {
        const idx = getComponentFlyer.components.findIndex((c) => c.sectionIndex == sectionIndex && c.type == ComponentFlyerType.SECTION_NAME)

        const offsetSection = rowVirtualizer.getOffsetForIndex(idx, 'start')

        if (offsetSection?.[1] == 'start') {
          let scrollPosition = offsetSection[0] + VirtualizationConfig.stickyHeadingHeight / 2
          if (productIdQuery) {
            const productWrapperDivRef = RefsManager.getRef<HTMLDivElement>(`product-${productIdQuery}`)
            const productPosition = productWrapperDivRef?.ref.offsetTop ? productWrapperDivRef.ref.offsetTop - 100 : 0
            scrollPosition += productPosition
          }
          rowVirtualizer.scrollToOffset(scrollPosition, {
            align: 'start',
            behavior: 'smooth',
          })
        }
        return true
      }
      return false
    },
    [getComponentFlyer.components, rowVirtualizer, schema]
  )

  useLayoutEffect(() => {
    document.addEventListener('clickOnPill', (event: any) => {
      const sectionId = event.detail.sectionId
      if (sectionId) {
        goToSection(sectionId)
      }
    })
  }, [goToSection])

  useEffect(() => {
    if (initialGoToSection.current && initialGoToProduct.current) return

    setTimeout(() => {
      let resultGoToSection
      if (sectionIdQuery && !initialGoToSection.current) {
        resultGoToSection = goToSection(sectionIdQuery, productIdQuery)
      }

      if (resultGoToSection) {
        if (rowVirtualizer.isScrolling && !initialGoToSection.current) {
          initialGoToSection.current = true
        }
      } else if (!resultGoToSection) {
        initialGoToSection.current = true
      }

      if (productIdQuery && initialGoToSection.current && !initialGoToProduct.current && !rowVirtualizer.isScrolling) {
        initialGoToProduct.current = true
        goToProduct(productIdQuery)
      }
    }, 300)
  }, [schema, rowVirtualizer.isScrolling, getComponentFlyer, goToSection, goToProduct, sectionIdQuery, productIdQuery])

  useEffect(() => {
    if (useOptionsStore.getState().currentScroll > 0) {
      rowVirtualizer?.scrollToOffset(useOptionsStore.getState().currentScroll)
    }
  }, [rowVirtualizer])

  // --- isServer ---
  if (!isClient)
    return (
      <main className={styles.main}>
        <div className={styles.mainContent}>
          <CoverSSR src={getStaticPath(schema.coverImage, schema.basePath)} refKey="topCover" />
        </div>
      </main>
    )

  // --- isClient ---
  return (
    <>
      <main
        className={styles.main}
        ref={(item) => {
          if (item) {
            mainRef.current = item
            mainWrapperRef(item)
          }
        }}
        onScroll={onScroll}
      >
        <div
          ref={mainContent}
          className={styles.mainContent}
          style={{
            minHeight: rowVirtualizer.getTotalSize(),
            boxShadow: withShadows ? '0px 0px 10px' : 'none',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            return (
              <VirtualItemFlyer
                key={`virtual_element_${virtualRow.index}`}
                isSticky={activeSticky.current == virtualRow.index}
                isColophon={getComponentFlyer.components[virtualRow.index].type == ComponentFlyerType.COLOPHON}
                height={virtualRow.size}
                addStyle={{
                  transform: `translateY(${virtualRow.start}px)`,
                  zIndex: elemIndexIsHeaderSection(virtualRow.index) ? virtualRow.index + 1 : 'inherit',
                }}
              >
                {getComponentFlyer.components[virtualRow.index]?.component}
              </VirtualItemFlyer>
            )
          })}
        </div>
      </main>
      <FlyoutComponent />
      <Modal />
      <OffersToViewButton />
    </>
  )
}

export const Flyer = FlyerComponent
