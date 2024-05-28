import React from 'react'
import IconArrow from './IconArrow'
import { Translator } from '~/localization/translator'
import { TKeys } from '~/localization/languages/enum'

function ProductRoot({ optionsCount }: { optionsCount?: number }) {
  return (
    <div className="flex">
      <div
        style={{
          //fontFamily: 'Nunito bold',
          //fontSize: '14px',
          backgroundColor: '#101E3F',
        }}
        className="flex items-center justify-center rounded-xl px-3 text-center text-[10px] font-bold text-white md:text-[14px]"
      >
        {optionsCount && (
          <div className="flex gap-1">
            <div>{optionsCount + 1}</div>
            <div>
              <Translator tKey={TKeys.OPTIONS_AVAILABLE} />
            </div>
          </div>
        )}
        <IconArrow />
      </div>
    </div>
  )
}

export default ProductRoot
