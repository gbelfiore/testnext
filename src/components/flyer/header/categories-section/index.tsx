import React, { memo } from 'react'
import { CategoriesPills } from '~/components/flyer/header/categories-pills'
import { Translator } from '~/localization/translator'
import { TKeys } from '~/localization/languages/enum'
import { Section } from '~/components/flyer/header/section/Section'
import type { ISectionOpt } from '~/typings/schemaopt'
import { RefsManager } from '~/utilities/refs-manager'
import { useFlyoutStore } from '~/state/flyout'

const CategoriesSectionComponent = ({ schema }: any) => {
  const scrollToSection = (sectionId: string, animated: boolean = true) => {
    const flyoutOpen = useFlyoutStore.getState().isFlyoutOpen
    const shoulAnimate = animated && !flyoutOpen
    if (flyoutOpen) useFlyoutStore.getState().closeFlyout()
    const sectionRef = RefsManager.getRef<HTMLDivElement>(`section-${sectionId}`)
    if (sectionRef?.ref) {
      if (shoulAnimate) {
        requestAnimationFrame(() => {
          globalThis.scroll({
            top: sectionRef?.ref.offsetTop + 1,
            behavior: 'smooth',
          })
        })
      } else {
        requestAnimationFrame(() => {
          globalThis.scrollTo(0, sectionRef?.ref.offsetTop + 1)
        })
      }
    }
  }

  const openSectionHeaderContent = (id: ISectionOpt['id']) => {
    if (!id) return
    scrollToSection(String(id), true)
  }

  return (
    <Section reduced title={<Translator tKey={TKeys.CATEGORIES} capitalizeFirst />}>
      <CategoriesPills schema={schema} openSection={openSectionHeaderContent} isFullPage={true} />
    </Section>
  )
}

export const CategoriesSection = memo(CategoriesSectionComponent)
