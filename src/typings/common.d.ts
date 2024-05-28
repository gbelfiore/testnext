interface IPriceTagColors {
	discountedPriceStrokeWidth: string;
	discountedPriceColor: string;
	discountedPriceStrokeColor: string;
	discountedPriceShadowColor: string;


	discountPriceTextColor: string;
	discountPriceBackgroundColor: string;

	priceTagTopBorderColor: string;
	priceTagTopTextColor: string;
	priceTagTopBackgroundColor: string;

	priceTagBackgroundColor: string;
	priceTagTextColor: string;
	priceTagBorderColor: string;

	unitTypeTextColor: string;
	unitTypeBackgroundColor: string;

	discountedCurrencyTextColor: string;
	discountedCurrencyBackgroundColor: string;

	priceCurrencyTextColor: string;
	priceCurrencyBackgroundColor: string;
}

interface ITiming {
	create: string | null;
	update: string | null;
}

interface IBundleColors {
	bundleHeaderTextColor: string;
	bundleHeaderBackgroundColor: string;
	bundleBackgroundColor: string;
	bundleSubTextColor: string;
	bundleProductBackgroundColor: string
	bundleProductTextColor: string;
	bundleProductBorderColor: string;
	bundleIconPlusColor: string;
}

type ITransformOrigin = 'center' | 'center left' | 'center right' | 'top' | 'top left' | 'top right' | 'bottom' | 'bottom left' | 'bottom right';

export { IPriceTagColors, IBundleColors, ITransformOrigin, ITiming };
