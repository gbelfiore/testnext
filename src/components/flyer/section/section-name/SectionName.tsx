import React, { memo } from 'react'
import { Heading } from '~/components/flyer/section/section-name/heading/Heading'
import useSection from '~/hooks/use-section'

interface ISectionNameProps {
  sectionIndex: number
  zIndex?: number
  isSticky?: boolean
}

const SectionNameComponent = ({ sectionIndex, zIndex, isSticky }: ISectionNameProps) => {
  const section = useSection(sectionIndex)
  const name = section?.name

  if (!name) return null

  return (
    <Heading sectionIndex={sectionIndex} isSticky={isSticky} zIndex={zIndex}>
      {name}
    </Heading>
  )
}

export const SectionName = memo(SectionNameComponent)
