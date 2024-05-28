// @@deprecate
import { headers } from 'next/headers'
import { getConfigForCountry } from '.'

const getConfigSSR = () => {
  const headersList = headers()
  const config = getConfigForCountry(headersList.get('warning'))
  return config
}

export { getConfigSSR }
