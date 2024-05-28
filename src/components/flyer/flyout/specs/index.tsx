import React, { memo, useMemo } from 'react'
import styles from './Specs.module.css'
import { getStaticPath, getStaticPathForWebP } from '~/hooks/use-static-path'
import PictureWebP from '~/components/picture-webp/PictureWebP'
import { useFlyoutProductWithChildrens } from '~/hooks/use-product'

const SpecsComponent: React.FC = () => {
  const { product } = useFlyoutProductWithChildrens()
  const specs = product.specs

  const imagesSrcs = useMemo(() => {
    if (typeof specs === 'object' && Array.isArray(specs) && specs) return specs.map(spec => spec.src)
    if (typeof specs === 'string' && specs) return [specs]
  }, [specs])

  if (!imagesSrcs) return null

  return (
    <div className={styles.specs}>
      {imagesSrcs.map((imagesSrc, i) => {
        const src = getStaticPath(imagesSrc)
        const webp = getStaticPathForWebP(imagesSrc)
        return <PictureWebP key={`${imagesSrc}_${i}`} src={src} webp={webp} alt={imagesSrc} className={styles.image} />
      })}
    </div>
  )
}

export const Specs = memo(SpecsComponent)
