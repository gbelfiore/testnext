import classNames from 'classnames'
import React, { CSSProperties } from 'react'

type Props = {
  towards: 'sx' | 'dx'
  onClick?(e: { stopPropagation: () => void }): void
  isVisible?: boolean
  wrapperStyle?: CSSProperties
  classes?: { container?: string; wrapper?: string; sx?: string; dx?: string }
}

const defaultWrapperStyle = { boxShadow: '0px 0px 1.5px 0px rgba(0, 0, 0, 0.24)', background: 'rgba(255, 255, 255, 0.72)' }

function MultiImagesArrow({ towards, onClick, isVisible = true, classes, wrapperStyle = defaultWrapperStyle }: Props) {
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
          className="flex items-center justify-center px-2"
          style={{
            transform: towards === 'sx' ? 'rotateY(180deg)' : '',
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 10 12"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.55459 9.7318C3.37886 9.90754 3.37886 10.1925 3.55459 10.3682C3.73033 10.5439 4.01525 10.5439 4.19099 10.3682L7.60459 6.95459C8.1318 6.42739 8.1318 5.57261 7.60459 5.04541L4.19099 1.6318C4.01525 1.45607 3.73033 1.45607 3.55459 1.6318C3.37886 1.80754 3.37886 2.09246 3.55459 2.2682L6.9682 5.6818C7.14393 5.85754 7.14393 6.14246 6.9682 6.3182L3.55459 9.7318Z"
            fill="#555555"
          />
        </svg>
      </div>
    </div>
  )
}

export default MultiImagesArrow
