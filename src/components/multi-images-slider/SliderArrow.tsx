import classNames from 'classnames'
import React, { CSSProperties } from 'react'

type Props = {
  towards: 'sx' | 'dx'
  onClick?(e: { stopPropagation: () => void }): void
  isVisible?: boolean
  wrapperStyle?: CSSProperties
  classes?: { container?: string; wrapper?: string; sx?: string; dx?: string }
}

const defaultWrapperStyle = { boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', background: 'rgba(255, 255, 255, 0.72)' }

function SliderArrow({ towards, onClick, isVisible = true, classes, wrapperStyle = defaultWrapperStyle }: Props) {
  /* const styles =
    towards === 'dx'
      ? { container: { right: 0, opacity: isVisible ? '100' : '0' } }
      : { container: { left: 10, opacity: isVisible ? '100' : '0' }, icon: { transform: 'rotateY(180deg)' } } */

  const containerClass = classNames('absolute top-0 z-10 flex h-full items-center opacity-100', classes?.container, {
    [`${classes?.sx ?? 'left-0'}`]: towards === 'sx',
    [`${classes?.dx ?? 'right-0'}`]: towards === 'dx',
    '!opacity-0': !isVisible,
  })

  const wrapperClass = classNames('flex  rounded-full', classes?.wrapper)

  const newOnClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    if (onClick) onClick(e)
  }

  return (
    <div className={containerClass}>
      <div onClick={newOnClick} className={wrapperClass} style={wrapperStyle}>
        <svg
          className="h-9 w-9  rounded-full text-center"
          style={{
            transform: towards === 'sx' ? 'rotateY(180deg)' : '',
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 45 45"
          fill="none"
        >
          <g filter="url(#filter0_d_3292_1831)">
            <circle cx="24.9661" cy="22.3737" r="21.9113" />
          </g>
          <path
            d="M26.9571 22.7309L19.5199 12.9959C19.267 12.665 19.1377 12.2491 19.1319 11.7481C19.126 11.2471 19.2553 10.8235 19.5199 10.4772C19.7844 10.131 20.1051 9.95782 20.482 9.95782C20.8588 9.95782 21.1795 10.131 21.444 10.4772L29.6502 21.2188C29.8211 21.4425 29.9417 21.6784 30.0119 21.9266C30.0821 22.1748 30.1173 22.4429 30.1173 22.7309C30.1173 23.019 30.0821 23.2871 30.0119 23.5353C29.9417 23.7835 29.8211 24.0194 29.6502 24.2431L21.444 34.9846C21.1912 35.3156 20.8735 35.4849 20.4907 35.4925C20.108 35.5002 19.7844 35.3309 19.5199 34.9846C19.2553 34.6384 19.123 34.2186 19.123 33.7253C19.123 33.232 19.2553 32.8122 19.5199 32.466L26.9571 22.7309Z"
            fill="#1C1B1F"
          />
          <defs>
            <filter
              id="filter0_d_3308_3647"
              x="0.133305"
              y="0.462402"
              width="49.6655"
              height="49.6656"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="2.9215" />
              <feGaussianBlur stdDeviation="1.46075" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3308_3647" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3308_3647" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  )
}

export default SliderArrow
