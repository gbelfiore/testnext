import { ObjectId } from 'mongodb'
import { addIncrementalPositionIdOnProducts } from './queries/add-incremental-position-id'
import { getSa } from './queries/get-sa'
import { getSaById } from './queries/get-sa-by-id'
import { cache } from 'react'

const getMongoData = cache(async (idQuery: string): Promise<any> => {
  try {
    // const { searchParams } = new URL(input.url);
    //const idQuery = searchParams.get("id");
    //const idQuery = input.url;
    const withTemplatesQuery = true // You might want to make this configurable

    const isValidObjectId = ObjectId.isValid(String(idQuery))
    let sa = await (isValidObjectId ? getSaById(new ObjectId(String(idQuery)), withTemplatesQuery) : getSa(Number(idQuery), withTemplatesQuery))

    if (sa) {
      sa = addIncrementalPositionIdOnProducts(sa)
      return JSON.parse(JSON.stringify(sa))

      //return Response.json({ value: sa, result: "ok" });
    } else {
      /*  return Response.json(
            { result: "Not found", value: null },
            { status: 404 },
          ); */

      return { result: 'Not found', value: null }
    }
  } catch (error) {
    console.error('Error:', error) // Log the error for internal use

    throw new Error('Failed to fetch data')

    /*  return Response.json(
          {
            result: "Internal Server Error",
            value: null,
          },
          { status: 500 },
        ); */
  }
})

export { getMongoData }
