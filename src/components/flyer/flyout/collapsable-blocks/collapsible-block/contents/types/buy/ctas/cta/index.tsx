'use client'
import React, { memo, useCallback, useMemo } from 'react'
import { Button, ButtonLink } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/buy/button'
import { useStaticPath, useStaticPathForWebP } from '~/hooks/use-static-path'
import { useFlyoutStore } from '~/state/flyout'
import { useSchemaStore } from '~/state/schema'
import { type ICtaOpt } from '~/typings/schemaopt'
import { EventTracker } from '~/utilities/event-tracker'
import { EventNames } from '~/utilities/event-tracker/enums'
import PictureWebP from '~/components/picture-webp/PictureWebP'
import { useAppStore } from '~/state/app'
import { getConfigForCountry } from '~/config'
import { openFlyout } from '~/utilities/flyout'

const CtaComponent = ({ action, icon, label, color, alternate }: ICtaOpt) => {
  const iconSrc = useStaticPath(icon)
  const iconWebp = useStaticPathForWebP(icon)
  const isDesktop = useAppStore((state) => state.isDesktop)
  const config = getConfigForCountry()

  const productId = useFlyoutStore((state) => state.activeProduct?.id)

  const productPosition = useFlyoutStore((state) => {
    return state.activeProduct?.position
  })
  // const dateFrom = useSchemaStore((state) => state.schema?.dateFrom);
  // const dateTo = useSchemaStore((state) => state.schema?.dateTo);
  const isFlyoutFullyOpen = useFlyoutStore((state) => state.isFlyoutFullyOpen)


  const sectionIndex = useSchemaStore((state) => {
    const sections = state.schema?.sections
    if (sections && productId) {
      return sections.findIndex((section) => section.products?.map((product) => product.id).includes(productId))
    }
  })

  const productIndex = useSchemaStore((state) => {
    if (sectionIndex != null) {
      const section = state.schema?.sections?.[sectionIndex]
      return section?.products?.findIndex((product) => product.id === productId)
    }
  })


  const onClickExternal = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (action?.type === 'external' && productIndex != null && sectionIndex != null) {
        void EventTracker.sendEvent<EventNames.CTA_CLICK>(EventNames.CTA_CLICK, {
          productIndex,
          sectionIndex,
          position: productPosition!,
          ctaUrl: action?.url,
          ctaLabel: label,
        })
      }

      return true
    },
    [action, label, productIndex, productPosition, sectionIndex]
  )

  const onClick = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      let canSendEvent = false

      switch (action?.type) {
        case 'extend':
          if (!isFlyoutFullyOpen) {
            canSendEvent = true
            setTimeout(() => {
              openFlyout()
            }, 600)
          }
          break
      }

      if (canSendEvent && productIndex != null && sectionIndex != null) {
        void EventTracker.sendEvent<EventNames.CTA_CLICK>(EventNames.CTA_CLICK, {
          productIndex,
          sectionIndex,
          position: productPosition!,
          ctaUrl: action?.url,
          ctaLabel: label,
        })
      }

      return false
    },
    [action?.type, action?.url, productIndex, sectionIndex, isFlyoutFullyOpen, productPosition, label]
  )

  const ctaDisabled = useMemo(() => {
    if (action?.type === 'extend') {
      return isFlyoutFullyOpen || isDesktop
    }
    return false
  }, [action?.type, isDesktop, isFlyoutFullyOpen])

  const getCtaItem = useCallback(() => {
    if (action?.type === 'external') {
      return (
        <ButtonLink
          href={action?.url}
          onClick={onClickExternal}
          color={color}
          alternate={alternate}
          disabled={ctaDisabled ?? false}
          rel={'noopener'}
          target="_blank"
        >
          <PictureWebP src={iconSrc} webp={iconWebp} alt={label} style={{ width: 20 }} />
          {label}
        </ButtonLink>
      )
    }

    if (action?.type === 'shoppinglist') {
      const link = `${config.SHOPPING_LIST.DEEP_LINK}/${productId}`
      return (
        <ButtonLink
          // href={link}
          onClick={(evt) => {
            evt.stopPropagation()
            window.open(link, '_self')
          }}
          color={color}
          alternate={alternate}
          disabled={ctaDisabled ?? false}
          rel="noopener"
          target="_self"
        >
          <PictureWebP src={iconSrc} webp={iconWebp} alt={label} style={{ width: 20 }} />
          {label}
        </ButtonLink>
      )
    }

    return (
      <Button onClick={onClick} color={color} alternate={alternate} disabled={ctaDisabled ?? false}>
        <PictureWebP src={iconSrc} webp={iconWebp} alt={label} style={{ width: 25 }} />
        {label}
      </Button>
    )
  }, [
    action?.type,
    action?.url,
    alternate,
    color,
    config.SHOPPING_LIST.DEEP_LINK,
    ctaDisabled,
    iconSrc,
    iconWebp,
    label,
    onClick,
    onClickExternal,
    productId,
  ])

  return getCtaItem()
}

export const Cta = memo(CtaComponent)
