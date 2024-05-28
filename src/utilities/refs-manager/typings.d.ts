interface Ref<T> {
	refKey: string
	type: string
	ref: T
}

interface Refs<T> {
	[refKey: string]: Ref<T>
}

interface IAddRef<T> {
	refKey: string
	type: string
	ref: T
}

interface IUseReferencesManager {
	refKey: string
	type: string
	removeOnUnmount?: boolean
}

export { Ref, Refs, IAddRef, IUseReferencesManager }
