import React, { memo, useMemo } from 'react'
import styles from './ProductName.module.css'
import { useFlyoutProductWithChildrens } from '~/hooks/use-product'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'
import classNames from 'classnames'
import { CLASS_NAME_FLYOUT_FONTS } from '~/utilities/fonts'


const ProductNameComponent: React.FC = () => {
  const schema = useSchemaStore.getState().schema
  const template = getTemplate(schema)
  const { product } = useFlyoutProductWithChildrens()

  const styleObject = useMemo(() => {
    return {
      fontSize: 16,
      lineHeight: '24px',
      color: product?.flyoutTextColor ?? product?.textColor ?? template?.cssVars?.flyoutProductNameTextColor,
    }
  }, [template, product])

  if (!product?.name) return null

  return (
    <div
      className={classNames(styles.productName, CLASS_NAME_FLYOUT_FONTS[800])}
      style={styleObject}
      dangerouslySetInnerHTML={{ __html: product?.name }}
    />
  )
}

export const ProductName = memo(ProductNameComponent)
