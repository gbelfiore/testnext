import { useMemo } from 'react'
import { useFlyoutStore } from '~/state/flyout'
import { useSchemaStore } from '~/state/schema'
import { useQueryStringStore } from '~/state/queryString'
import { BrowserService } from '~/utilities/browser-service'
import { getConfigForCountry } from '~/config'


export function useFlyoutCtas() {
  const config = getConfigForCountry()
  const { activeProduct } = useFlyoutStore((state) => state)
  const { schema } = useSchemaStore((state) => state)

  const ctas = useMemo(() => {
    const { params: queryStringParams } = useQueryStringStore.getState()
    const activeCtas = activeProduct?.ctas
    const fallbackCtas = schema?.retailer?.ctas

    if (BrowserService.isServer()) return []

    return [...(activeCtas ?? []), ...(fallbackCtas ?? [])]
      .filter(({ action, validity }) => {
        if (queryStringParams.t == 'm' && validity?.mobile === false) return false
        if (queryStringParams.t !== 'm' && validity?.web === false) return false
        if ((action?.type === 'shoppinglist' && !config.SHOPPING_LIST.ENABLED)) return false
        if (action?.type === 'share') return false // share CTA allways visible in flyout header, so nos showing it here even if present in schema

        return true
      })
  }, [activeProduct, schema, config])

  return ctas
}
