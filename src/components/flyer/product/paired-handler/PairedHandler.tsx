import React, { CSSProperties, memo, useMemo } from 'react'
import { PairedProduct } from '~/components/flyer/product/paired-product/PairedProduct'
import { useProductWithChildrens } from '~/hooks/use-product'

interface IPairedHandlerProps {
  sectionIndex: number
  productIndex: number
  ignoreModifier?: boolean
}

const PairedHandlerComponent = ({ sectionIndex, productIndex, ignoreModifier }: IPairedHandlerProps) => {
  const { product } = useProductWithChildrens(sectionIndex, productIndex)
  const pairedProduct = useMemo(() => (ignoreModifier ? undefined : product?.pairedProduct), [ignoreModifier, product])
  const hasPaired = useMemo(
    () => pairedProduct && Object.keys(pairedProduct).length > 0 && Object.values(pairedProduct).filter(Boolean).length > 0,
    [pairedProduct]
  )
  const modifier = useMemo(() => (ignoreModifier ? undefined : product?.modifier), [ignoreModifier, product])

  if (!hasPaired) return null

  const style: CSSProperties = {
    height: modifier === 'wide' ? '30%' : '22%',
  }

  return (
    <div style={style}>
      <PairedProduct pairedProduct={pairedProduct} />
    </div>
  )
}

export const PairedHandler = memo(PairedHandlerComponent)
