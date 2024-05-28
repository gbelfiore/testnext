export const setItemIntoLocalStorage = (key: string, value: string) => {
  try {
    globalThis.localStorage.setItem(key, value)
  } catch (error) {
    console.error(error)
  }
}

export const getItemFromLocalStorage = (key: string) => {
  try {
    return globalThis.localStorage.getItem(key)
  } catch (error) {
    console.error(error)
    return null
  }
}
