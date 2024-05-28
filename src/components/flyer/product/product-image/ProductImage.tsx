import { CSSProperties, ReactNode, useMemo } from 'react'
import { ProductImageProps } from '~/components/flyer/product/product-image/typings'
import { useMultiImages } from '~/hooks/use-multi-images'
import { getStaticPath, getStaticPathForWebP } from '~/hooks/use-static-path'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import PictureWebP from '~/components/picture-webp/PictureWebP'
import s from './ProductImage.module.css'
import { TProductImageOpt } from '~/typings/schemaopt'
import MultiImagesSlider from '~/components/multi-images-slider'
import MultiImagesArrow from '~/components/multi-images-slider/MultiImagesArrow'

const CustomSlide = ({ style, dots, children }: { style?: CSSProperties; dots?: boolean; children: ReactNode }) => {
  style = {
    ...style,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: dots ? 'flex-start' : 'center',
  }
  return (
    <div className="relative" style={style}>
      {children}
    </div>
  )
}

const ProductImage = ({ sectionIndex, productIndex, dots = false, children }: ProductImageProps) => {
  const { product, variantIndex, isMultiImages, sliderImages } = useMultiImages(sectionIndex, productIndex)

  const productImage = product?.productImage

  const getImage = useMemo(() => getStaticPath(productImage), [productImage])
  const getImageWebP = useMemo(() => getStaticPathForWebP(productImage), [productImage])

  const settings = {
    dots,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <MultiImagesArrow towards="dx" />,
    prevArrow: <MultiImagesArrow towards="sx" />,
    className: s.slider,
    dotsClass: 'slick-dots !bottom-[0px]',
  }

  return (
    <div className={s.productImage}>
      {children}
      {isMultiImages && (
        <MultiImagesSlider settings={settings} slideCounter showArrow>
          {sliderImages?.map((src: TProductImageOpt) => {
            const getImage = getStaticPath(src)
            const getImageWebP = getStaticPathForWebP(src)

            return (
              <CustomSlide key={variantIndex} dots={settings.dots}>
                <PictureWebP
                  className="w-full object-contain"
                  style={{
                    height: settings.dots ? 'calc(100% - 30px)' : '100%',
                  }}
                  src={getImage}
                  webp={getImageWebP}
                />
              </CustomSlide>
            )
          })}
        </MultiImagesSlider>
      )}

      {!isMultiImages && <PictureWebP className="h-full w-full object-contain" src={getImage} webp={getImageWebP} />}
    </div>
  )
}

export { ProductImage }
