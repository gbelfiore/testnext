import type { IOpeningHourOpt, IStoreOpt } from "~/typings/schemaopt";
import ServiceClass from "./ServiceClass";

class StoreServiceClass extends ServiceClass {
  parseResult<TReturn>(result: any, requestName?: string): TReturn;
  parseResult(result: any, requestName?: string): IStoreOpt[] | null {
    if (requestName === "getByLeafletId") {
      return result?.data?.value;
    } else if (requestName === "getOpeningHoursByStoreId") {
      return result?.data?.value;
    }

    return null;
  }

  getByLeafletId(leafletId: number): Promise<IStoreOpt[] | null> {
    const url = `/leaflets/${leafletId}/stores`;
    return this.exec(url, "get", null, "getByLeafletId");
  }

  getOpeningHoursByStoreId(storeId: number): Promise<IOpeningHourOpt[] | null> {
    const url = `/stores/${storeId}/openinghours`;
    return this.exec(url, "get", null, "getOpeningHoursByStoreId");
  }
}

export default StoreServiceClass;
