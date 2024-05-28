import { getFontInfo } from '~/hooks/use-font-info'
import { type IFontData } from '~/hooks/use-font-info/typings'
import { IPriceTagColorsOpt } from '~/typings/schemaopt'
import { ITplSchema } from '~/typings/template'

const Discount = ({
  template,
  priceTagTopTextColor,
  priceTagTopBorderColor,
  priceDiscount,
}: IPriceTagColorsOpt & { priceDiscount?: string; template?: ITplSchema | null }) => {
  const discountFontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'discount', {
    fontWeight: 700,
    fontSize: 18,
    fontFamily: template?.fonts?.families?.[0]?.name,
  })
  const discountFontInfoSmall: IFontData = getFontInfo(template?.fontInfoCssVars, 'discount', {
    fontSize: 11,
  })
  const style = {
    color: priceTagTopTextColor ?? template?.cssVars?.priceTagTopTextColor,
    transform: 'scale(1.5) translateY(-3.3px)',
    transformOrigin: 'right center',
    backgroundColor: '#fff',
    border: `1px solid ${priceTagTopBorderColor ?? template?.cssVars?.priceTagTopBorderColor}`,
    borderRadius: '4px 4px 0 0',
    padding: '0 2px',
    borderBottom: 'none',
    ...discountFontInfo,
  }

  const smallStyle = {
    verticalAlign: 'top',
    ...discountFontInfoSmall,
  }

  return (
    <div style={style}>
      {priceDiscount}
      <small style={smallStyle}>%</small>
    </div>
  )
}

export { Discount }
