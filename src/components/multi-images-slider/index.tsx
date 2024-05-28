/* 
  “Doing nothing is better than being busy doing nothing.”
  ― Lao Tzu
*/

import React, { Children, ReactNode, useState } from 'react'
import SliderArrow from './SliderArrow'
import Slider from 'react-slick'
import { SliderCounter } from './SliderCounter'

const MultiImagesSlider = ({
  children,
  settings,
  slideCounter = false,
  showArrow,
  nextArrowCustomCount,
}: {
  children: ReactNode
  settings: any
  slideCounter?: boolean
  showArrow: boolean
  nextArrowCustomCount?: number
}) => {
  const [activeSlide, setActiveSlide] = useState(0)

  const afterChange = (current: number) => {
    setActiveSlide(current)
    settings.afterChange && settings.afterChange(current)
  }

  return (
    <>
      {slideCounter && (
        <SliderCounter>
          {activeSlide + 1}/{Children.count(children)}
        </SliderCounter>
      )}
      <Slider
        className="h-full w-full"
        {...settings}
        afterChange={afterChange}
        prevArrow={
          showArrow && settings.prevArrow ? (
            { ...settings.prevArrow, props: { ...settings.prevArrow.props, isVisible: settings.infinite || activeSlide > 0 } }
          ) : (
            <SliderArrow classes={{ container: 'pl-3' }} isVisible={settings.infinite || activeSlide > 0} towards="sx" />
          )
        }
        nextArrow={
          showArrow && settings.prevArrow ? (
            {
              ...settings.nextArrow,
              props: {
                ...settings.nextArrow.props,
                isVisible: settings.infinite || activeSlide < (nextArrowCustomCount ?? React.Children.count(children) - 1),
              },
            }
          ) : (
            <SliderArrow
              classes={{ container: 'pr-1' }}
              towards="dx"
              isVisible={settings.infinite || activeSlide < (nextArrowCustomCount ?? React.Children.count(children) - 1)}
            />
          )
        }
        customPaging={(i) => (
          <div
            className="relative h-[20px] rounded-full border p-[3px]"
            style={{
              borderColor: i === activeSlide ? '#101E3F' : 'transparent',
            }}
          >
            <div className="h-full w-full overflow-hidden rounded-full bg-[#101E3F]"></div>
          </div>
        )}
      >
        {children}
      </Slider>
    </>
  )
}

export default MultiImagesSlider
