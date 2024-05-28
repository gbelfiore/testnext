
interface PriceTagProps {
  sectionIndex: number;
  productIndex: number;
  productBundleIndex?: number;
  priceTransformOrigin?: string;
}

interface TopLeftProps {
  hasDiscount: boolean;
  hasLineThrough: boolean;
}

export { PriceTagProps, TopLeftProps };
