'use client'
import React, { CSSProperties, useCallback, useEffect, useRef } from 'react'
import { TKeys } from '~/localization/languages/enum'
import { Translator } from '~/localization/translator'
import { ColorToSvgFill } from '~/utilities/RgbToHex'
import { useRouter } from 'next/navigation'
import QueryUrlUtility from '~/utilities/query-url-utility/QueryUrlUtility'
import { useAppStore } from '~/state/app'
import styles from './ToggleSearchButton.module.css'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'

const ToggleSearchButtonComponent = ({ isSearch }: { isSearch?: boolean }) => {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)
  const router = useRouter()
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const urlParams = useAppStore((state) => state.urlParams)

  const onClick = useCallback(() => {
    let url
    if (isSearch) {
      url = `/${urlParams?.slug}/${urlParams?.flyerId}?${QueryUrlUtility.getQueryString()}`
    } else {
      url = `/${urlParams?.slug}/${urlParams?.flyerId}/search?${QueryUrlUtility.getQueryString()}`
    }
    router.push(url)
  }, [isSearch, router, urlParams])

  useEffect(() => {
    const t = timeout.current
    return () => {
      if (t) clearTimeout(t)
    }
  }, [])

  const iconColor = ColorToSvgFill(template?.cssVars?.headerTextColor) ?? '%23fff'
  const style: CSSProperties = {
    marginTop: isSearch ? 7.5 : 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18' fill='${iconColor}'%3E%3Cpath d='m16.467 18-5.146-5.134v-.813l-.278-.288a6.7 6.7 0 1 1 .721-.721l.288.278h.813L18 16.467 16.468 18ZM6.689 2.058a4.631 4.631 0 1 0 4.631 4.631 4.637 4.637 0 0 0-4.631-4.631Z'/%3E%3C/svg%3E")`,
  }

  return (
    <button className={styles.toggleSearchButton} type="button" onClick={onClick} style={style}>
      <Translator tKey={TKeys.SEARCH} capitalizeFirst />
    </button>
  )
}

export const ToggleSearchButton = ToggleSearchButtonComponent
