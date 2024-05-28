'use client'

import React, { memo, useEffect } from 'react'
import { SearchForm } from '~/components/flyer/header/search-form/SearchForm'
import { ToggleSearchButton } from '~/components/flyer/header/toggle-search-button/ToggleSearchButton'
import { FrequentSearches } from '~/components/flyer/header/frequent-searches'
import { CategoriesSection } from '~/components/flyer/header/categories-section'
import { type HeaderContentProps } from '~/components/flyer/header/header-content/typings'
import { Suggestions } from '~/components/flyer/header/search-form/suggestions/Suggestions'
import { useSchemaStore } from '~/state/schema'
import { Localization } from '~/localization/config'
import { useAppStore } from '~/state/app'
import CookiePolicyProvider from '~/utilities/cookie-policy-provider'
import { useInteractionsStore } from '~/state/interactions'

const HeaderContentComponent = ({ schema, isSearch = false, urlParams, flatMapProducts }: HeaderContentProps) => {
  Localization.init()
  useSchemaStore.getState().setSchema(schema)
  useSchemaStore.getState().setFlatMapProducts(flatMapProducts)
  const searchKey = useInteractionsStore((state) => state.searchKey)

  useEffect(() => {
    useAppStore.getState().actions.setAppInfo(urlParams)
    CookiePolicyProvider.start()
  }, [urlParams])

  return (
    <div className={'mx-[auto] my-[0] h-screen max-w-[758px]'}>
      <SearchForm />
      <ToggleSearchButton isSearch={isSearch} />

      <Suggestions schema={schema} />

      {!searchKey && <FrequentSearches />}
      <CategoriesSection schema={schema} />
    </div>
  )
}

export const HeaderContent = memo(HeaderContentComponent)
