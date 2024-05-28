import { CSSProperties } from 'react'
import { getFontInfo } from '~/hooks/use-font-info'
import { type IFontData } from '~/hooks/use-font-info/typings'
import { IPriceTagColorsOpt } from '~/typings/schemaopt'
import { ITplSchema } from '~/typings/template'
const Full = ({
  template,
  hasLineThrough,
  priceTagTopTextColor,
  fullPrice,
}: IPriceTagColorsOpt & { fullPrice: string; hasLineThrough?: boolean; template: ITplSchema | null }) => {
  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'full', {
    fontWeight: 700,
    fontSize: 16,
    fontFamily: template?.fonts?.families?.[0]?.name,
    lineHeight: '21px',
  })

  const style: CSSProperties = {
    color: priceTagTopTextColor ?? template?.cssVars?.priceTagTopTextColor,
    textAlign: 'center',
    marginLeft: 10,
    position: 'relative',
    overflow: 'hidden',
    ...fontInfo,
  }

  return (
    <div style={style}>
      <div
        style={{
          content: "''",
          display: 'block',
          height: '1px',
          position: 'absolute',
          backgroundColor: priceTagTopTextColor ?? template?.cssVars?.priceTagTopTextColor,
          top: '50%',
          left: '-15%',
          transform: 'rotate(-25deg)',
          width: '130%',
          visibility: hasLineThrough ? 'visible' : 'hidden',
        }}
      ></div>
      {fullPrice}
    </div>
  )
}

export { Full }
