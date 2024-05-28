import React, { memo, useMemo } from 'react'
import styles from './Ctas.module.css'
import { Cta } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/buy/ctas/cta'
import { useFlyoutCtas } from '~/hooks/use-flyout-ctas'

interface CtasComponentProps {
  isVertical?: boolean
}

const CtasComponent = ({ isVertical = true }: CtasComponentProps) => {
  const ctas = useFlyoutCtas()

  const styleObject: React.CSSProperties = useMemo(() => ({
    flexDirection: isVertical ? 'column' : 'row',
  }), [isVertical])

  if (!ctas || ctas.length === 0) return null
  
  return (
    <div className={styles.ctas} style={styleObject}>
      {ctas.map(({ action, icon, label, color, alternate }) => {
        return (
          <Cta
            key={`${action?.type}_${icon}_${label}_${color}_${alternate}`}
            action={action}
            icon={icon}
            label={label}
            color={color}
            alternate={alternate}
          />
        )
      })}
    </div>
  )
}

export const Ctas = memo(CtasComponent)
