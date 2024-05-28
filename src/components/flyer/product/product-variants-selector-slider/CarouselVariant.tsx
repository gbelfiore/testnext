import { MouseEventHandler } from 'react'
import styles from './CarouselVariant.module.css'
import { getStaticPath, getStaticPathForWebP } from '~/hooks/use-static-path'
import { IProductOpt } from '~/typings/schemaopt'
import PictureWebP from '~/components/picture-webp/PictureWebP'
import { usePrice } from '~/hooks/use-price'
import classNames from 'classnames'
import { CLASS_NAME_FLYOUT_FONTS } from '~/utilities/fonts'
interface Props {
  product: IProductOpt
  onClick?: MouseEventHandler<HTMLDivElement>
  isSelected?: boolean
  parent: IProductOpt | undefined
}

const CarouselVariant = ({ product, onClick, isSelected, parent }: Props) => {
  const productImage = getStaticPath(product.productImage ?? parent?.productImage)
  const productImageWebp = getStaticPathForWebP(productImage ?? parent?.productImage)

  const { composer } = usePrice(product?.price)

  return (
    <div
      onClick={onClick}
      className="flex h-[80px] w-[176px] items-center rounded-md px-[8px] py-[6px]"
      style={{ border: isSelected ? '1px solid #ffd100' : '1px solid #999' }}
    >
      <div className="flex h-full items-center justify-center gap-[6px]">
        <div className="h-full w-[60px]">
          <PictureWebP src={productImage} webp={productImageWebp} alt={product.name} className={'h-full w-full object-contain'} />
        </div>
        <div className={styles.textBox}>
          <div className={styles.productSubNameWrap}>
            <div
              className={classNames(styles.productSubName, CLASS_NAME_FLYOUT_FONTS[700])}
              dangerouslySetInnerHTML={{
                __html: product?.variantPreviewTitle
                  ? product?.variantPreviewTitle
                  : product?.subName
                    ? product?.subName
                    : product?.name ?? '',
              }}></div>
          </div>
          <div className={classNames(styles.discounted, CLASS_NAME_FLYOUT_FONTS[400])}>{composer.discounted}</div>
        </div>
      </div>
    </div>
  )
}

export { CarouselVariant }
