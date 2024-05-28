'use client'
import type { PillProps } from '~/components/flyer/header/pill/typings'
import { getFontInfo } from '~/hooks/use-font-info'
import type { IFontData } from '~/hooks/use-font-info/typings'
import { RefsManager } from '~/utilities/refs-manager'
import { RefTypes } from '~/utilities/refs-manager/enum'
import { getTemplate } from '~/hooks/use-template'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '~/state/app'
import { useQueryStringStore } from '~/state/queryString'
import QueryUrlUtility from '~/utilities/query-url-utility/QueryUrlUtility'

const Pill = ({ id, schema, children, navKey, isFullPage, onClick, selected, maxWidth }: PillProps) => {
  const router = useRouter()

  const template = getTemplate(schema)
  const setRef = RefsManager.useReferencesManager({
    refKey: `${navKey ?? ''}_${id}`,
    type: RefTypes.BUTTON,
    removeOnUnmount: false,
  })

  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'pill', {
    fontFamily: template?.fonts?.families?.[0]?.name,
    fontWeight: 700,
    fontSize: 12,
  })


  const styleMaxWidth = maxWidth ? {
    maxWidth,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    flexShrink: 0,
  } : {}

  const style = {
    border: 'none',
    display: 'inline-block',
    backgroundColor: selected ? template?.cssVars?.activePillBackgroundColor : template?.cssVars?.pillBackgroundColor,
    color: selected ? template?.cssVars?.activePillTextColor : template?.cssVars?.pillTextColor,
    padding: '8px 16px',
    marginRight: 8,
    borderRadius: 100,
    outline: 'none',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
    ...styleMaxWidth,
    ...fontInfo,
  }

  const openSectionHeaderContent = useCallback(() => {
    useQueryStringStore.getState().addParam('sectionId', id)
    useQueryStringStore.getState().deleteParam('productId')

    const urlParams = useAppStore.getState().urlParams
    const url = `/${urlParams?.slug}/${urlParams?.flyerId}?${QueryUrlUtility.getQueryString()}`

    router.push(url)
  }, [id, router])

  const lunchEventSectionHeaderContent = useCallback(
    (evt: any) => {
      useQueryStringStore.getState().addParam('sectionId', id)
      useQueryStringStore.getState().deleteParam('productId')

      const urlParams = useAppStore.getState().urlParams
      const url = `/${urlParams?.slug}/${urlParams?.flyerId}?${QueryUrlUtility.getQueryString()}`

      window.history.pushState({}, 'unusedStr', url)
      const clickOnPillEvent = new CustomEvent<{ sectionId: string }>('clickOnPill', {
        bubbles: true,
        detail: { sectionId: id },
      })

      evt.target?.dispatchEvent(clickOnPillEvent)
    },
    [id]
  )

  useEffect(() => {
    if (selected) {
      const nav = RefsManager.getRef<HTMLElement>(navKey ?? '')?.ref
      const element = RefsManager.getRef<HTMLElement>(`${navKey ?? ''}_${id}`)

      if (nav) {
        nav.scrollTo({ left: element?.ref.offsetLeft, behavior: 'smooth' })
      }
    }
  }, [id, navKey, selected])

  return (
    <button ref={setRef} style={style} onClick={onClick ? onClick : isFullPage ? openSectionHeaderContent : lunchEventSectionHeaderContent} className="pillNavBar">
      {children}
    </button>
  )
}

export { Pill }
