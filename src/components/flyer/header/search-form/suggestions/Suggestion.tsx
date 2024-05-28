import { CSSProperties, useCallback, useRef } from 'react'
import { getFontInfo } from '~/hooks/use-font-info'
import { IFontData } from '~/hooks/use-font-info/typings'
import { getTemplate } from '~/hooks/use-template'
import { IProductOpt, ISchemaOpt } from '~/typings/schemaopt'
import styles from './Suggestions.module.css'
import { getStaticPath, getStaticPathForWebP } from '~/hooks/use-static-path'
import { BrandImage } from './BrandImage'
import PictureWebP from '~/components/picture-webp/PictureWebP'
import { useRouter } from 'next/navigation'
import { useAppStore } from '~/state/app'
import { useQueryStringStore } from '~/state/queryString'
import QueryUrlUtility from '~/utilities/query-url-utility/QueryUrlUtility'
import { TFlatMapProductElement } from '~/typings/flatMapProducts'

interface ISuggestionProps {
  element: TFlatMapProductElement
  schema: ISchemaOpt
}

const Suggestion = ({ element, schema }: ISuggestionProps) => {
  const { product, section } = element
  const itemRef = useRef<HTMLLIElement | null>(null)
  const template = getTemplate(schema)
  const router = useRouter()

  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'suggestionItem', {
    fontFamily: template?.fonts?.families?.[0]?.name,
  })

  const backgroundColorActive = template?.cssVars.activePillBackgroundColor
  const backgroundColor = template?.cssVars.pillBackgroundColor

  const renderImage = useCallback((product: IProductOpt) => {
    const src = typeof product.productImage === 'string' ? getStaticPath(product.productImage) : getStaticPath(product.productImage?.[0])
    const webp =
      typeof product.productImage === 'string' ? getStaticPathForWebP(product.productImage) : getStaticPathForWebP(product.productImage?.[0])
    const style: CSSProperties = {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    }
    return <PictureWebP src={src} webp={webp} alt={product.name} style={style} />
  }, [])

  const onClick = useCallback(() => {
    if (section && product) {
      useQueryStringStore.getState().addParam('sectionId', section.id)
      useQueryStringStore.getState().addParam('productId', product.id)

      const urlParams = useAppStore.getState().urlParams
      const url = `/${urlParams?.slug}/${urlParams?.flyerId}?${QueryUrlUtility.getQueryString()}`
      router.push(url)
    }
  }, [product, router, section])

  return (
    <li
      ref={itemRef}
      className={styles.listItem}
      style={{ backgroundColor, ...fontInfo }}
      onClick={onClick}
      onMouseEnter={() => {
        if (itemRef.current) itemRef.current.style.backgroundColor = backgroundColorActive as string
      }}
      onMouseLeave={() => {
        if (itemRef.current) itemRef.current.style.backgroundColor = backgroundColor as string
      }}
    >
      <div className={styles.listItemSx}>{renderImage(product)}</div>
      <div className={styles.listItemDx} style={{ color: template?.cssVars.pillTextColor }}>
        {product.brandImage && <BrandImage src={getStaticPath(product.brandImage)} alt="" draggable={false} />}
        {product.name}
      </div>
    </li>
  )
}

export default Suggestion
