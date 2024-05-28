import React from 'react'
import styles from './FormatApp.module.css'
import { Flyer } from '~/components/flyer/Flyer'
import { type ISchemaOpt } from '~/typings/schemaopt'
import { FlyerHeader } from '../flyer/header'
import FlyerContainer from '../flyer/FlyerContainer'
import { getTemplate } from '~/hooks/use-template'
import { useFormState } from 'react-dom'

interface IFormatAppProps {
  schema: ISchemaOpt
  urlParams?: { slug: string; flyerId: string }
  isBackoffice?: boolean
}

const FormatApp = ({ schema, urlParams, isBackoffice }: IFormatAppProps) => {
  const template = getTemplate(schema)
  

  return (
    <div className={styles.formartApp} style={{ backgroundColor: template?.cssVars.bodyBackgroundColor }}>
      <FlyerHeader schema={schema} />
      <FlyerContainer schema={schema} urlParams={urlParams} isBackoffice={isBackoffice}>
        <Flyer schema={schema} />
      </FlyerContainer>
    </div>
  )
}

export { FormatApp }
