import React, { memo } from 'react'
import { Container } from '~/components/flyer/section/section-name/heading/container/Container'
import { Text } from '~/components/flyer/section/section-name/heading/text/Text'

interface IHeadingProps {
  sectionIndex: number
  isSticky?: boolean
  children: React.ReactNode
  zIndex?: number
}

const HeadingComponent = ({ sectionIndex, children, isSticky, zIndex }: IHeadingProps) => {
  return (
    <Container sectionIndex={sectionIndex} zIndex={zIndex} isSticky={isSticky}>
      <Text sectionIndex={sectionIndex} isSticky={isSticky}>
        {children}
      </Text>
    </Container>
  )
}

export const Heading = memo(HeadingComponent)
