import React, { memo, useMemo } from 'react'
import styles from './Image.module.css'
import PictureWebP from '~/components/picture-webp/PictureWebP'
import { useStaticPath, useStaticPathForWebP } from '~/hooks/use-static-path'
import { ICollapsibleSectionContentDataOpt } from '~/typings/schemaopt'

const ImageComponent: React.FC<ICollapsibleSectionContentDataOpt['img']> = (props) => {
  const imageSrc = useStaticPath(props?.data?.src)
  const imageWebp = useStaticPathForWebP(props?.data?.src)

  const componentProps = useMemo(() => {
    return {
      className: styles.image,
      src: imageSrc,
      webp: imageWebp,
      alt: props?.data?.alt,
      style: {
        width: props?.data?.maxWidth,
      }
    }
  }, [imageSrc, imageWebp, props?.data])

  if (!props?.data?.src) return null

  return <PictureWebP {...componentProps} />
}

export const Image = memo(ImageComponent)
