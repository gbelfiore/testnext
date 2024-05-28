import React from "react"
import { useFlyoutProductWithChildrens } from "~/hooks/use-product"
import { PriceTag } from "../buy/price-tag"
import { FlyoutPriceProps } from "./typings"

export const FlyoutPrice: React.FC<FlyoutPriceProps> = ({ ...props }) => {
  const { product } = useFlyoutProductWithChildrens()
  const price = product?.price
  const selectedBadge = product?.selectedBadge
  
  if (!price) return null

  return (
    <PriceTag price={price} selectedBadge={selectedBadge} {...props} />
  )
}
