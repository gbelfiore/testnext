import { getConfigForCountry } from '.'
import { headers } from 'next/headers'

class ConfigSSRSingleton {
  private static instance: Record<string, ConfigSSRSingleton> = {}
  private config: any

  private constructor(config: any) {
    this.config = config
  }

  public static getConfig() {
    const headersList = headers()
    const host = headersList.get('warning') ?? headersList.get('host')
    const config = getConfigForCountry(host)
    const key = config.ENVIRONMENT

    if (!ConfigSSRSingleton.instance[key]) {
      ConfigSSRSingleton.instance[key] = new ConfigSSRSingleton(config)
    }

    return ConfigSSRSingleton.instance[key].config
  }
}

export default ConfigSSRSingleton
