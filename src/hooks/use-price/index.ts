import { useMemo } from 'react'
import { type IProductPriceOpt } from '~/typings/schemaopt'
import { type ITplPriceComponent } from '~/typings/templateComponents'
import { Manipulator } from '~/utilities/manipulator'
import useTemplate from '../use-template'

const usePrice = (price?: IProductPriceOpt, templateComponentPrice?: ITplPriceComponent | null) => {
  const template = useTemplate()
  const retailerSeparators = useMemo(() => {
    return {
      priceDecimalSeparator: templateComponentPrice?.priceInfo?.priceDecimalSeparator ?? template?.priceInfo?.priceDecimalSeparator,
      discountDecimalSeparator: templateComponentPrice?.priceInfo?.discountDecimalSeparator ?? template?.priceInfo?.discountDecimalSeparator,
    }
  }, [template, templateComponentPrice])

  const fullContainsLetters = useMemo(() => {
    if (price?.full) {
      const regExp = /[a-zA-Z]/g
      return regExp.test(price.full)
    }
    return false
  }, [price?.full])

  const full = useMemo(() => {
    if (price?.full) {
      price.full = price?.full?.trim()
      if (fullContainsLetters) return [price.full]
      return Manipulator.formatPrice(price?.full)
    }
  }, [fullContainsLetters, price])

  const discounted = useMemo(() => {
    if (price?.discounted) {
      return Manipulator.formatPrice(price?.discounted)
    }
  }, [price?.discounted])

  const discount = useMemo(() => {
    if (price?.discount) {
      const discount = price?.discount.trim()
      if (discount && discount !== '') return discount
    }
  }, [price?.discount])

  const fullHasDecimals = useMemo(() => (fullContainsLetters ? false : Boolean(full && full?.length > 1)), [full, fullContainsLetters])

  const discountedHasDecimals = useMemo(() => Boolean(discounted && discounted?.length > 1), [discounted])

  const priceData = {
    full: {
      value: full,
      hasDecimals: fullHasDecimals,
      hasLineThrough: !fullContainsLetters,
    },
    discount: { value: discount },
    discounted: {
      value: discounted,
      hasDecimals: discountedHasDecimals,
    },
    separators: {
      full: price?.priceDecimalSeparator || retailerSeparators.priceDecimalSeparator || ',',
      discounted: price?.discountDecimalSeparator || retailerSeparators.discountDecimalSeparator || ',',
    },
  }

  return {
    ...priceData,
    composer: {
      full: priceData.full.value
        ? discountedHasDecimals
          ? `${priceData.full.value[0]}${priceData.separators.full}${priceData.full.value[1]}`
          : priceData.full.value[0]
        : '',
      discounted: priceData.discounted.value
        ? discountedHasDecimals
          ? `${priceData.discounted.value[0]}${priceData.separators.discounted}${priceData.discounted.value[1]}`
          : priceData.discounted.value[0]
        : '',
    },
  }
}

export { usePrice }
