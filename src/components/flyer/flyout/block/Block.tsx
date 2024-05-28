import React, { useMemo } from 'react'
import { getFontInfo } from '~/hooks/use-font-info'
import { type IFontData } from '~/hooks/use-font-info/typings'
import { getTemplate } from '~/hooks/use-template'
import { useSchemaStore } from '~/state/schema'
import { BlockProps } from './typings'

const Block: React.FC<BlockProps> = ({ isDesktop, children }) => {
  const schema = useSchemaStore.getState().schema
  const template = getTemplate(schema)

  const styleObject = useMemo(() => {
    const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'block', {
      fontWeight: 400,
      fontSize: 14,
      fontFamily: template?.fonts?.families?.[0]?.name,
      lineHeight: '19.2px',
    })
  
    return {
      padding: isDesktop ? '13px 0' : 13,
      ...fontInfo,
    }
  }, [template, isDesktop])

  return (
    <div style={styleObject}>
      { children }
    </div>
  )
}

export { Block }
