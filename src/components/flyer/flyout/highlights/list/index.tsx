import React, { CSSProperties, ReactNode } from 'react'
import { getFontInfo } from '~/hooks/use-font-info'
import { type IFontData } from '~/hooks/use-font-info/typings'
import { ITplSchema } from '~/typings/template'

const List = ({ template, children }: { template?: ITplSchema | null; children?: ReactNode }) => {
  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'hightlights', {
    fontWeight: 900,
    fontSize: 20,
    fontFamily: template?.fonts?.families?.[1]?.name,
    lineHeight: '120%',
  })

  const style: CSSProperties = {
    width: '100%',
    color: template?.cssVars?.highlightTextColor,
    textAlign: 'center',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    columnGap: 3,
    rowGap: '8px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    ...fontInfo,
  }

  return <ul style={style}>{children}</ul>
}

export { List }
