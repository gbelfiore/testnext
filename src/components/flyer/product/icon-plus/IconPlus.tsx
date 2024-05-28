import { getTplStaticPath, getTplStaticPathForWebP } from '~/hooks/use-static-path'
import { getTemplate } from '~/hooks/use-template'
import { type CSSProperties, useMemo, useState, useEffect } from 'react'
import { AnimateKeyframes } from 'react-simple-animate'
import { type IIconPlusProps } from './typings'
import { useSchemaStore } from '~/state/schema'
import useSection from '~/hooks/use-section'
import PictureWebP from '~/components/picture-webp/PictureWebP'

const IconPlus = ({ sectionIndex }: IIconPlusProps) => {
  const [show, setShow] = useState<boolean>(true)
  const schema = useSchemaStore.getState().schema
  const section = useSection(sectionIndex)
  const template = getTemplate(schema, section)
  const productInfo = template?.productInfo

  const iconPlusImage = getTplStaticPath(productInfo?.iconPlusImage)
  const iconPlusImageWepP = getTplStaticPathForWebP(productInfo?.iconPlusImage)

  const width = productInfo?.iconPlusWidth || '50px'
  const height = productInfo?.iconPlusHeight || '50px'
  const top = productInfo?.iconPlusPositionY || '50px'
  const left = productInfo?.iconPlusPositionX || '50px'

  let duration = productInfo?.iconPlusAnimationDuration ? parseInt(productInfo.iconPlusAnimationDuration) : 0.8
  duration = duration ? duration : 0.8
  const iterationCount = productInfo?.iconPlusBlinkTimes ?? 3

  useEffect(() => {
    setTimeout(
      () => {
        setShow(false)
      },
      iterationCount * (duration ?? 0.8) * 1000
    )
  }, [duration, iterationCount])

  const getStyle = useMemo((): CSSProperties => {
    return {
      display: 'block',
      position: 'absolute',
      width: width,
      height: height,
      top: `calc(${top} - (${height} / 2))`,
      left: `calc(${left} - (${width} / 2))`,
      zIndex: productInfo?.iconPlusLevel || 10,
    }
  }, [height, left, productInfo, top, width])

  const getStyleIcon = useMemo((): CSSProperties => {
    return {
      opacity: productInfo?.iconPlusOpacity || '30%',
    }
  }, [productInfo])

  return (
    <div style={getStyle}>
      <AnimateKeyframes
        play
        iterationCount={iterationCount}
        duration={duration}
        keyframes={['opacity: 0', `opacity: ${productInfo?.iconPlusOpacity}`]}
        fillMode={'forwards'}
      >
        {show && <PictureWebP style={getStyleIcon} src={iconPlusImage} webp={iconPlusImageWepP} />}
      </AnimateKeyframes>
    </div>
  )
}

export { IconPlus }
