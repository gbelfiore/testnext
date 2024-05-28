import { VirtualizationConfig } from '~/utilities/product/VirtualizationUtility'
import { getTemplate } from '~/hooks/use-template'
import { CSSProperties, useMemo } from 'react'
import styles from './conteiner.module.css'
import { useSchemaStore } from '~/state/schema'
import useSection from '~/hooks/use-section'

interface IContainerProps {
  sectionIndex: number
  isSticky?: boolean
  children: React.ReactNode
  zIndex?: number
}

const Container = ({ sectionIndex, isSticky, children, zIndex }: IContainerProps) => {
  const schema = useSchemaStore.getState().schema
  const section = useSection(sectionIndex)
  const template = getTemplate(schema, section)
  const backgroundColor = section?.headingBackgroundColor ?? template?.cssVars?.sectionHeadingBackgroundColor

  let height: number
  if (template?.fontInfoCssVars.sectionHeaderLineHeight) {
    height = Number(template.fontInfoCssVars.sectionHeaderLineHeight.split('px')[0])
  } else {
    height = VirtualizationConfig.stickyHeadingHeight
  }

  const getStyle = useMemo((): CSSProperties => {
    return {
      backgroundColor: backgroundColor,
      height: isSticky ? height * 0.5 : height,
      position: isSticky ? 'sticky' : 'unset',
      zIndex: zIndex ?? 3,
    }
  }, [backgroundColor, height, isSticky, zIndex])

  return (
    <div style={getStyle} className={styles.container}>
      {children}
    </div>
  )
}

export { Container }
