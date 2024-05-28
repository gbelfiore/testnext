import { create } from 'zustand';
import StoreServiceClass from '~/utilities/service/StoreServiceClass';
import { type IMKTStoreState } from './typings';

const useMKTStoreStore = create<IMKTStoreState>()(
	(set, get) => ({
		mktStores: null,

		actions: {
			initMKTStores: async (leafetId: number) => {
				if (!get().mktStores) {
					const storeService = new StoreServiceClass();
					const stores = await storeService.getByLeafletId(leafetId);
					return set((state: IMKTStoreState) => ({
						...state,
						mktStores: stores,
					}));
				}
				return set((state: IMKTStoreState) => state);
			},
		},
	})
);

export { useMKTStoreStore };
