import { getFontInfo } from '~/hooks/use-font-info'
import { type IFontData } from '~/hooks/use-font-info/typings'
import { CSSProperties, memo, useMemo } from 'react'

import styles from './text.module.css'
import { getTemplate } from '~/hooks/use-template'
import { useSchemaStore } from '~/state/schema'
import useSection from '~/hooks/use-section'

interface ITextProps {
  sectionIndex: number
  isSticky?: boolean
  color?: string
  children: React.ReactNode
}

const TextComponent = ({ sectionIndex, children, color }: ITextProps) => {
  const schema = useSchemaStore.getState().schema
  const section = useSection(sectionIndex)
  const template = getTemplate(schema, section)
  const headingTextColor = color ? color : section?.headingTextColor ?? template?.cssVars?.sectionHeadingTextColor
  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'sectionHeader', {
    fontSize: '32px',
    lineHeight: '104px',
    fontWeight: 700,
    fontFamily: template?.fonts?.families?.[0]?.name,
  })

  const getStyle = useMemo((): CSSProperties => {
    return {
      color: headingTextColor,
      // transform: isSticky ? "scale3d(.75, .75, 1)" : "scale3d(1, 1, 1)",
      ...fontInfo,
    }
  }, [fontInfo, headingTextColor])

  return (
    <div style={getStyle} className={styles.text}>
      {children}
    </div>
  )
}

export const Text = memo(TextComponent)
