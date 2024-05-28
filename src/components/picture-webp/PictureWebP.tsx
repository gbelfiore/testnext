'use client'
import { useCallback, type LegacyRef, SyntheticEvent, useRef } from 'react'

export interface IPictureWebP {
  src: string
  webp?: string
  alt?: string
  className?: string
  style?: React.CSSProperties
  draggable?: boolean
  innerRef?: LegacyRef<HTMLImageElement> | undefined
  onClick?: () => void
}

const PictureWebP = ({ innerRef, src, webp, alt, className, style, draggable, onClick }: IPictureWebP) => {
  const preventsError = useRef<boolean>(false)
  const isSvg = src.includes('.svg')

  const onErrorWebP = useCallback(
    (evt: SyntheticEvent<HTMLImageElement>) => {
      if (!preventsError.current) {
        const currentTarget = evt.currentTarget
        currentTarget.onerror = null // prevents looping
        currentTarget.src = src
        preventsError.current = true
      }
    },
    [src]
  )

  return (
    <img
      ref={innerRef}
      style={style}
      className={className}
      src={isSvg || !webp ? src : webp}
      alt={alt}
      draggable={draggable}
      onClick={onClick}
      onError={isSvg ? () => {} : onErrorWebP}
    />
  )
}

export default PictureWebP
