import React, { memo } from 'react'
import useSection from '~/hooks/use-section'
import { getTemplate } from '~/hooks/use-template'
import { useFlyoutStore } from '~/state/flyout'

import { useSchemaStore } from '~/state/schema'
import { ICollapsibleSectionContentDataOpt } from '~/typings/schemaopt'
import { StringManipulator } from '~/utilities/string-manipulator'

const PhoneComponent: React.FC<ICollapsibleSectionContentDataOpt['phone']> = () => {
  const sectionIndex = useFlyoutStore((state) => state.activeSectionIndex)
  const schema = useSchemaStore.getState().schema
  const section = useSection(sectionIndex)

  const template = getTemplate(schema, section)
  const phoneNumber = useSchemaStore((state) => state.schema?.retailer?.phoneNumber)

  const styles = {
    container: {
      margin: '10px 0 15px',
    },
    link: {
      color: template?.cssVars?.phoneTextColor,
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    svg: { fill: template?.cssVars?.phoneTextColor, verticalAlign: 'middle', marginRight: '7px' },
  }

  return (
    <div style={styles.container}>
      <a style={styles.link} href={`tel:${StringManipulator.replaceAll(phoneNumber, ' ', '')}`}>
        <svg style={styles.svg} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.0257 21.9998C17.1541 21.9998 15.9297 21.6846 14.0963 20.6605C11.8668 19.4105 10.1424 18.2565 7.92495 16.0453C5.78702 13.9091 4.74662 12.5261 3.29052 9.87691C1.64554 6.88581 1.92596 5.31793 2.23941 4.64783C2.61271 3.84693 3.16371 3.36791 3.87591 2.89245C4.28043 2.62747 4.70852 2.40031 5.15474 2.21387C5.1994 2.19468 5.24092 2.17637 5.27798 2.15986C5.49901 2.0603 5.8339 1.90985 6.25809 2.07057C6.54119 2.17682 6.79392 2.39423 7.18953 2.78486C8.00086 3.58487 9.10957 5.36659 9.51858 6.2416C9.79319 6.83134 9.97493 7.22063 9.97537 7.65724C9.97537 8.16841 9.71818 8.56261 9.40606 8.98806C9.34756 9.06797 9.28952 9.14431 9.23326 9.21842C8.89345 9.66486 8.81888 9.79388 8.868 10.0242C8.96758 10.4872 9.71014 11.8653 10.9305 13.0828C12.1508 14.3002 13.4895 14.9957 13.9543 15.0948C14.1945 15.1462 14.3263 15.0685 14.7871 14.7167C14.8532 14.6663 14.921 14.614 14.992 14.5618C15.468 14.2078 15.844 13.9573 16.3432 13.9573H16.3459C16.7803 13.9573 17.1523 14.1457 17.7685 14.4564C18.5722 14.8618 20.4079 15.956 21.2129 16.7681C21.6045 17.1627 21.8229 17.4145 21.9296 17.6971C22.0903 18.1225 21.939 18.456 21.8403 18.6793C21.8238 18.7163 21.8055 18.7569 21.7863 18.802C21.5983 19.2474 21.3698 19.6745 21.1035 20.0779C20.6289 20.7878 20.148 21.3373 19.3451 21.711C18.9329 21.9059 18.4817 22.0047 18.0257 21.9998Z"
          />
        </svg>
        {phoneNumber}
      </a>
    </div>
  )
}

export const Phone = memo(PhoneComponent)
