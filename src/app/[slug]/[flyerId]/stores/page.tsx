import { HeaderStores } from '~/components/flyer/header/header-stores'
import { MainHeader } from '~/components/flyer/header/main-header/main-header-ssr'
import { getSchemaWithStore } from '~/mongo/api/schema-with-store'

const StoresPage = async ({ params, searchParams }: { params: { slug: string; flyerId: string }; searchParams: any }) => {
  const flyer = await getSchemaWithStore(params, searchParams)

  return (
    <MainHeader schema={flyer.value} isFullPage>
      <HeaderStores schema={flyer.value} urlParams={params} />
    </MainHeader>
  )
}

export default StoresPage
