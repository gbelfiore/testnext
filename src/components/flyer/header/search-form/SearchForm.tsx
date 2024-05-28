import React, { memo, useCallback, useEffect, useRef } from 'react'

import { TKeys } from '~/localization/languages/enum'
import { Translator } from '~/localization/translator'
import { InputSearch } from '~/components/flyer/header/search-form/input-search/InputSearch'
import { useInteractionsStore } from '~/state/interactions'
import { ToggleButton } from '~/components/flyer/header/search-form/toggle-button/ToggleButton'
import { useRouter } from 'next/navigation'
import QueryUrlUtility from '~/utilities/query-url-utility/QueryUrlUtility'
import { useAppStore } from '~/state/app'

const SearchFormComponent: React.FC = () => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const router = useRouter()

  const onClick = useCallback(() => {
    QueryUrlUtility.removeParamsInQueryString('sectionId')
    QueryUrlUtility.removeParamsInQueryString('productId')

    const urlParams = useAppStore.getState().urlParams
    const url = `/${urlParams?.slug}/${urlParams?.flyerId}?${QueryUrlUtility.getQueryString()}`

    router.push(url)
  }, [router])

  const onFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchKey = useInteractionsStore.getState().searchKey
    if (searchKey) {
      timeout.current = setTimeout(() => globalThis.scrollTo({ top: 0 }), 0)
    }
  }, [])

  useEffect(() => {
    const t = timeout.current
    return () => {
      if (t) clearTimeout(t)
    }
  }, [])

  return (
    <form onSubmit={onFormSubmit} className={'float-left !flex w-[calc(100%-63px)] pt-[7px]'}>
      <ToggleButton onClick={onClick}>
        <Translator tKey={TKeys.CLOSE_SEARCH} capitalizeFirst />
      </ToggleButton>
      <InputSearch />
    </form>
  )
}

export const SearchForm = memo(SearchFormComponent)
