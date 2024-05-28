'use client'

import React, { useEffect } from 'react'
import { Stores } from '~/components/flyer/header/stores'
import { Localization } from '~/localization/config'
import { useAppStore } from '~/state/app'
import { useSchemaStore } from '~/state/schema'
import { ISchemaOpt } from '~/typings/schemaopt'
import CookiePolicyProvider from '~/utilities/cookie-policy-provider'

const HeaderStoresComponent = ({ schema, urlParams }: { schema: ISchemaOpt; urlParams?: { slug: string; flyerId: string } }) => {
  Localization.init()
  useSchemaStore.getState().setSchema(schema)

  useEffect(() => {
    useAppStore.getState().actions.setAppInfo(urlParams)
    CookiePolicyProvider.start()
  }, [urlParams])

  return <Stores />
}

export const HeaderStores = HeaderStoresComponent
