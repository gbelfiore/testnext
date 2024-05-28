'use client'

import { Pill } from '~/components/flyer/header/pill'
import { useOptionsStore } from '~/state/options';
import { ISchemaOpt } from '~/typings/schemaopt'

const CategoryPillComponent = ({ name, id, ...props }: { id?: string; name?: string; schema: ISchemaOpt; navKey?: string; isFullPage?: boolean; onClick?: (evt: any) => void }) => {
  const selected = useOptionsStore((state) => state.sectionStickyHeading?.id === id)

  if (!name) return null

  return <Pill selected={selected} id={id} {...props}>{name}</Pill>
}

export const CategoryPill = CategoryPillComponent
