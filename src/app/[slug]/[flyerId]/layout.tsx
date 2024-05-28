export const dynamic = 'force-dynamic'
import { Seo } from '~/components/seo'
import { type Metadata } from 'next'
import { getTemplate } from '~/hooks/use-template'
import { getStaticPath } from '~/hooks/use-static-path'
import { getTemplateSections } from '~/hooks/use-template-sections'
import { getData } from '~/mongo/api/schema'
import { Stylesheets } from '~/components/seo/stylesheets'
import ConfigSSRSingleton from '~/config/configSSRSingleton'
import { FlyoutFonts } from '~/components/flyout-fonts'

interface IRootLayoutProps {
  children: React.ReactNode
  params: { slug: string; flyerId: string }
}

export async function generateMetadata({ params }: IRootLayoutProps): Promise<Metadata> {
  const { value } = await getData(params)
  const flyerData: any = value

  const title = flyerData.retailer?.name

  const description = flyerData.name

  const template = getTemplate(flyerData)
  const favicon = template?.retailerInfo?.favicon
  const faviconPath = getStaticPath(favicon, flyerData.basePath)

  return {
    title: title,
    description: description,
    icons: faviconPath,
  }
}

export async function generateViewport({ params }: IRootLayoutProps) {
  const { value } = await getData(params)
  const flyerData: any = value
  const template = getTemplate(flyerData)
  const bodyBackgroundColor = template?.cssVars?.bodyBackgroundColor

  return {
    themeColor: bodyBackgroundColor,
  }
}

export default async function RootLayout({ children, params }: IRootLayoutProps) {
  const { value } = await getData(params)
  const flyerData: any = value

  const template = getTemplate(flyerData)
  const templateSections = getTemplateSections(flyerData)

  const config = ConfigSSRSingleton.getConfig()

  return (
    <html lang={config.LANG}>
      <head>
        <FlyoutFonts />
        <Seo template={template} templateSections={templateSections} schema={value as any} />
      </head>
      <body>
        <div id="store-announcement">
          {children}
        </div>

        <Stylesheets template={template} templateSections={templateSections} onlyPrelod={false} />
      </body>
    </html>
  )
}
