"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect } from "react";

import {
  type IAddRef,
  type IUseReferencesManager,
  type Ref,
  type Refs,
} from "~/utilities/refs-manager/typings";

class RefsManagerClass {
  private refs: Refs<any> = {};
  private static _instance: RefsManagerClass;

  public static get instance(): RefsManagerClass {
    if (!this._instance) this._instance = new RefsManagerClass();
    return this._instance;
  }

  /**
   * Get single reference data
   *
   * @param {string} refKey
   * @returns {(Ref | null)}
   * @memberof RefsManager
   */
  getRef<T>(refKey: string): Ref<T> | null {
    if (this.refs[refKey]) return this.refs[refKey] as Ref<T>;
    return null;
  }

  /**
   * Add a ref.
   * refKey has to be unique othewise the item in state will be replaced
   * You can pass also type. It's use to aggregate refs that has the same purpose
   *
   * @param {IAddRef} {
   *         refKey,
   *         type,
   *         refs,
   *     }
   * @returns {HTMLElement}
   * @memberof RefsManager
   */
  addRef<T>({ refKey, type, ref }: IAddRef<T>): Ref<T> {
    if (!this.refs[refKey]) this.refs[refKey] = { refKey, type, ref };
    return this.refs[refKey] as Ref<T>;
  }

  /**
   * Update a ref.
   * refKey has to be already a property of refs class member
   * You can pass also type. It's use to aggregate refs that has the same purpose
   *
   * @param {IAddRef} {
   *         refKey,
   *         type,
   *         refs,
   *     }
   * @returns {HTMLElement}
   * @memberof RefsManager
   */
  upRef<T>({ refKey, type, ref }: IAddRef<T>): Ref<T> {
    if (this.refs[refKey]) this.refs[refKey] = { refKey, type, ref };
    return this.refs[refKey] as Ref<T>;
  }

  /**
   * Add a new reference. If it already exists update it with new values
   * refKey has to be already a property of refs class member
   * You can pass also type. It's use to aggregate refs that has the same purpose
   *
   * @param {IAddRef} {
   *         refKey,
   *         type,
   *         refs,
   *     }
   * @returns {HTMLElement}
   * @memberof RefsManager
   */
  addOrUpRef<T>({ refKey, type, ref }: IAddRef<T>): Ref<T> {
    this.refs[refKey] = { refKey, type, ref };
    return this.refs[refKey] as Ref<T>;
  }

  /**
   * Remove single refs from RefsManager
   * N.B. Removing a refs won't remove html Element from DOM
   *
   * @param {string} refKey
   * @memberof RefsManager
   */
  rmRef(refKey: string): void {
    if (this.refs[refKey]) delete this.refs[refKey];
  }

  /**
   * Return an object with all the stored refs with the same type
   *
   * @param {string} type
   * @returns {Refs}
   * @memberof RefsManager
   */
  getRefsByType(type: string): Refs<any> {
    const refs = Object.keys(this.refs)
      .map((e) => this.refs[e])
      .filter((refs) => refs?.type === type);
    const filteredRefs = refs.reduce((accumulator, currentValue) => {
      if (currentValue) accumulator[currentValue.refKey] = currentValue!;
      return accumulator;
    }, {} as Refs<any>);
    return filteredRefs;
  }

  /**
   * Remove stored referencies. If you pass type just the ones with the same type will be removed
   * N.B. removing referencies from Singleton doens't mean that html elements will be removed from DOM
   *
   * @param {string} [type]
   * @returns
   * @memberof RefsManager
   */
  purge(type?: string) {
    if (!type) {
      this.refs = {};
    } else {
      const types: string[] = Object.keys(this.getRefsByType(type));
      types.forEach((t: string) => this.rmRef(t));
    }
    return this.refs;
  }

  useReferencesManager<T>({
    refKey,
    type,
    removeOnUnmount,
  }: IUseReferencesManager): (ref: T) => Ref<T> {
    const setRef = useCallback(
      (ref: T) => this.addOrUpRef({ refKey, type, ref }),
      [refKey, type],
    );
    useEffect(() => {
      return () => {
        if (removeOnUnmount) this.rmRef(refKey);
      };
    }, [refKey, removeOnUnmount]);
    return setRef;
  }
}

const RefsManager = RefsManagerClass.instance;

export { RefsManager };
