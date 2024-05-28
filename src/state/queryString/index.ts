"use client";
import { create } from 'zustand';
import { IQueryString } from '~/typings/queryString';

interface IQueryStringStore {
  params: IQueryString,
  init: () => void,
  addParam: (key: keyof IQueryString, value: any) => void
  deleteParam: (key: keyof IQueryString) => void
}


const getQuerystring = (search?: string): IQueryString => {
  search = search || globalThis.location?.search;
  const urlSearchParams = new URLSearchParams(search);
  const entries = urlSearchParams.entries();

  const obj: Record<string, any> = {};
  Array.from(entries).forEach((elem) => obj[elem[0]] = elem[1])

  return obj;
}


const useQueryStringStore = create<IQueryStringStore>()(
  (set, get) => ({

    params: getQuerystring(),

    init: () => {
      set({ params: getQuerystring() })
    },

    addParam: (key: keyof IQueryString, value: any) => {
      set({ params: { ...get().params, [key]: value } })
    },

    deleteParam: (key: keyof IQueryString) => {
      set({ params: { ...get().params, [key]: undefined } })
    }


  })
);


export { useQueryStringStore };
