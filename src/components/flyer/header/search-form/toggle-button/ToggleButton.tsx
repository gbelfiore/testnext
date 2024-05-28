import { MouseEventHandler, ReactNode } from 'react'
import { ColorToSvgFill } from '~/utilities/RgbToHex'
import styles from './ToggleButton.module.css'
import { useSchemaStore } from '~/state/schema'
import { getTemplate } from '~/hooks/use-template'
import classNames from 'classnames'

const ToggleButton = ({
  children,
  onClick,
  hasToggleButtonStores,
}: {
  children?: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
  hasToggleButtonStores?: boolean
}) => {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)
  const colorIcon = ColorToSvgFill(template?.cssVars?.pageSectionBackIconColor) ?? '%23FFF'

  const backgroundImage = `url("data:image/svg+xml,%3Csvg viewBox='0 0 8 12' fill='${colorIcon}' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.71 10.59 3.13 6l4.58-4.59L6.3 0l-6 6 6 6 1.41-1.41Z'/%3E%3C/svg%3E")`

  return (
    <button
      className={classNames(styles.toggleButton, { [styles.toggleButtonStores as string]: hasToggleButtonStores })}
      style={{ backgroundImage }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export { ToggleButton }
