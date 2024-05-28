import React, { memo, useMemo } from 'react'
import styles from './Contents.module.css'
import { ContentsProps } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/typings'
import { Inner } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/inner'
import { RefsManager } from '~/utilities/refs-manager'

const ContentsComponent: React.FC<ContentsProps> = ({ contents, isOpen, title }) => {
  const outerRef = RefsManager.getRef<HTMLDivElement>(title)

  const styleObject = useMemo(() => {
    let height: string | number = '0'
    // if (isOpen && outerRef?.ref?.scrollHeight) {
    //   height = outerRef?.ref.scrollHeight;
    // }
    if (isOpen) {
      height = outerRef?.ref?.scrollHeight ?? 'auto'
    }
    return {
      height,
    }
  }, [isOpen, outerRef?.ref])

  return (
    <div className={styles.contents} style={styleObject}>
      <Inner title={title} contents={contents} />
    </div>
  )
}

export const Contents = memo(ContentsComponent)
