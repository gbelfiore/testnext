import React, { CSSProperties, memo, useCallback, useEffect, useRef } from 'react'
import { Localization } from '~/localization/config'
import { TKeys } from '~/localization/languages/enum'
import { RefsManager } from '~/utilities/refs-manager'
import { RefKeys, RefTypes } from '~/utilities/refs-manager/enum'
import { useInteractionsStore } from '~/state/interactions'
import { type IFontData } from '~/hooks/use-font-info/typings'
import { getFontInfo } from '~/hooks/use-font-info'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'

const InputSearchComponent: React.FC = () => {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const setInputRef = RefsManager.useReferencesManager({
    refKey: RefKeys.INPUT_SEARCH,
    type: RefTypes.INPUT,
    removeOnUnmount: false,
  })
  const setSearchKey = useInteractionsStore((state) => state.setSearchKey)

  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (timeout.current) clearTimeout(timeout.current)

      timeout.current = setTimeout(() => {
        setSearchKey(e.target.value)
      }, 200)
    },
    [setSearchKey]
  )

  useEffect(() => {
    const searchKey = useInteractionsStore.getState().searchKey
    const inputRef = RefsManager.getRef<HTMLInputElement>(RefKeys.INPUT_SEARCH)
    if (inputRef?.ref) inputRef.ref.value = searchKey
  }, [])

  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'searchInput', {
    fontFamily: template?.fonts?.families?.[0]?.name,
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '120%',
  })

  const colorStyle: CSSProperties = {
    backgroundColor: template?.cssVars?.searchInputBackgroundColor,
    color: template?.cssVars?.searchInputTextColor,
    caretColor: template?.cssVars?.searchInputCaretColor,
  }

  return (
    <input
      className={'h-[37px] flex-grow appearance-none rounded-[4px] border-[none] px-[8px] py-[0] not-italic outline-[none]'}
      style={{ ...fontInfo, ...colorStyle }}
      type={'text'}
      autoFocus
      ref={setInputRef}
      placeholder={
        Localization.t({
          tKey: TKeys.SEARCH,
          capitalizeFirst: true,
        }) as string
      }
      onChange={onSearchChange}
    />
  )
}

export const InputSearch = memo(InputSearchComponent)
