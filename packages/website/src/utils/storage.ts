/*
 * @Author: Lvhz
 * @Date: 2021-12-03 09:47:52
 * @Description: Description
 */
export enum StorageKey {
  AsyncRoutes = "AsyncRoutes"
}


export const setStorage = (key : string, value : string | object) => {
  if(typeof value === "object") {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  } else {
    window.sessionStorage.setItem(key, value)
  }
}
export const getStorage = (key : string) => {
  const value = window.sessionStorage.getItem(key)
  if(value === null) return value;
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}