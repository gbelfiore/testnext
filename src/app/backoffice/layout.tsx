import React from 'react'
import { FlyoutFonts } from '~/components/flyout-fonts'

interface IRootLayoutProps {
  children: React.ReactNode
}

const BackofficeLayout: React.FC<IRootLayoutProps> = ({ children }) => {
  return (
    <html lang={'it'}>
      <head>
        <FlyoutFonts />
      </head>
      <body className='isBackoffice'>
        <div id="store-announcement">
          {children}
        </div>
      </body>
    </html>
  )
}

export default BackofficeLayout