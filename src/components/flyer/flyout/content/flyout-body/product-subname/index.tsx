import React, { memo, useMemo } from 'react'
import styles from './ProductSubName.module.css'
import { useFlyoutProductWithChildrens } from '~/hooks/use-product'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'
import classNames from 'classnames'
import { CLASS_NAME_FLYOUT_FONTS } from '~/utilities/fonts'


const ProductSubNameComponent: React.FC = () => {
  const schema = useSchemaStore.getState().schema
  const template = getTemplate(schema)
  const { product } = useFlyoutProductWithChildrens()

  const styleObject = useMemo(() => {
    return {
      fontSize: 14,
      lineHeight: '20px',
      color: product.flyoutSubTextColor ?? product.subTextColor ?? template?.cssVars?.flyoutProductSubNameTextColor,
    }
  }, [template, product])

  if (!product?.subName) return null

  return (
    <div
      className={classNames(styles.productSubName, CLASS_NAME_FLYOUT_FONTS[400])}
      style={styleObject}
      dangerouslySetInnerHTML={{ __html: product?.subName }}
    />
  )
}

export const ProductSubName = memo(ProductSubNameComponent)
