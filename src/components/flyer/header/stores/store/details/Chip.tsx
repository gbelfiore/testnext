import { ColorToSvgFill } from '~/utilities/RgbToHex'
import styles from './Details.module.css'
import { CSSProperties, ReactNode, useCallback, useRef } from 'react'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'

interface IChipProps {
  children: ReactNode
  icon?: 'route' | 'callMe' | 'saved'
}

const Chip = ({ children, icon }: IChipProps) => {
  const chipRef = useRef<HTMLDivElement | null>(null)
  const chipIconRef = useRef<HTMLDivElement | null>(null)
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)
  const colorIcon = ColorToSvgFill(template?.cssVars?.pillTextColor) ?? '%23fff'
  const colorIconHover = ColorToSvgFill(template?.cssVars?.activePillTextColor) ?? '%23fff'
  const svgRoute = useCallback(
    (hover: boolean) =>
      `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath fill='${
        hover ? colorIconHover : colorIcon
      }' d='M640 512c-35.4 0-64 28.6-64 64s28.6 64 64 64h192c106 0 192 84.2 192 192 0 106-86 192-192 192h-552.8c17.4-19.8 38.6-45.2 60-73.6 12.6-16.8 25.6-35.2 38-54.4h454.8c35.4 0 64-28.6 64-64s-28.6-64-64-64h-192c-107.8 0-193.8-86-193.8-192 0-107.8 86-192 193.8-192h84.2c-43.8-61-84.2-133.2-84.2-192 0-106.040 84.2-192 192-192 106 0 192 85.96 192 192 0 128-192 320-192 320h-192zM832 256c35.4 0 64-28.6 64-64 0-35.34-28.6-64-64-64s-64 28.66-64 64c0 35.4 28.6 64 64 64zM236.6 975.6c-0.4 0.4-0.8 0.8-1.2 1.2-8.6 10-16.4 18.6-22.8 25.6-0.8 0.8-1.6 1.6-2.2 2.4-11.4 12.2-18.4 19.2-18.4 19.2s-192-192-192-320c0-107.8 85.96-193.8 192-193.8 106 0 192 86 192 193.8 0 58.8-40.4 131-84.2 192-23.6 30.4-44.4 57.8-63.2 79.6v0zM190.2 768c37.2 0 64-28.6 64-64s-26.8-64-64-64c-33.54 0-64 28.6-64 64s30.46 64 64 64z'%3E%3C/path%3E%3C/svg%3E")`,
    [colorIcon, colorIconHover]
  )

  const svgCallMe = useCallback(
    (hover: boolean) =>
      `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'%3E%3Cpath fill='${
        hover ? colorIconHover : colorIcon
      }' d='M1022.4 774l-46.5 201.6c-6.532 28.5-31.58 48.44-60.92 48.44-504.58-0.040-914.98-410.44-914.98-915.040 0-29.32 19.938-54.4 48.44-60.9l201.6-46.5c29.36-6.804 59.36 8.436 71.56 36.24l93.040 217c10.876 25.56 3.54 55.34-17.96 72.9l-107.68 86.46c67.96 138.44 180.52 251 319 319l88.16-107.6c17.376-21.56 47.38-29.020 72.94-17.95l217 93.020c26.1 13.73 43.1 44.13 36.3 73.33z'%3E%3C/path%3E%3C/svg%3E%3C/svg%3E")`,
    [colorIcon, colorIconHover]
  )

  const svgSaved = useCallback(
    (hover: boolean) =>
      `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 768 1024'%3E%3Cpath fill='${
        hover ? colorIconHover : colorIcon
      }' d='M768 96v928l-384-224-384 224v-928c0-53 43-96 96-96h576c53 0 96 43 96 96z'%3E%3C/path%3E%3C/svg%3E%0A")`,
    [colorIcon, colorIconHover]
  )

  const style: CSSProperties = {
    backgroundColor: template?.cssVars?.pillBackgroundColor ?? 'transparent',
    borderColor: template?.cssVars?.pillTextColor ?? '#FFF',
    color: template?.cssVars?.pillTextColor ?? '#fff',
  }

  const styleIcon: CSSProperties = {
    backgroundImage: icon === 'route' ? svgRoute(false) : icon === 'callMe' ? svgCallMe(false) : icon === 'saved' ? svgSaved(false) : '',
  }

  const onMouseLeave = useCallback(() => {
    if (!chipRef.current) return null
    chipRef.current.style.backgroundColor = template?.cssVars?.pillBackgroundColor ?? 'transparent'
    chipRef.current.style.color = template?.cssVars?.pillTextColor ?? '#fff'

    if (!chipIconRef.current) return null
    chipIconRef.current.style.backgroundImage =
      icon === 'route' ? svgRoute(false) : icon === 'callMe' ? svgCallMe(false) : icon === 'saved' ? svgSaved(false) : ''
  }, [icon, svgCallMe, svgRoute, svgSaved, template])

  const onMouseEnter = useCallback(() => {
    if (!chipRef.current) return null
    chipRef.current.style.backgroundColor = template?.cssVars?.activePillBackgroundColor ?? 'transparent'
    chipRef.current.style.color = template?.cssVars?.activePillTextColor ?? '#FFF'

    if (!chipIconRef.current) return null
    chipIconRef.current.style.backgroundImage =
      icon === 'route' ? svgRoute(true) : icon === 'callMe' ? svgCallMe(true) : icon === 'saved' ? svgSaved(true) : ''
  }, [icon, svgCallMe, svgRoute, svgSaved, template])

  return (
    <div ref={chipRef} className={styles.chip} style={style} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
      <div ref={chipIconRef} className={styles.chipIcon} style={styleIcon}></div>
      {children}
    </div>
  )
}

export { Chip }
