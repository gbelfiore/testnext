import React, { CSSProperties, memo } from 'react'
import { ITplSchema } from '~/typings/template'

const ChevronRightComponent = ({ template, isOpen }: { template: ITplSchema | null; isOpen?: boolean }) => {
  const style: CSSProperties = {
    position: 'absolute',
    right: '16px',
    fill: template?.cssVars?.collapsibleBlockTextColor,
    transform: `rotate(-${isOpen ? '0' : '90'}deg)`,
    transition: 'transform .3s ease',
  }

  return (
    <svg style={style} width="19" height="12" viewBox="0 0 19 12" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.28682 0.300049L9.80533 8.35561L17.3239 0.300049L18.9012 1.99006L10.5867 10.8985L9.80533 11.6991L9.01658 10.8907L0.709473 1.99006L2.28682 0.300049Z" />
    </svg>
  )
}

export const ChevronRight = memo(ChevronRightComponent)
