'use client'
import { ToggleButton } from '~/components/flyer/header/search-form/toggle-button/ToggleButton'
import { HeaderStoresComponentProps } from './typings'
import { Translator } from '~/localization/translator'
import { TKeys } from '~/localization/languages/enum'
import { SectionTitle } from '~/components/flyer/header/section/Section'
import { memo } from 'react'
import { useRouter } from 'next/navigation'
import { useAppStore } from '~/state/app'
import QueryUrlUtility from '~/utilities/query-url-utility/QueryUrlUtility'

const HeaderStoresComponent = ({ count }: HeaderStoresComponentProps) => {
  const router = useRouter()
  const onClick = () => {
    QueryUrlUtility.removeParamsInQueryString('sectionId')
    QueryUrlUtility.removeParamsInQueryString('productId')

    const urlParams = useAppStore.getState().urlParams
    const url = `/${urlParams?.slug}/${urlParams?.flyerId}?${QueryUrlUtility.getQueryString()}`

    router.push(url)
  }
  return (
    <div className={'flex w-full flex-row items-center'}>
      <ToggleButton onClick={onClick} hasToggleButtonStores />
      <SectionTitle reduced={false}>
        <Translator tKey={TKeys.STORES} capitalizeFirst /> {count > 0 && <span>{`(${count})`}</span>}
      </SectionTitle>
    </div>
  )
}

export const HeaderStores = memo(HeaderStoresComponent)
