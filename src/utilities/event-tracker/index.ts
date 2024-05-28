"use client";

import { TrackerProviders, type EventNames } from '~/utilities/event-tracker/enums';
import { GoogleAnalytics } from '~/utilities/event-tracker/providers/google-analytics';
import { Shopfully } from '~/utilities/event-tracker/providers/shopfully';
import { SVRetailerDataLayer } from '~/utilities/event-tracker/providers/sv-retailer-data-layer';
import { type AllowedMethodsMap, type EventsArgs, type IProviders, type ProviderMethods } from '~/utilities/event-tracker/typings';
import { type ValueOf } from '~/typings/generic';
import { BrowserService } from '~/utilities/browser-service';
import FacebookPixel from './providers/facebook/facebook';

const { GOOGLE_ANALYTICS, SHOPFULLY, FACEBOOK_PIXEL, SV_RETAILER_DATA_LAYER } = TrackerProviders;

class EventTrackerClass {
	/**
	 * Singleton instance
	 *
	 * @private
	 * @static
	 * @type {EventTrackerClass}
	 * @memberof EventTrackerClass
	 */
	private static _instance: EventTrackerClass;

	private providers: IProviders = {
		[GOOGLE_ANALYTICS]: GoogleAnalytics.instance,
		[SHOPFULLY]: Shopfully.instance,
		[FACEBOOK_PIXEL]: FacebookPixel.instance,
		[SV_RETAILER_DATA_LAYER]: SVRetailerDataLayer.instance,
	};

	/**
	 * A map of event allow based on tracker provider
	 *
	 * @private
	 * @memberof EventTrackerClass
	 */
	private allowedMethodsMap: AllowedMethodsMap = {
		[GOOGLE_ANALYTICS]: this.providers[GOOGLE_ANALYTICS].allowedMethods,
		[SHOPFULLY]: this.providers[SHOPFULLY].allowedMethods,
		[FACEBOOK_PIXEL]: this.providers[FACEBOOK_PIXEL].allowedMethods,
		[SV_RETAILER_DATA_LAYER]: this.providers[SV_RETAILER_DATA_LAYER].allowedMethods,
	};

	/**
	 * Getter for EventTrackerClass instance
	 *
	 * @readonly
	 * @static
	 * @type {EventTrackerClass}
	 * @memberof EventTrackerClass
	 */
	public static get instance(): EventTrackerClass {
		if (!this._instance) this._instance = new EventTrackerClass();
		return this._instance;
	}

	/**
	 * Generate an array of promises validating allowed method based on providers map
	 *
	 * @private
	 * @param {EventNames} eventName
	 * @param {unknown} args
	 * @return {*}
	 * @memberof EventTrackerClass
	 */
	private getMethods(eventName: EventNames, args: any): (Promise<void> | null)[] {
		const methods = Object.keys(this.allowedMethodsMap)
			.map((provider: string) => {
				const prvd = provider as TrackerProviders;
				const allowedProviderMethods = this.allowedMethodsMap[prvd];
				const currentProvider: ValueOf<typeof this.providers> = this.providers[prvd];

				let currentMethod = currentProvider[eventName as unknown as ProviderMethods];
				if (allowedProviderMethods.includes(eventName) && typeof currentMethod === 'function') {
					currentMethod = currentMethod.bind(currentProvider);
					return currentMethod(args);
				}
				return null;
			})
			.filter(Boolean);
		return methods;
	}

	/**
	 * Retrieve an array of methods that has to be executed
	 *
	 * @param {EventNames} eventName
	 * @param {unknown} args
	 * @memberof EventTrackerClass
	 */
	public async sendEvent<T extends EventNames>(eventName: EventNames, args: EventsArgs[T]) {
		try {
			if (BrowserService.isServer()) return;
			if (BrowserService.isBackoffice) return;
			const methods = this.getMethods(eventName, args);
			if (methods.length > 0) {
				const results = await Promise.allSettled(methods);
				const rejectedResults = results.filter(({ status }) => status === 'rejected') as PromiseRejectedResult[];
				for (const result of rejectedResults) {
					console.warn(`[${eventName}]: ${result.reason}`);
				}
			}
		} catch {
			//
		}
	}
}

export const EventTracker = EventTrackerClass.instance;
