import { type CSSProperties, memo, useMemo } from 'react'
import { type CoverProps } from '~/components/flyer/cover/typings'
import PictureWebP from '~/components/picture-webp/PictureWebP'
import { useStaticPath, useStaticPathForWebP } from '~/hooks/use-static-path'
import { RefsManager } from '~/utilities/refs-manager'
import { RefTypes } from '~/utilities/refs-manager/enum'

const CoverComponent = ({ src, alt, refKey }: CoverProps) => {
  const setCoverRef = RefsManager.useReferencesManager({
    type: RefTypes.IMAGE,
    removeOnUnmount: false,
    refKey,
  })

  const coverSrc = useStaticPath(src)
  const coverWebPSrc = useStaticPathForWebP(src)

  const getStyle = useMemo<CSSProperties>(() => {
    const style: CSSProperties = {
      display: 'block',
      width: '100%',
      position: 'absolute',
    }
    return style
  }, [])

  if (!src) return null

  return <PictureWebP innerRef={setCoverRef} src={coverSrc} webp={coverWebPSrc} alt={alt} draggable={false} style={getStyle} />
}

export const Cover = memo(CoverComponent)
