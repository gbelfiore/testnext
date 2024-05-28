import { create } from 'zustand'
import { BrowserService } from '~/utilities/browser-service'
import { useQueryStringStore } from '../queryString'
import { EventNames } from '~/utilities/event-tracker/enums'
import { EventTracker } from '~/utilities/event-tracker'
import { ITrackingsState } from './typings'
import { useSchemaStore } from '../schema'

const useTrackingStore = create<ITrackingsState>()((set, get) => ({
  lastOpenedFlyerId: undefined,
  setLastOpenedFlyerId: (flyerId?: number) => {
    if (!flyerId) return
    if (flyerId && flyerId === get().lastOpenedFlyerId) return
    set({lastOpenedFlyerId: flyerId}) 
    if (BrowserService.isBackoffice) return
    const { params: queryStringParams } = useQueryStringStore.getState()
    const { schema } = useSchemaStore.getState()
    if (schema?.id !== flyerId) return

    void EventTracker.sendEvent<EventNames.FLYER_OPEN>(
      EventNames.FLYER_OPEN,
      void 0
    )

    void EventTracker.sendEvent<EventNames.OFFER_OPEN>(EventNames.OFFER_OPEN, {
      fid: schema.id,
      utm_campaign: schema.name,
    })

    if (queryStringParams.hasOwnProperty("from_en")) {
      void EventTracker.sendEvent<EventNames.OFFER_VIEW>(EventNames.OFFER_VIEW, {
        fid: schema.id,
        utm_campaign: schema.name,
      })
    }
  },
}))

export { useTrackingStore }
