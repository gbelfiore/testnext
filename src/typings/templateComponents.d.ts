import type eFormatPrice from '~/typings/eFormatPrice';
import { type ITiming, type IPriceTagColors } from './common';

type TTypePrice = 'price';
type TType = TTypePrice;

interface ITplGenericComponent {
	_id: string;
	type: TType;
	retailerId: number;
	name: string;
	saved: boolean;
	timing?: ITiming;
}

interface IFontInfoCssVars {
	fontSize?: string;
	fontSizeDesktop?: string;
	fontWeight?: string;
	fontFamily?: string;
	lineHeight?: string;
	lineHeightDesktop?: string;
	letterSpacing?: string;
	textTransform?: string;
}

interface ITplPriceComponentFontInfoCssVars {
	priceTagDiscounted?: IFontInfoCssVars;
	discounted?: IFontInfoCssVars;
	discountedCurrency?: IFontInfoCssVars;
	discount?: IFontInfoCssVars;
	price?: IFontInfoCssVars;
	priceCurrency?: IFontInfoCssVars;
	unitType?: IFontInfoCssVars;
}

interface ITplPriceComponentInfo {
	priceDecimalSeparator: string;
	discountDecimalSeparator: string;
	priceTagWidth?: number;
	priceTagHeight?: number;
	priceTagZoom?: number;
	priceTagZoomFlyout?: number;
	priceTrasform?: string;
	formatPrice: eFormatPrice;
	centerPriceVertically: boolean;
}

type ITplPriceComponentCssVars = IPriceTagColors

interface ITplPriceComponent extends ITplGenericComponent {
	type: 'price';
	priceInfo?: ITplPriceComponentInfo;
	cssVars?: ITplPriceComponentCssVars;
	fontInfoCssVars?: ITplPriceComponentFontInfoCssVars;
}

type TTplComponents = ITplPriceComponent;

interface ITplComponents {
	price?: ITplPriceComponent['_id'];
}

export { IFontInfoCssVars, ITplPriceComponent, TTplComponents, ITplGenericComponent, TType, ITplComponents, ITplPriceComponentFontInfoCssVars };
