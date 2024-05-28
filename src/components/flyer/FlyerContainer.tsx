'use client'
import { useSchemaStore } from '~/state/schema'
import { IFlyerContainerProps } from './types'
import { useAppStore } from '~/state/app'
import { Localization } from '~/localization/config'
import CookiePolicyProvider from '~/utilities/cookie-policy-provider'
import { Fragment, useEffect } from 'react'
import { useTrackingStore } from '~/state/trackings'

const FlyerContainer = ({ schema, children, urlParams, isBackoffice }: IFlyerContainerProps) => {
  const isClient = useAppStore((state) => state.isClient)

  Localization.init()
  useSchemaStore.getState().setSchema(schema)
  useTrackingStore.getState().setLastOpenedFlyerId(schema?.id)

  useEffect(() => {
    useAppStore.getState().actions.setAppInfo(urlParams, isBackoffice)
    CookiePolicyProvider.start()
  }, [isBackoffice, urlParams])

  // return children
  return <Fragment key={`isClient_${isClient}`}>{children}</Fragment>
}

export default FlyerContainer
