import { type ReactElement } from 'react'
import { type ISchemaOpt } from '~/typings/schemaopt'

enum ComponentFlyerType {
  COVER = 'cover',
  SECTION = 'section',
  SECTION_NAME = 'section_name',
  BACKCOVER = 'backcover',
  COLOPHON = 'colophon',
}

interface IComponentFlyer {
  type: ComponentFlyerType
  component: ReactElement
  sectionIndex?: number
}

interface IFormatAppProps {
  schema: ISchemaOpt
}

interface IFlyerProps {
  schema: ISchemaOpt
}

interface IFlyerContainerProps {
  schema: ISchemaOpt
  children: ReactElement
  urlParams?: { slug: string; flyerId: string }
  isBackoffice?: boolean
}

export type { IComponentFlyer, IFormatAppProps, IFlyerProps, IFlyerContainerProps }
export { ComponentFlyerType }
