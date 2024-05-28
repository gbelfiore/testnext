import { memo, useCallback } from 'react'
import { type DetailsComponentProps } from './typings'

import { Chip } from './Chip'
import { Console } from './Console'
import { Contain } from './Contain'
import { Translator } from '~/localization/translator'
import { TKeys } from '~/localization/languages/enum'
import { Address } from './Address'
import { OpeningHours } from './opening-hours/OpeningHours'

const DetailsComponent = ({ store, openingHours }: DetailsComponentProps) => {
  const { address, city, phone } = store

  const renderConsole = useCallback(() => {
    return (
      <Console>
        <a
          className={'no-underline visited:no-underline hover:no-underline active:no-underline '}
          href={`https://www.google.com/maps/place/${encodeURIComponent(`${address} ${city}`)}`}
          target={'_blank'}
          rel="noreferrer"
        >
          <Chip icon={'route'}>
            <Translator tKey={TKeys.INDICATIONS} />
          </Chip>
        </a>
        {phone && phone !== '' && (
          <a className={'no-underline visited:no-underline hover:no-underline active:no-underline '} href={`tel:${phone}`} target={'_self'}>
            <Chip icon={'callMe'}>
              <Translator tKey={TKeys.CALL_ME} />
            </Chip>
          </a>
        )}
        {/* <Chip icon={'saved'}>
					<Translator tKey={TKeys.SAVED} />
				</Chip> */}
      </Console>
    )
  }, [address, city, phone])

  const renderAddress = useCallback(() => {
    return <Address>{`${address} - ${city}`}</Address>
  }, [address, city])

  const renderOpeningHours = useCallback(() => {
    return <OpeningHours store={store} openingHours={openingHours} />
  }, [openingHours, store])

  return (
    <Contain>
      {renderConsole()}
      {renderAddress()}
      {renderOpeningHours()}
    </Contain>
  )
}

export const Details = memo(DetailsComponent)
