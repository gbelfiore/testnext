import { CSSProperties, memo, useCallback, useMemo } from 'react'
import { useIsOpenStore } from '~/hooks/use-is-open-store'
import { TKeys } from '~/localization/languages/enum'
import { Translator } from '~/localization/translator'
import DateUtility from '~/utilities/date-utility'
import { type OpeningHoursComponentProps } from '../typings'
import OpeningHoursContent from './OpeningHoursContent'
import styles from './OpeningHours.module.css'
import { getTemplate } from '~/hooks/use-template'
import { useSchemaStore } from '~/state/schema'
import { ColorToSvgFill } from '~/utilities/RgbToHex'

const OpeningHoursComponent: React.FC<OpeningHoursComponentProps> = ({ store, openingHours }) => {
  const schema = useSchemaStore((state) => state.schema)
  const template = getTemplate(schema)
  const isOpen = useIsOpenStore(openingHours ?? [])

  const normalizeOpeningHours = useMemo(() => {
    const normalizeOpeningHours: { open: string; close: string }[][] = []
    openingHours?.forEach((o) => {
      if (!normalizeOpeningHours[o.day]) {
        normalizeOpeningHours[o.day] = []
      }
      normalizeOpeningHours[o.day]?.push({
        open: o.open,
        close: DateUtility.getTimeAddMinute(o.open, o.close),
      })
    })

    return normalizeOpeningHours
  }, [openingHours])

  const classesOpenigHours = useCallback((day: number) => {
    const classes = [styles.tableOpeningHoursItem]
    if (day - 1 === DateUtility.getTodayDay()) {
      classes.push(styles.today)
    }
    return classes.join(' ')
  }, [])

  const styleOpenState: CSSProperties = {
    backgroundColor: isOpen
      ? template?.cssVars?.storeOpenBadgeActiveBackgroundColor ?? 'green'
      : template?.cssVars?.storeOpenBadgeBackgroundColor ?? 'red',
    color: isOpen ? template?.cssVars?.storeOpenBadgeActiveTextColor : template?.cssVars?.storeOpenBadgeTextColor ?? '#FFF',
  }

  const iconColor = ColorToSvgFill(template?.cssVars?.storeDetailTitleTextColor) ?? '%23fff'
  const styleIcon: CSSProperties = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 1024 1024'%3E%3Cpath fill='${iconColor}' d='M464 240c0-26.6 21.4-48 48-48s48 21.4 48 48v246.4l170.6 113.6c22 14.8 28 44.6 11.6 66.6-13 22-42.8 28-64.8 11.6l-192-128c-13.4-7.2-21.4-22.2-21.4-40v-270.2zM512 0c282.8 0 512 229.2 512 512s-229.2 512-512 512c-282.8 0-512-229.2-512-512s229.2-512 512-512zM96 512c0 229.8 186.2 416 416 416s416-186.2 416-416c0-229.8-186.2-416-416-416s-416 186.2-416 416z'%3E%3C/path%3E%3C/svg%3E%0A")`,
  }

  return (
    <OpeningHoursContent>
      <div className={styles.openingHoursContentHeader}>
        <div className={styles.openingHoursContentIcon} style={styleIcon}></div>
        <span className={styles.openState} style={styleOpenState}>
          <Translator capitalizeAll={true} tKey={isOpen ? TKeys.OPEN : TKeys.CLOSE} />
        </span>

        {isOpen && (
          <span className={'closeAt'}>
            <Translator tKey={TKeys.CLOSES_AT} /> {DateUtility.getTimeAddMinute(isOpen.open, isOpen.close)}
          </span>
        )}
      </div>

      <div className={styles.tableOpeningHours}>
        {normalizeOpeningHours?.map((o, idx) => (
          <div key={`day_${idx}`} className={classesOpenigHours(idx)}>
            <div className={styles.tableOpeningHoursItemDay} style={{ color: template?.cssVars?.storeDayColor ?? '#FFF' }}>
              <Translator capitalizeAll={true} tKey={`DAY_${idx - 1}`} />
            </div>
            <div className={styles.tableOpeningHoursItemHours} style={{ color: template?.cssVars?.storeOpeningHoursColor ?? '#FFF' }}>
              {o.map((h, idxOh) => (
                <div key={`oh_${idx}_${idxOh}`} className={styles.tableOpeningHoursItemHoursItem}>{`${DateUtility.getHourMinute(
                  h.open
                )} - ${DateUtility.getHourMinute(h.close)}`}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </OpeningHoursContent>
  )
}

const OpeningHours = memo(OpeningHoursComponent)
export { OpeningHours }
