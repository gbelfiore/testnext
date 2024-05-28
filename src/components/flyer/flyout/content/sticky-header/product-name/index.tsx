import React, { memo, useMemo } from 'react'
import styles from './StickyHeaderProductName.module.css'
import { useFlyoutProductWithChildrens } from '~/hooks/use-product'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'
import { CLASS_NAME_FLYOUT_FONTS } from '~/utilities/fonts'
import classNames from 'classnames'


const StickyHeaderProductNameComponent: React.FC = () => {
  const schema = useSchemaStore.getState().schema
  const template = getTemplate(schema)
  const { product } = useFlyoutProductWithChildrens()

  const styleObject = useMemo(() => {
    return {
      color: product?.flyoutTextColor ?? product?.textColor ?? template?.cssVars?.flyoutProductNameTextColor,
    }
  }, [template, product])

  if (!product?.name) return null

  return (
    <div
      className={classNames(CLASS_NAME_FLYOUT_FONTS[800], styles.stickyHeaderProductName)}
      style={styleObject}
      dangerouslySetInnerHTML={{ __html: product?.name }}
    />
  )
}

export const StickyHeaderProductName = memo(StickyHeaderProductNameComponent)
