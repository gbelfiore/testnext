import { type IProductOpt } from '~/typings/schemaopt';

interface IFlyoutState {
	activeProduct: IProductOpt | null;
	activeSectionIndex: number | null;
	activeProductIndex: number | null;
	activeProductBundleIndex: number | null;
	isFlyoutOpen: boolean;
	isFlyoutFullyOpen: boolean;
	lastScrollY: number;
	openAnimationHasFinished: boolean;
	getActiveProduct: () => IProductOpt | null;
	setActiveProduct: (product: IProductOpt | null, sectionIndex: number | null, productIndex: number | null, isDesktop?: boolean) => void;
	closeFlyout: () => void;
	toggleFlyoutFullyOpen: () => void;
	setFlyoutFullyOpen: () => void;
	setActiveProductBundleIndex: (index: number | null) => void;
	unsetFlyoutFullyOpen: () => void;
	toggleOpenAnimationHasFinished: () => void;
}

export { IFlyoutState };
