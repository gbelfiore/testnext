import React, { CSSProperties } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import PictureWebP from '~/components/picture-webp/PictureWebP'
import HeaderBanner from './HeaderBanner'
import { IMediaData } from '~/typings/schema'
import { getStaticPath, getStaticPathForWebP } from '~/hooks/use-static-path'
import MultiImagesSlider from '~/components/multi-images-slider'
import { useAppStore } from '~/state/app'
import { isEmpty } from 'lodash-es'
import MediaUtils from '~/utilities/product/MediaUtils'

const settings: any = {
  centerMode: true,
  infinite: true,
  centerPadding: '20%',
  slidesToShow: 1,
  speed: 500,
  dots: true,
  dotsClass: 'slick-dots !bottom-[-30px]',
  responsive: [{ breakpoint: 767, settings: { centerPadding: '0', centerMode: false } }],
}

function MediaMultiImages({ title, src, headerBackgroundColor, bodyBackgroundColor, textColor, icon }: IMediaData['multiImages']) {
  const isDesktop = useAppStore((state) => state.isDesktop)
  const style: CSSProperties = {
    color: textColor,
    backgroundColor: headerBackgroundColor,
    fontSize: 29,
    fontWeight: '500',
  }

  const isHeader = !isEmpty(icon) || !isEmpty(title)
  const sliderHeight = isDesktop ? MediaUtils.getImageHeight(src[0]) / 2 : MediaUtils.getImageHeight(src[0])

  return (
    <div
      style={{
        backgroundColor: bodyBackgroundColor,
      }}
      className="h-full w-full bg-white"
    >
      {isHeader && (
        <HeaderBanner className="flex h-[70px] items-center pl-4" style={style} icon={icon}>
          {title}
        </HeaderBanner>
      )}

      <div className="box-border pt-2" style={{ height: sliderHeight }}>
        <MultiImagesSlider settings={settings} showArrow={Boolean(isDesktop)}>
          {src.map((src, index) => (
            <PictureWebP key={index} src={getStaticPath(src)} webp={getStaticPathForWebP(src)} className="h-full w-full object-contain md:px-1" />
          ))}
        </MultiImagesSlider>
      </div>
    </div>
  )
}

export default MediaMultiImages
