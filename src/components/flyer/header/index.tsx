import { ISchemaOpt } from '~/typings/schemaopt'
import { MainHeader } from './main-header/main-header-ssr'

const FlyerHeaderComponent = ({ schema }: { schema: ISchemaOpt }) => {
  return <MainHeader schema={schema} isFullPage={false} />
}

export const FlyerHeader = FlyerHeaderComponent
