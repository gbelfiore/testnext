'use client'
import React, { CSSProperties, memo } from 'react'
import { getFontInfo } from '~/hooks/use-font-info'
import { type IFontData } from '~/hooks/use-font-info/typings'
import { getTemplate } from '~/hooks/use-template'
import { useSchemaStore } from '~/state/schema'
import { ISchemaOpt } from '~/typings/schemaopt'
import { RefsManager } from '~/utilities/refs-manager'
import { RefTypes } from '~/utilities/refs-manager/enum'

interface IColophonProps {
  colophon: ISchemaOpt['colophon']
  refKey: string
}

const ColophonComponent = ({ colophon, refKey }: IColophonProps) => {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)
  const setColophonRef = RefsManager.useReferencesManager({
    type: RefTypes.IMAGE,
    removeOnUnmount: false,
    refKey,
  })

  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'colophon', {
    fontWeight: 700,
    fontSize: 10,
    fontFamily: template?.fonts?.families?.[0]?.name,
  })

  const style: CSSProperties = {
    backgroundColor: template?.cssVars?.colophonBackgroundColor,
    color: template?.cssVars?.colophonTextColor,
    ...fontInfo,
  }

  if (!colophon) return null

  return <div className={'w-full px-[19px] py-[9px]'} style={style} ref={setColophonRef} dangerouslySetInnerHTML={{ __html: colophon }}></div>
}

export const Colophon = memo(ColophonComponent)
