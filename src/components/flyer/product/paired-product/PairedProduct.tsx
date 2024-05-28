import React, { CSSProperties, memo, useMemo } from 'react'
import { getFontInfo } from '~/hooks/use-font-info'
import { IFontData } from '~/hooks/use-font-info/typings'
import { getStaticPath, getStaticPathForWebP } from '~/hooks/use-static-path'
import { IPairedProductOpt } from '~/typings/schemaopt'
import styles from './PairedProduct.module.css'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'
import PictureWebP from '~/components/picture-webp/PictureWebP'

interface IPairedProductProps {
  pairedProduct?: IPairedProductOpt
}

const PairedProductComponent = ({ pairedProduct }: IPairedProductProps) => {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)
  const src = useMemo(() => {
    return typeof pairedProduct?.productImage === 'string' ? pairedProduct.productImage : pairedProduct?.productImage?.[0]
  }, [pairedProduct?.productImage])

  const imageSrc = getStaticPath(src)
  const imageSrcWebp = getStaticPathForWebP(src)

  if (!pairedProduct) return null

  const styleWrapper: CSSProperties = {
    backgroundColor: pairedProduct.backgroundColor ?? template?.cssVars?.pairedProductBackgroundColor,
  }

  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'pairedProductText', {
    fontWeight: 400,
    fontFamily: template?.fonts?.families?.[1]?.name,
  })

  return (
    <div className={styles.wrapper} style={styleWrapper}>
      {imageSrc && (
        <div className={styles.wrapperBgImg}>
          <PictureWebP src={imageSrc} webp={imageSrcWebp} className={styles.bgImg} />
        </div>
      )}

      {pairedProduct.heading && (
        <div className={styles.textWrapper}>
          <div className={styles.text} style={fontInfo} dangerouslySetInnerHTML={{ __html: pairedProduct.heading }}></div>
        </div>
      )}

      {pairedProduct.description && (
        <div className={styles.textWrapper}>
          <div className={styles.text} style={fontInfo} dangerouslySetInnerHTML={{ __html: pairedProduct.description }}></div>
        </div>
      )}
    </div>
  )
}

export const PairedProduct = memo(PairedProductComponent)
