import { type CSSProperties, useMemo } from 'react'
import { type SectionBgPatternProps } from '~/components/flyer/section/bg/typings'
import { useStaticPath, useStaticPathForWebP } from '~/hooks/use-static-path'
import useWebP from '~/hooks/use-webp/useWebP'
import styles from './Bg.module.css'
import useSection from '~/hooks/use-section'

const SectionBgPattern = ({ sectionIndex }: SectionBgPatternProps) => {
  const section = useSection(sectionIndex)
  const backgroundPattern = useStaticPath(section?.backgroundPattern)
  const backgroundPatternWebP = useStaticPathForWebP(section?.backgroundPattern)

  const imageSrc = useWebP({
    src: backgroundPattern,
    webp: backgroundPatternWebP,
  })

  const getStyle = useMemo((): CSSProperties => {
    return {
      backgroundImage: imageSrc ? `url(${imageSrc})` : 'none',
    }
  }, [imageSrc])

  if (!backgroundPattern && !backgroundPatternWebP) return null

  return <div className={styles.bg} style={getStyle}></div>
}

export { SectionBgPattern }
