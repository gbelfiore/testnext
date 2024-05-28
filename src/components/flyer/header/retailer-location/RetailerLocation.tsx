'use client'
import React, { memo, useCallback } from 'react'
import { type IFontData } from '~/hooks/use-font-info/typings'
import { getFontInfo } from '~/hooks/use-font-info'

import useDistance from '~/hooks/use-distance'
import { useQueryStringStore } from '~/state/queryString'
import isEmpty from 'lodash-es/isEmpty'
import { useSchemaStore } from '~/state/schema'
import { useRouter } from 'next/navigation'
import { useAppStore } from '~/state/app'
import QueryUrlUtility from '~/utilities/query-url-utility/QueryUrlUtility'

import styles from './RetailerLocation.module.css'
import classNames from 'classnames'
import { getTemplate } from '~/hooks/use-template'

const RetailerLocationComponent = ({ className }: { className?: string }) => {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)
  const storeId = useQueryStringStore.getState().params.storeId

  const stores = useSchemaStore((state) => state.schema?.stores ?? [])
  let storeSelect = stores?.[0]
  if (storeId && !isEmpty(storeId)) {
    const storeByStoreId = stores?.find((s) => s.id == parseInt(storeId))
    if (storeByStoreId) storeSelect = storeByStoreId
  }
  const distanceStore = useDistance(storeSelect?.distance)

  const router = useRouter()

  const onClick = useCallback(() => {
    const urlParams = useAppStore.getState().urlParams
    const url = `/${urlParams?.slug}/${urlParams?.flyerId}/stores?${QueryUrlUtility.getQueryString()}`
    router.push(url)
  }, [router])

  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'retailerLocation', {
    fontWeight: 500,
    fontSize: 14,
    fontFamily: template?.fonts?.families?.[0].name,
  })

  const backgroundImage = `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='640' height='640' viewBox='0 0 640 640'%3E%3Cpath fill='${encodeURIComponent(
    template?.cssVars?.pillTextColor ?? '#000'
  )}' d='M636.884 579.264l-43.744-131.264h-48l26.656 128h-469.312l26.656-128h-48l-43.776 131.264c-11.104 33.408 8.576 60.736 43.776 60.736h512c35.2 0 54.88-27.328 43.744-60.736zM497.141 160c0-88.352-71.616-160-160-160s-160 71.648-160 160c0 152.8 160 320 160 320s160-167.2 160-320zM250.741 161.92c0-47.712 38.656-86.368 86.4-86.368s86.4 38.656 86.4 86.368c0 47.744-38.688 86.4-86.4 86.4s-86.4-38.688-86.4-86.4z'%3E%3C/path%3E%3C/svg%3E")`

  return (
    <div
      className={classNames(styles.retailerLocation, className)}
      style={{ ...fontInfo, color: template?.cssVars?.retailerLocationTextColor }}
      onClick={onClick}
    >
      {distanceStore != null && (
        <div className={styles.distanceStore} style={{ backgroundColor: template?.cssVars?.pillBackgroundColor }}>
          <div className={styles.distanceStoreIcon} style={{ backgroundImage }}></div>
          <div
            className={styles.distanceStoreContent}
            style={{ color: template?.cssVars?.pillTextColor }}
          >{`${distanceStore?.distance} ${distanceStore.unit}`}</div>
        </div>
      )}
    </div>
  )
}

export const RetailerLocation = memo(RetailerLocationComponent)
