import React, { type CSSProperties, memo, useMemo } from 'react'

import { getTplStaticPath, getTplStaticPathForWebP } from '~/hooks/use-static-path'
import { getTemplate } from '~/hooks/use-template'
import { type ITplBadge } from '~/typings/template'
import { Manipulator } from '~/utilities/manipulator'
import PictureWebP from '../picture-webp/PictureWebP'
import { useSchemaStore } from '~/state/schema'
import useSection from '~/hooks/use-section'
import { useProductWithChildrens } from '~/hooks/use-product'

interface IBadgeProps {
  sectionIndex: number
  productIndex: number
  productBundleIndex?: number
  isInFlyout?: boolean
}

const BadgeComponent = ({ sectionIndex, productIndex, productBundleIndex, isInFlyout }: IBadgeProps) => {
  const schema = useSchemaStore.getState().schema
  const section = useSection(sectionIndex)
  const { product } = useProductWithChildrens(sectionIndex, productIndex, productBundleIndex)

  const templateSchema = getTemplate(schema)
  const templateSection = getTemplate(schema, section)

  const badges = useMemo((): { badgesSchema: ITplBadge[]; badgesSection: ITplBadge[] } => {
    let badgesSchema: ITplBadge[] = []
    if (templateSchema?.badges) badgesSchema = templateSchema.badges

    let badgesSection: ITplBadge[] = []
    if (templateSection?.badges) badgesSection = templateSection.badges

    return { badgesSchema, badgesSection }
  }, [templateSchema, templateSection])

  const badge = useMemo(() => {
    const { badgesSchema, badgesSection } = badges

    if (badgesSection.length > 0) {
      const badge = badgesSection.find((badge: ITplBadge) => badge.name === product?.selectedBadge)
      if (badge) {
        return {
          data: badge,
          src: getTplStaticPath(badge.src, templateSection?.basePath),
          webp: getTplStaticPathForWebP(badge.src, templateSection?.basePath),
        }
      }
    }

    if (badgesSchema.length > 0) {
      const badge = badgesSchema.find((badge: ITplBadge) => badge.name === product?.selectedBadge)
      if (badge) {
        return {
          data: badge,
          src: getTplStaticPath(badge.src),
          webp: getTplStaticPathForWebP(badge.src),
        }
      }
    }

    return null
  }, [badges, product, templateSection])

  const getStyle = useMemo((): CSSProperties => {
    if (!badge) return {}
    const {
      transformOrigin,
      translateX,
      translateY,
      rotation,
      width,
      height,
      flyoutHeight,
      flyoutRotation,
      flyoutTransformOrigin,
      flyoutTranslateX,
      flyoutTranslateY,
      flyoutWidth,
      top,
      left,
      flyoutTop,
      flyoutLeft,
    } = badge.data
    const transform: string[] = []
    const translateXProp = isInFlyout && flyoutTranslateX ? flyoutTranslateX : translateX
    const translateYProp = isInFlyout && flyoutTranslateY ? flyoutTranslateY : translateY
    const rotationProp = isInFlyout && flyoutRotation ? flyoutRotation : rotation
    const heightProp = isInFlyout && flyoutHeight ? flyoutHeight : height
    const widthProp = isInFlyout && flyoutWidth ? flyoutWidth : width
    const origin = isInFlyout && flyoutTransformOrigin ? flyoutTransformOrigin : transformOrigin
    const topValue = isInFlyout && flyoutTop ? flyoutTop : top ? top : 0
    const leftValue = isInFlyout && flyoutLeft ? flyoutLeft : left ? left : 0

    if (translateXProp) {
      transform.push(`translateX(${translateXProp.includes('%') ? translateXProp : Manipulator.normalizeFontSize(translateXProp)})`)
    }
    if (translateYProp) {
      transform.push(`translateY(${translateYProp.includes('%') ? translateYProp : Manipulator.normalizeFontSize(translateYProp)})`)
    }
    if (rotationProp) {
      transform.push(`rotate3d(0, 0, 1, ${rotationProp.includes('deg') ? rotationProp : rotationProp + 'deg'})`)
    }
    const style = {
      width: widthProp ?? 'auto',
      height: heightProp ?? 'auto',
      transform: transform.length > 0 ? transform.join(' ') : 'none',
    }

    return {
      position: 'absolute',
      top: topValue,
      left: leftValue,
      zIndex: 1,
      transformOrigin: origin,
      ...style,
    } as CSSProperties
  }, [badge, isInFlyout])

  if (!badge) return null

  return (
    <PictureWebP
      src={badge.src}
      webp={badge.webp}
      alt={badge.data.name}
      style={getStyle}
      // fix for roules tailwind on img & video width and height issue: https://github.com/tailwindlabs/tailwindcss/issues/506
      className={'max-w-[unset]'}
    />
  )
}

export const Badge = memo(BadgeComponent)
