import { IProductOpt } from '~/typings/schemaopt'
import styles from './ProductVariantsSelector.module.css'
import { ITplSchema } from '~/typings/template'
import Slider from 'react-slick'
import SliderArrow from '~/components/multi-images-slider/SliderArrow'
import React, { useState } from 'react'
import { CLASS_NAME_FLYOUT_FONTS } from '~/utilities/fonts'
import classNames from 'classnames'
import { Translator } from '~/localization/translator'
import { TKeys } from '~/localization/languages/enum'


interface CarouselProps<T> {
  parent?: IProductOpt
  products: T[]
  renderItem: (item: T, index?: number) => React.ReactNode
  isExpanded?: boolean
  productsLimit?: number
  template: ITplSchema | null
}

const ProductVariantsSelector = ({ parent, products, renderItem, productsLimit = 2, isExpanded = false, template }: CarouselProps<IProductOpt>) => {
  const [activeSlide, setActiveSlide] = useState(0)

  const renderProducts = !isExpanded ? products.slice(0, productsLimit) : products
  const variantImages = renderProducts.map((variant: IProductOpt, index: number) => renderItem(variant, index))

  const afterChange = (current: number) => {
    setActiveSlide(current)
  }
  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'product-variant-selector w-full px-4 md:px-0',
    infinite: false,
    afterChange,
    variableWidth: true,
  }

  return (
    <div>
      <div className={classNames(styles.headline, CLASS_NAME_FLYOUT_FONTS[700])}>
        <Translator tKey={TKeys.AVAILABLE_IN} />
        {' '}{products.length + 1}{' '}
        <Translator tKey={TKeys.OPTIONS} />{':'}
      </div>
      <Slider
        {...settings}
        prevArrow={
          <SliderArrow
            classes={{ wrapper: 'h-7 w-7', sx: 'md:left-[-30px] left-[-6px]' }}
            wrapperStyle={{
              backgroundColor: 'transparent',
            }}
            //isVisible={activeSlide > 0}
            towards={'sx'}
          />
        }
        nextArrow={
          <SliderArrow
            classes={{ wrapper: 'h-7 w-7', dx: 'md:right-[-25px] right-[-6px]' }}
            wrapperStyle={{
              backgroundColor: 'transparent',
            }}
            isVisible={activeSlide < products.length - 1}
            towards={'dx'}
          />
        }
      >
        {parent && renderItem(parent, -1)}
        {variantImages}
      </Slider>
    </div>
  )
}

export { ProductVariantsSelector }
