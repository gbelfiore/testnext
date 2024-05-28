import { getStaticPathForWebP, getTplStaticPath } from '~/hooks/use-static-path'
import { getTemplate } from '~/hooks/use-template'
import { CategoriesPills } from '../categories-pills'
import { ToggleSearchButton } from '../toggle-search-button/ToggleSearchButton'
import s from './main-header.module.css'
import type { CSSProperties } from 'react'
import { Nav } from '../nav'
import { RefKeys } from '~/utilities/refs-manager/enum'
import { RetailerLocation } from '../retailer-location/RetailerLocation'
import { ISchemaOpt } from '~/typings/schemaopt'
import React from 'react'
import { Logo } from '../logo'
import classNames from 'classnames'

interface Props {
  schema: ISchemaOpt
  children?: React.ReactNode
  isFixed?: boolean
  isFullPage?: boolean
  reveal?: boolean
}

const MainHeaderSSR = ({ schema, isFixed, reveal, isFullPage, children }: Props) => {
  const template = getTemplate(schema)

  const style: CSSProperties = {
    backgroundColor: template?.cssVars?.headerBackgroundColor ?? 'transparent',
    color: template?.cssVars?.headerTextColor ?? 'transparent',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s linear',
  }

  if (isFullPage) style.height = '100vh'

  const logo = template?.retailerInfo?.logo
  const logoSrc = getTplStaticPath(logo, template?.basePath)
  const logoSrcWebP = getStaticPathForWebP(logo, template?.basePath)

  return (
    <div className={classNames(s.wrapper, 'main-header')} style={style}>
      <div className={s.headerTop}>
        <div className={s.logoContainer}>
          <Logo logoSrc={logoSrc} logoSrcWebP={logoSrcWebP} />
          <RetailerLocation className={s.retailerLocationMobile} />
        </div>

        <div
          style={{
            display: 'flex',
            position: 'relative',
            width: !isFullPage ? '100%' : 'auto',
            flexGrow: 1,
            overflowX: 'hidden',
          }}
        >
          {!isFullPage && (
            <>
              <Nav schema={schema} navKey={RefKeys.NAV_1}>
                <CategoriesPills navKey={RefKeys.NAV_1} schema={schema} isFullPage={isFullPage} />
              </Nav>
              <ToggleSearchButton />
            </>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 0,
            justifyContent: 'flex-end',
            flexShrink: 0,
            marginLeft: 'auto',
          }}
        >
          <RetailerLocation className={s.retailerLocation} />
        </div>
      </div>
      {children}
    </div>
  )
}

export { MainHeaderSSR as MainHeader }
