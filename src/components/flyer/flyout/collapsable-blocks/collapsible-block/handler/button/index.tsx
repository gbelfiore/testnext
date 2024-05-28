import { ButtonProps } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/handler/button/typings'
import { IFontData } from '~/hooks/use-font-info/typings'
import { getFontInfo } from '~/hooks/use-font-info'
import { CSSProperties } from 'react'

const Button = ({ template, children, onClick }: ButtonProps) => {
  const fontInfo: IFontData = getFontInfo(template?.fontInfoCssVars, 'collapsibleBlockHandler', {
    fontWeight: 700,
    fontSize: 17,
    fontFamily: template?.fonts?.families?.[0]?.name,
  })

  const style: CSSProperties = {
    backgroundColor: template?.cssVars?.collapsibleBlockBackgroundColor,
    padding: '12px 16px',
    color: template?.cssVars?.collapsibleBlockTextColor,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    border: 'none',
    width: '100%',
    cursor: 'pointer',
    ...fontInfo,
  }

  return (
    <button onClick={onClick} style={style}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  type: 'button',
}

export { Button }
