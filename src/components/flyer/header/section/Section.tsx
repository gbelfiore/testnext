import { CSSProperties, memo } from 'react'

import { getFontInfo } from '~/hooks/use-font-info'
import { IFontData } from '~/hooks/use-font-info/typings'
import { getTemplate } from '~/hooks/use-template'
import { useSchemaStore } from '~/state/schema'

interface ISectionProps {
  title?: string | React.ReactNode
  children?: React.ReactNode
  reduced?: boolean
  otherStyle?: CSSProperties
}

interface ISectionTitleProps {
  children?: React.ReactNode
  reduced?: boolean
}

const SectionTitle = ({ children, reduced }: ISectionTitleProps) => {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)
  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'searchSectionTitle', {
    fontFamily: template?.fonts?.families?.[0]?.name,
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: '-1px',
  })
  const style: CSSProperties = {
    color: template?.cssVars?.pageSectionTitleTextColor ?? '#fff',
    margin: reduced ? '0 4px 11px' : 0,
    ...fontInfo,
  }
  return (
    <h2 className={'p-0 not-italic'} style={style}>
      {children}
    </h2>
  )
}

const SectionComponent = ({ children, title, reduced, otherStyle = {} }: ISectionProps) => {
  const style: CSSProperties = {
    padding: reduced ? '20px 13px 0 13px' : '20px 19px 0 19px',
    ...otherStyle,
  }
  return (
    <section className={'float-left w-full [&>button]:my-[8px]'} style={style}>
      {title && <SectionTitle reduced={reduced}>{title}</SectionTitle>}
      {children}
    </section>
  )
}

const Section = memo(SectionComponent)
export { Section, SectionTitle }
