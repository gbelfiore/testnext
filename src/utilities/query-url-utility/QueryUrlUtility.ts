"use client";
import { useQueryStringStore } from '~/state/queryString';
import { type IQueryString } from '~/typings/queryString';

class QueryUrlUtility {
	static getQuerystring(search?: string): IQueryString {
		search = search || globalThis.location?.search;
		const urlSearchParams = new URLSearchParams(search);
		const params = QueryUrlUtility.getObjectFromEntries(urlSearchParams.entries());
		return params;
	}

	static getRetailerSlug(pathname?: string): string {
		pathname = pathname || globalThis.location.pathname;
		const urlSearchParams = pathname.match(/[^/]+/g);
		return urlSearchParams?.length ? urlSearchParams?.[0] : '';
	}

	static getObjectFromEntries(entries: IterableIterator<[string, string]>): Record<string, string> {
		const obj: Record<string, string> = {};
		for (const [key, value] of Array.from(entries)) {
			obj[key] = value;
		}
		return obj;
	}

	static getQueryString = () => {
		const params = useQueryStringStore.getState().params;
		const newSearchParams = Object.keys(params).map((k) => {
			return params[k as keyof IQueryString] ? `${k}=${params[k as keyof IQueryString]}` : ""
		}).filter(k => k !== "").join("&")
		return newSearchParams
	}

	static addParamsInQueryString = (key: keyof IQueryString, value: any): string => {
		useQueryStringStore.getState().addParam(key, value);
		const params = useQueryStringStore.getState().params;
		const newSearchParams = Object.keys(params).map((k) => `${k}=${params[k as keyof IQueryString]}`).join("&")
		return newSearchParams
	}

	static removeParamsInQueryString = (key: keyof IQueryString,): string => {
		useQueryStringStore.getState().deleteParam(key);
		const params = useQueryStringStore.getState().params;
		const newSearchParams = Object.keys(params).map((k) => `${k}=${params[k as keyof IQueryString]}`).join("&")
		return newSearchParams
	}
}

export default QueryUrlUtility;
