import { getConfigForCountry } from '.'

class ConfigCSRSingleton {
  private static instance: Record<string, ConfigCSRSingleton> = {}
  private config: any

  private constructor() {
    const host = globalThis.location.host
    const config = getConfigForCountry(host)
    this.config = config
  }

  public static getConfig() {
    const host = globalThis.location.host

    if (!ConfigCSRSingleton.instance[host]) {
      ConfigCSRSingleton.instance[host] = new ConfigCSRSingleton()
    }
    return ConfigCSRSingleton.instance[host].config
  }
}

export default ConfigCSRSingleton
