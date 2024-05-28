import { InnerType } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/enum'
import { ICollapsibleSectionContentOpt } from '~/typings/schemaopt'

interface InnerTypeComponent<T> extends React.FC<T> {
  InnerType: InnerType
}

interface TypesProps {
  contents: ICollapsibleSectionContentOpt[]
}

export { InnerTypeComponent, TypesProps }
