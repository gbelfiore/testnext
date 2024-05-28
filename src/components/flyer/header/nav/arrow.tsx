import { ITplSchema } from '~/typings/template'
import s from './nav.module.css'
import { CSSProperties } from 'react'

interface Props {
  disabled: boolean
  towards: 'sx' | 'dx'
  onClick(e: any): void
  template: ITplSchema | null
  style?: CSSProperties
  color?: string
}

const NavArrow = ({ disabled, towards, onClick, template, style, color = '%23fff' }: Props) => {
  const arrowColor = template?.cssVars?.pillBackgroundColor ? encodeURIComponent(template?.cssVars?.pillBackgroundColor) : color

  const arrowOpacity = disabled ? 0.4 : 1
  const arrowCursor = disabled ? 'none' : 'pointer'
  const arrowRotate = `rotate(${towards === 'sx' ? '0deg' : '180deg'})`
  const arrowMargin = `towards === 'sx' ? '0 5px 0 0' : '0 0 0 5px'`

  const componentStyle: CSSProperties = {
    width: 20,
    height: 20,
    margin: arrowMargin,
    backgroundImage: `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 1024'%3E%3Cpath fill='${arrowColor}' d='M448 960c-16.376 0-32.76-6.25-45.24-18.75l-384-384c-25-25-25-65.5 0-90.5l384-384c25-25 65.5-25 90.5 0s25 65.5 0 90.5l-338.76 338.75 338.8 338.8c25 25 25 65.5 0 90.5-12.5 12.5-28.9 18.7-45.3 18.7z'%3E%3C/path%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    transform: arrowRotate,
    cursor: arrowCursor,
    pointerEvents: `${disabled ? 'none' : 'inherit'}`,
    opacity: arrowOpacity,
  }

  return <div className={s.navArrow} onClick={onClick} style={{ ...componentStyle, ...style }}></div>
}

export { NavArrow }
