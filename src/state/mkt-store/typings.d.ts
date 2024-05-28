import { IStoreOpt } from '~/typings/schemaopt';

interface IMKTStoreState {
	mktStores: IStoreOpt[] | null;
	actions: IMKTStoreActions;
}

interface IMKTStoreActions {
	initMKTStores: (leafetId: number) => Promise<void>;
}

export { IMKTStoreState, IMKTStoreActions };
