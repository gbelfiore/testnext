import React, { memo } from 'react'
import { Translator } from '~/localization/translator'
import { TKeys } from '~/localization/languages/enum'
import { useSchemaStore } from '~/state/schema'
import { Section } from '~/components/flyer/header/section/Section'
import { SearchItem } from './search-item/SearchItem'

const FrequentSearchesComponent: React.FC = () => {
  const { schema } = useSchemaStore((state) => state)
  let frequentSearches = schema?.frequentSearches
  frequentSearches = frequentSearches?.filter((searchKey) => searchKey !== '')

  if (!frequentSearches || frequentSearches.length === 0) return null

  return (
    <Section title={<Translator tKey={TKeys.MOST_SEARCHED_PRODUCTS} capitalizeFirst />}>
      {frequentSearches.length > 0 && (
        <ul className={'list-none p-0'}>
          {frequentSearches.map((searchKey) => (
            <SearchItem key={searchKey} searchKey={searchKey} />
          ))}
        </ul>
      )}
    </Section>
  )
}

export const FrequentSearches = memo(FrequentSearchesComponent)
