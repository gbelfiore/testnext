export const dynamic = 'force-dynamic'
import { FormatApp } from '~/components/format-app'
import { getSchemaWithStore } from '~/mongo/api/schema-with-store'

interface IHomeProps {
  params: { slug: string; flyerId: string }
  searchParams: any
}

export default async function Home({ params, searchParams }: IHomeProps) {
  const flyer = await getSchemaWithStore(params, searchParams)
  return <FormatApp schema={flyer.value as any} urlParams={params} />
}
