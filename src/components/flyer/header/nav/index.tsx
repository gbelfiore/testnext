'use client'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { RefsManager } from '~/utilities/refs-manager'
import { RefTypes } from '~/utilities/refs-manager/enum'
import { useAppStore } from '~/state/app'
import s from './nav.module.css'
import { getTemplate } from '~/hooks/use-template'
import { ISchemaOpt } from '~/typings/schemaopt'
import { NavArrow } from './arrow'

const scrollValue = 200
const scrollValueTollerance = scrollValue * 0.2

const Nav: React.FC<{
  children: React.ReactNode
  navKey?: string
  schema?: ISchemaOpt | null
}> = ({ children, navKey, schema = null }) => {
  const refNav = useRef<HTMLElement | null>(null)
  const setRef = RefsManager.useReferencesManager({
    refKey: navKey ?? '',
    type: RefTypes.HEADER,
    removeOnUnmount: false,
  })
  const template = getTemplate(schema)
  const isDesktop = useAppStore((state) => state.isDesktop)
  const isClient = useAppStore((state) => state.isClient)

  const [scrollNavPosition, setScrollNavPosition] = useState<number>(0)

  const onScrollNav = useCallback(() => {
    setScrollNavPosition(refNav.current?.scrollLeft ?? 0)
  }, [])

  useEffect(() => {
    if (isDesktop) {
      refNav.current?.addEventListener('scroll', onScrollNav)

      return () => {
        refNav.current?.removeEventListener('scroll', onScrollNav)
      }
    }
  }, [isDesktop, onScrollNav])

  const needArrowNavigation = useMemo(() => {
    let needArrowNavigation = true && isClient
    if (refNav.current) {
      if (refNav.current?.scrollWidth === refNav.current?.clientWidth) needArrowNavigation = false
    }
    return isDesktop && needArrowNavigation
  }, [isDesktop, isClient])

  const disabeldSxArrow = useMemo(() => scrollNavPosition === 0, [scrollNavPosition])
  const disabeldDxArrow = useMemo(() => {
    if (refNav.current) {
      return refNav.current?.scrollWidth - (refNav.current.offsetWidth + scrollNavPosition) <= scrollValueTollerance
    }
    return false
    // (refNav.current?.offsetWidth ?? 0) + scrollNavPosition >= (refNav.current?.scrollWidth ?? 0);
  }, [scrollNavPosition])

  const onScrollNavPosition = useCallback(
    (inc: number) => {
      let delta = scrollNavPosition + inc

      if (refNav.current) {
        if (inc > 0 && refNav.current.scrollWidth - (delta + refNav.current.offsetWidth) < scrollValue + scrollValueTollerance) {
          delta = refNav.current.scrollWidth
        }

        refNav.current.scroll({
          left: delta,
          behavior: 'smooth',
        })
      }
    },
    [scrollNavPosition]
  )

  return (
    <div className={s.navContainer}>
      <div
        style={{
          backgroundImage: `linear-gradient(270deg, ${template?.cssVars.navShadowBackgroundColor} 0%, transparent 33%)`,
        }}
        className={s.navContainerShadow}
      ></div>
      {needArrowNavigation && (
        <NavArrow template={template} towards="sx" disabled={disabeldSxArrow} onClick={() => onScrollNavPosition(scrollValue * -1)} />
      )}
      <nav
        className={s.chipContainer}
        ref={(item) => {
          refNav.current = item
          setRef(item)
        }}
      >
        {children}
      </nav>
      {needArrowNavigation && (
        <NavArrow template={template} towards="dx" disabled={disabeldDxArrow} onClick={() => onScrollNavPosition(scrollValue)} />
      )}
    </div>
  )
}

export { Nav }
