import { memo, useMemo } from 'react'
import contentsStyles from '../../Contents.module.css'
import { InnerTypeComponent } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/typings'
import { InnerType } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/enum'
import { ICollapsibleSectionContentDataOpt } from '~/typings/schemaopt'
import classNames from 'classnames'
import { CLASS_NAME_FLYOUT_FONTS } from '~/utilities/fonts'

const HtmlComponent: InnerTypeComponent<ICollapsibleSectionContentDataOpt['html']> = (props) => {
  const __html = useMemo(() => props?.data, [props])

  if (!__html) return null

  return <div className={classNames('p-[12px]', contentsStyles.contentsDetailText, CLASS_NAME_FLYOUT_FONTS[400])} dangerouslySetInnerHTML={{ __html }} />
}

HtmlComponent.InnerType = InnerType.HTML

export const Html = memo(HtmlComponent)
