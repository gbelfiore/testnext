'use client'
import { useCallback } from 'react'
import PictureWebP from '../../../picture-webp/PictureWebP'
import s from '../main-header/main-header.module.css'

interface Props {
  logoSrc?: string
  logoSrcWebP?: string
}
const Logo = ({ logoSrc, logoSrcWebP }: Props) => {
  const onClick = useCallback(() => {
    document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' })
    document.querySelector('nav')?.scrollTo({ left: 0, behavior: 'smooth' })
  }, [])

  if (!logoSrc || !logoSrcWebP) return null
  return <PictureWebP onClick={onClick} src={logoSrc} webp={logoSrcWebP} className={s.logo} alt={'logo'} />
}

export { Logo }
