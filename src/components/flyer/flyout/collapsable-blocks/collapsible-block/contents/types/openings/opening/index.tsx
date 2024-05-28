import React, { memo, useMemo } from 'react'

import { OpeningProps } from '~/components/flyer/flyout/collapsable-blocks/collapsible-block/contents/types/openings/opening/typings'
import { TKeys } from '~/localization/languages/enum'
import { Translator } from '~/localization/translator'

const OpeningComponent: React.FC<OpeningProps> = ({ id, schedules, closed, isLast }) => {
  const today = useMemo<number>(() => new Date().getDay(), [])

  const tKey = useMemo(() => {
    switch (id) {
      case 0:
        return TKeys.WEEK_DAYS_SUNDAY
      case 1:
        return TKeys.WEEK_DAYS_MONDAY
      case 2:
        return TKeys.WEEK_DAYS_TUESDAY
      case 3:
        return TKeys.WEEK_DAYS_WEDNESDAY
      case 4:
        return TKeys.WEEK_DAYS_THURSDAY
      case 5:
        return TKeys.WEEK_DAYS_FRIDAY
      case 6:
        return TKeys.WEEK_DAYS_SATURDAY
    }
  }, [id])

  const isToday = useMemo(() => today === id, [today, id])

  const scheduledHours = useMemo(() => {
    if (closed) return <Translator tKey={TKeys.CLOSED} />
    if (schedules) return `${schedules.opening} - ${schedules.closing}`
    return null
  }, [schedules, closed])

  const weekDay = useMemo(
    () => (
      <>
        <span style={{ width: '90px', display: 'inline-block' }}>
          <Translator tKey={tKey} capitalizeFirst />
        </span>
        {scheduledHours}
      </>
    ),
    [scheduledHours, tKey]
  )

  const content = useMemo(() => {
    if (isToday) return <strong>{weekDay}</strong>
    return weekDay
  }, [isToday, weekDay])

  return (
    <>
      {content}
      {!isLast ? <br /> : null}
    </>
  )
}

export const Opening = memo(OpeningComponent)
