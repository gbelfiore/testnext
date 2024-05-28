import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { type IProductOpt } from '~/typings/schemaopt';
import { type IFlyoutState } from '~/state/flyout/typings';

const useFlyoutStore = create<IFlyoutState>()(

	subscribeWithSelector((set, get) => ({
		activeProduct: null,
		activeSectionIndex: null,
		activeProductIndex: null,
		activeProductBundleIndex: null,
		isFlyoutOpen: false,
		isFlyoutFullyOpen: false,
		lastScrollY: 0,
		openAnimationHasFinished: false,
		getActiveProduct: () => {
			const bundleIndexProduct = get().activeProductBundleIndex
			if (bundleIndexProduct !== null) {
				return get().activeProduct?.bundleProducts?.[bundleIndexProduct] as IProductOpt;
			}
			return get().activeProduct;
		},
		setActiveProduct: (product: IProductOpt | null, sectionIndex: number | null, productIndex: number | null, isDesktop?: boolean) => {
			let timeout: ReturnType<typeof setTimeout> | null = null;
			set(() => ({ activeProduct: product, activeSectionIndex: sectionIndex, activeProductIndex: productIndex }));
			console.log('flyout ready')


			const isFlyoutOpen = get().isFlyoutOpen;
			if (!isFlyoutOpen) {
				timeout = setTimeout(() => {
					set(() => ({ isFlyoutOpen: true, isFlyoutFullyOpen: isDesktop }));
					if (timeout) clearTimeout(timeout);
				}, 100);
			}
		},

		closeFlyout: () => {
			const isFlyoutOpen = get().isFlyoutOpen;
			if (!isFlyoutOpen) return;

			let timeout: ReturnType<typeof setTimeout> | null = null;
			set(() => ({ isFlyoutOpen: false, isFlyoutFullyOpen: false }));

			timeout = setTimeout(() => {
				set(() => ({ activeProduct: null, activeSectionIndex: null, activeProductIndex: null, activeProductBundleIndex: null }));
				if (timeout) clearTimeout(timeout);
			}, 300);
		},

		toggleFlyoutFullyOpen: () => {
			const isFlyoutFullyOpen = !get().isFlyoutFullyOpen;
			set(() => ({ isFlyoutFullyOpen }));
		},
		setActiveProductBundleIndex: (index: number | null) => {
			set(() => ({ activeProductBundleIndex: index }));
		},
		setFlyoutFullyOpen: () => {
			set(() => ({ isFlyoutFullyOpen: true }));
		},

		unsetFlyoutFullyOpen: () => {
			set(() => ({ isFlyoutFullyOpen: false }));
		},

		toggleOpenAnimationHasFinished: () => {
			const newValue = !get().openAnimationHasFinished
			console.log('flyout toggleOpenAnimationHasFinished', newValue)
			set(() => ({ openAnimationHasFinished: newValue }))
		},

	}))
);

export { useFlyoutStore };
