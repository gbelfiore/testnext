import i18next, { type InitOptions } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { Languages } from '~/localization/config/enum'
import { resources } from '~/localization/languages'
import { type TranslatorProps } from '~/localization/translator/typings'
import { StringManipulator } from '~/utilities/string-manipulator'

class LocalizationClass {
  private static _instance: LocalizationClass

  private _i18n: typeof i18next = i18next
  private options: InitOptions = {
    fallbackLng: Languages.IT,
    partialBundledLanguages: true,
    cleanCode: true,
    load: 'currentOnly',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources,
  }

  public static get instance(): LocalizationClass {
    if (!this._instance) this._instance = new LocalizationClass()
    return this._instance
  }

  public get i18n(): typeof i18next {
    return this._i18n
  }

  constructor() {
    const languageDetector = new LanguageDetector(null, {
      order: ['navigator'],
    })
    this.i18n.use(languageDetector).use(initReactI18next)
  }

  public async init(): Promise<void> {
    if (!this.i18n.isInitialized) {
      await this.i18n.init(this.options)
    }
  }

  public t({ tKey, capitalizeFirst, capitalizeAll, options }: TranslatorProps) {
    let translation = this.i18n.t(tKey, options)
    if (capitalizeFirst) translation = StringManipulator.capitalizeFirstLetter(translation as string)
    if (capitalizeAll) translation = StringManipulator.capitalize(translation as string)
    return translation
  }
}

export const Localization = LocalizationClass.instance
