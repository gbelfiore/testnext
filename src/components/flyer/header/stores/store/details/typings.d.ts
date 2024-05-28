import { IOpeningHourOpt, IStoreOpt } from '~/typings/schemaopt'

interface DetailsComponentProps {
  store: IStoreOpt
  openingHours: IOpeningHourOpt[] | null
}

interface OpeningHoursComponentProps {
  store: IStoreOpt
  openingHours: IOpeningHourOpt[] | null
}

export { DetailsComponentProps, OpeningHoursComponentProps }
