import React, { memo, useCallback, useEffect, useState } from 'react'
// import FuzzySet from 'fuzzyset'
import { useInteractionsStore } from '~/state/interactions'
import { useSchemaStore } from '~/state/schema'
import styles from './Suggestions.module.css'
import Suggestion from './Suggestion'
import SearchServiceClass from '~/utilities/service/SearchServiceClass'
import { IProductOpt, ISchemaOpt } from '~/typings/schemaopt'
import { TFlatMapProductElement } from '~/typings/flatMapProducts'
import FuzzySet from 'fuzzyset'

const SuggestionsComponent = ({ schema }: { schema: ISchemaOpt }) => {
  const [results, setResults] = useState<Array<TFlatMapProductElement>>([])
  const searchKey = useInteractionsStore((state) => state.searchKey)
  const flatMapProducts = useSchemaStore((state) => state.flatMapProducts)

  const getFuzzySetDictionary = useCallback((): FuzzySet => {
    const products: Array<IProductOpt> = []
    const dictionary: Array<string> = []

    Object.values(flatMapProducts).forEach((element: TFlatMapProductElement) => {
      products.push(element.product)
      dictionary.push(element.product.name)
    })

    return FuzzySet(dictionary)
  }, [flatMapProducts])

  const fuzzySearch = useCallback(() => {
    if (!searchKey) return
    const dictionary = getFuzzySetDictionary()
    const approximations = dictionary.get(searchKey)

    const results: Array<TFlatMapProductElement> = []

    approximations?.every((approximation) => {
      const approximationKey = approximation[1]
      Object.values(flatMapProducts).every((element) => {
        const product = element.product
        if (product.name?.toLowerCase().includes(approximationKey.toLowerCase())) {
          results.push(element)
        }
        if (results.length == 5) return false
        return true
      })
      if (results.length == 5) return false
      return true
    })

    setResults(results)
  }, [flatMapProducts, getFuzzySetDictionary, searchKey])

  const elasticSearch = useCallback(async () => {
    if (!searchKey) return
    if (!schema.id) {
      fuzzySearch()
      return
    }

    const flatMapProducts = useSchemaStore.getState().flatMapProducts

    const searchService = new SearchServiceClass()
    const resultSearch = await searchService.search(schema.id, searchKey)

    const results: Array<TFlatMapProductElement> = []
    resultSearch?.forEach((productKey) => {
      if (flatMapProducts[productKey]) results.push(flatMapProducts[productKey])
    })
    setResults(results)
  }, [fuzzySearch, schema.id, searchKey])

  useEffect(() => {
    if (schema.id && schema.version && schema.version >= 2) elasticSearch()
    else fuzzySearch()
  }, [elasticSearch, fuzzySearch, schema])

  if (!results || results.length === 0) return null

  return (
    <ul className={styles.list}>
      {results.map((element: TFlatMapProductElement, index: number) => {
        return <Suggestion key={`res_${index}_${element.product.id}`} schema={schema} element={element} />
      })}
    </ul>
  )
}

export const Suggestions = memo(SuggestionsComponent)
