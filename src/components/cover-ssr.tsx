// import Image from "next/image";
import React, { type CSSProperties, useMemo } from 'react'
import PictureWebP from '~/components/picture-webp/PictureWebP'
import { getStaticPathForWebP } from '~/hooks/use-static-path'

type Props = {
  src: string
  refKey: string
}

function CoverSSR({ src, refKey }: Props) {
  const webp = getStaticPathForWebP(src)

  const getStyle = useMemo<CSSProperties>(() => {
    const style: CSSProperties = {
      display: 'block',
      width: '100%',
      height: 'auto',
    }
    return style
  }, [])

  return <PictureWebP alt={`cover ${refKey}`} src={src} webp={webp} style={getStyle} />
}

export default CoverSSR
