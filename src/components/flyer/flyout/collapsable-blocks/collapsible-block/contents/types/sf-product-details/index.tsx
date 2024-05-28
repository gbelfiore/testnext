import React, { memo, useMemo } from 'react'
import styles from './SfProduct.module.css'
import contentsStyles from '../../Contents.module.css'
import classNames from 'classnames'
import { ICollapsibleSectionContentDataOpt } from '~/typings/schemaopt'
import { CLASS_NAME_FLYOUT_FONTS } from '~/utilities/fonts'

const SfProductDetailsComponent: React.FC<ICollapsibleSectionContentDataOpt['sfProductDetails']> = (props) => {
  const details = useMemo(() => props?.data?.details, [props])

  if (!details || details.length === 0) return null

  return (
    <ul className={classNames(styles.sfProductDetails, contentsStyles.contentsDetailText, CLASS_NAME_FLYOUT_FONTS[400])}>
      {details.map(({ key, value }) => (
        <li className="m-0" key={`${key}_${value}`}>
          {key && <h4 className="m-0" dangerouslySetInnerHTML={{ __html: key }} />}
          {value && <p style={{ marginTop: 0, marginBottom: 8 }} dangerouslySetInnerHTML={{ __html: value }} />}
        </li>
      ))}
    </ul>
  )
}

export const SfProductDetails = memo(SfProductDetailsComponent)
