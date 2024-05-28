import React, { memo, useCallback } from 'react'

import { SearchItemProps } from '~/components/flyer/header/frequent-searches/search-item/typings'
import { useInteractionsStore } from '~/state/interactions'
import styles from './SearchItem.module.css'
import { getFontInfo } from '~/hooks/use-font-info'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'
import { IFontData } from '~/hooks/use-font-info/typings'
import { ColorToSvgFill } from '~/utilities/RgbToHex'

const SearchItemComponent: React.FC<SearchItemProps> = ({ searchKey }) => {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)

  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'searchItem', {
    fontFamily: template?.fonts?.families?.[0].name,
    fontWeight: 500,
    fontSize: 14,
  })

  const iconColor = ColorToSvgFill(template?.cssVars?.pageSectionSearchIconColor) ?? '%23fff'
  const backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18' fill='${iconColor}'%3E%3Cpath d='m16.467 18-5.146-5.134v-.813l-.278-.288a6.7 6.7 0 1 1 .721-.721l.288.278h.813L18 16.467 16.468 18ZM6.689 2.058a4.631 4.631 0 1 0 4.631 4.631 4.637 4.637 0 0 0-4.631-4.631Z'/%3E%3C/svg%3E")`

  const setSearchKey = useInteractionsStore((state) => state.setSearchKey)

  const onClick = useCallback(() => setSearchKey(searchKey), [searchKey, setSearchKey])

  return (
    <li
      style={{ ...fontInfo, backgroundImage: backgroundImage }}
      className={styles.searchItem}
      key={searchKey}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: searchKey }}
    />
  )
}

export const SearchItem = memo(SearchItemComponent)
