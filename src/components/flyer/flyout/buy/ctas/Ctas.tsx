import React, { memo } from 'react'
import styles from './Ctas.module.css'
import { Ctas as PriceButtons } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/buy/ctas/Ctas'

const CtasComponent: React.FC = () => {
  return (
    <div className={styles.ctas}>
      <PriceButtons isVertical={false} />
    </div>
  )
}

export const Ctas = memo(CtasComponent)
