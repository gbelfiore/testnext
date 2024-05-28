import { getStoresForFlyer } from '~/services/dcDataService'

interface IGetStoresForFlyerId {
  params: {
    flyerId: string
  }
}

export async function GET(req: Request, apiParams: IGetStoresForFlyerId) {
  const stores = await getStoresForFlyer(apiParams.params.flyerId)
  return new Response(JSON.stringify({ status: 'ok', ...stores }), { status: 200 })
}
