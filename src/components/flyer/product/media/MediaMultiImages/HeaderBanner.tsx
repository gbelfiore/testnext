import React, { CSSProperties } from 'react'
import PictureWebP from '~/components/picture-webp/PictureWebP'
import { getStaticPath } from '~/hooks/use-static-path'

type Props = {
  className?: string
  children?: React.ReactNode
  style?: CSSProperties
  icon?: string
}

function HeaderBanner({ children, style, className, icon }: Props) {
  return (
    <div style={style} className={`${className} w-full`}>
      {icon && (
        <div className="mr-4 flex h-[46px] w-[46px] items-center rounded-[46px] bg-white">
          <PictureWebP src={getStaticPath(icon)} webp={''} />
        </div>
      )}
      {children}
    </div>
  )
}

export default HeaderBanner
