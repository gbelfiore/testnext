import React, { CSSProperties, memo } from 'react'
import styles from './Highlights.module.css'
import { List } from '~/components/flyer/flyout/highlights/list'
import { useFlyoutProductWithChildrens } from '~/hooks/use-product'
import useSection from '~/hooks/use-section'
import useTemplate from '~/hooks/use-template'
import { useFlyoutStore } from '~/state/flyout'
import classNames from 'classnames'
import { CLASS_NAME_FLYOUT_FONTS } from '~/utilities/fonts'

const HighlightsComponent: React.FC = () => {
  const { product } = useFlyoutProductWithChildrens()
  //const hightlights = useFlyoutStore((state) => state.activeProduct?.highlights)
  const hightlights = product.highlights
  const activeSectionIndex = useFlyoutStore((state) => state.activeSectionIndex)
  const section = useSection(activeSectionIndex)

  const template = useTemplate(section)

  const liStyle: CSSProperties = {
    backgroundColor: template?.cssVars?.highlightBackgroundColor,
  }

  if (!hightlights || hightlights.length === 0) return null

  return (
    <>
      {hightlights.map((hightlight, i) => (
        <List template={template} key={i}>
          {hightlight.map((item, i) => (
            <li style={liStyle} className={classNames(styles.li, CLASS_NAME_FLYOUT_FONTS[800])} key={JSON.stringify(item) + i}>
              {item.map(({ isLabel, text }) => {
                if (isLabel)
                  return (
                    <small className={classNames(styles.small, CLASS_NAME_FLYOUT_FONTS[800])} key={text}>
                      {text}
                    </small>
                  )
                return <React.Fragment key={text}>{text}</React.Fragment>
              })}
            </li>
          ))}
        </List>
      ))}
    </>
  )
}

export const Highlights = memo(HighlightsComponent)
