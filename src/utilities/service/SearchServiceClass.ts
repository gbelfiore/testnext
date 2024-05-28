import { getConfigForCountry } from '~/config'
class SearchServiceClass {
  async search(flyerId: number, query: string): Promise<Array<string> | null> {
    let data: Array<string> = []
    try {
      const config = getConfigForCountry()

      const myHeaders = new Headers()
      myHeaders.append('x-api-key', config.SEARCH.API_KEY)

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        //   redirect: 'follow',
      }

      const url = `${config.SEARCH.URL.replace('{{FLYER_ID}}', `${flyerId}`)}?fields=id&q=${query}&fuzzy_prefix_length=${process.env.NEXT_PUBLIC_FUZZY_PREFIX_LENGTH}&fuzzy_tolerated_distance=${process.env.NEXT_PUBLIC_FUZZY_TOLERATED_DISTANCE}`
      const result = await fetch(url, requestOptions).then((response) => response.json())

      if (result.metadata.code == 200 && result.data && result.data.length > 0) {
        data = result.data.map((d: any) => d['FlyerGib'].id)
      }
    } catch (error) {
      console.error(error)
    }

    return data
  }
}

export default SearchServiceClass
