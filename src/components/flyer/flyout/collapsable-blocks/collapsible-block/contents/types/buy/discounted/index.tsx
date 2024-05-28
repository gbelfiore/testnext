import { CSSProperties } from 'react'
import { getFontInfo } from '~/hooks/use-font-info'
import { type IFontData } from '~/hooks/use-font-info/typings'
import { IPriceTagColorsOpt } from '~/typings/schemaopt'
import { ITplSchema } from '~/typings/template'

const Discounted = ({
  template,
  discounted,
  discountedPriceColor,
  discountedPriceStrokeColor,
  discountedPriceStrokeWidth,
  priceTagBackgroundColor,
}: IPriceTagColorsOpt & { discounted?: string; template?: ITplSchema | null }) => {
  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'discountedSvg', {
    fontFamily: template?.fonts?.families?.[0]?.name,
    fontWeight: 700,
    fontSize: 29,
    letterSpacing: '-1px',
  })
  const style: { container: CSSProperties; svg: CSSProperties } = {
    container: {
      backgroundColor: priceTagBackgroundColor ?? template?.cssVars?.priceTagBackgroundColor,
      borderRadius: '0px 0px 4px 4px',
      overflow: 'hidden',
      height: 77,
    },

    svg: {
      width: 160,
      margin: '0 -11px',
      fill: discountedPriceColor ?? template?.cssVars?.discountedPriceColor,
      stroke: discountedPriceStrokeColor ?? template?.cssVars?.discountedPriceStrokeColor,
      strokeWidth: Number(discountedPriceStrokeWidth ?? template?.cssVars?.discountedPriceStrokeWidth) + 2,
      paintOrder: 'stroke',
      strokeLinejoin: 'round',
      transform: 'scaleX(.87)',
      ...fontInfo,
    },
  }

  return (
    <div style={style.container}>
      <svg style={style.svg} viewBox="0 0 94 36">
        <filter id="glow">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="white" />
        </filter>
        <text x="50%" y="28" textAnchor="middle" filter="url(#glow)">
          {discounted}
        </text>
      </svg>
    </div>
  )
}

export { Discounted }
