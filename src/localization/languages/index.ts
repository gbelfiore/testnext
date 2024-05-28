import { Resource } from 'i18next'
import { it } from '~/localization/languages/it'
import { en } from '~/localization/languages/en'
import { es } from '~/localization/languages/es'
import { pt } from '~/localization/languages/pt'
import { fr } from '~/localization/languages/fr'
import { LKeys } from '~/localization/languages/enum'

export const resources: Resource = {
  [LKeys.IT]: { translation: it },
  [LKeys.IT_IT]: { translation: it },
  [LKeys.EN]: { translation: en },
  [LKeys.EN_UK]: { translation: en },
  [LKeys.EN_US]: { translation: en },
  [LKeys.EN_AU]: { translation: en },
  [LKeys.EN_GB]: { translation: en },
  [LKeys.EN_NZ]: { translation: en },
  [LKeys.EN_ZA]: { translation: en },
  [LKeys.ES]: { translation: es },
  [LKeys.ES_ES]: { translation: es },
  [LKeys.ES_AR]: { translation: es },
  [LKeys.ES_CL]: { translation: es },
  [LKeys.ES_CO]: { translation: es },
  [LKeys.ES_EC]: { translation: es },
  [LKeys.ES_MX]: { translation: es },
  [LKeys.ES_PE]: { translation: es },
  [LKeys.ES_US]: { translation: es },
  [LKeys.PT]: { translation: pt },
  [LKeys.PT_PT]: { translation: pt },
  [LKeys.PT_BR]: { translation: pt },
  [LKeys.FR]: { translation: fr },
  [LKeys.FR_FR]: { translation: fr },
}
