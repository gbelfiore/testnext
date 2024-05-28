import React, { useMemo } from 'react'
import styles from './DiscountInfo.module.css'
import { DiscountInfoProps } from './typings'
import { ITplSchema } from '~/typings/template'

const DiscountInfo = ({ template, priceTagTopBorderColor, children }: DiscountInfoProps & { template?: ITplSchema | null }) => {
  const styleObject = useMemo(
    () => ({
      border: `1px solid ${priceTagTopBorderColor ?? template?.cssVars?.priceTagTopBorderColor}`,
    }),
    [priceTagTopBorderColor, template]
  )

  return (
    <div className={styles.discountInfo} style={styleObject}>
      {children}
    </div>
  )
}

export { DiscountInfo }
