'use client'
import axios from 'axios'
import { getConfigForCountry } from '~/config'

const config = getConfigForCountry()

class Services {
  baseUrl: string

  constructor(domain?: string) {
    this.baseUrl = `${domain ?? config.REACT_APP_SCHEMA_ENDPOINT}/api`
  }

  exec<TReturn>(url: string, method: 'get' | 'post' | 'put' = 'get', body: any | null = null, requestName?: string): Promise<TReturn> {
    return new Promise<TReturn>((resolve, reject) => {
      const config = {
        method: method,
        url: `${this.baseUrl}${url}`,
        data: null,
      }

      if (body) config.data = body

      axios(config)
        .then((result: any) => {
          resolve(this.parseResult(result, requestName))
        })
        .catch((error) => {
          if (error.response.status === 404) {
            resolve(this.parseResult(null, requestName))
          } else {
            console.error(error)
            reject(error)
          }
        })
    })
  }

  parseResult<TReturn>(result: any, request?: string): TReturn {
    throw new Error('implements parseResult method')
  }
}

export default Services
