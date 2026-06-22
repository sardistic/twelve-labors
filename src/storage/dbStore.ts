const dbName = 'twelve-labors'
const dbVersion = 1
const storeName = 'kv'

let dbPromise: Promise<IDBDatabase> | null = null

const openDatabase = () => {
  if (dbPromise) return dbPromise

  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion)

    request.onupgradeneeded = () => {
      request.result.createObjectStore(storeName)
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

  return dbPromise
}

export const readValue = async <Value>(key: string): Promise<Value | null> => {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly')
    const store = transaction.objectStore(storeName)
    const request = store.get(key)

    request.onsuccess = () => resolve((request.result as Value | undefined) ?? null)
    request.onerror = () => reject(request.error)
  })
}

export const writeValue = async <Value>(key: string, value: Value): Promise<Value> => {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.put(value, key)

    request.onsuccess = () => resolve(value)
    request.onerror = () => reject(request.error)
  })
}

export const removeValue = async (key: string): Promise<void> => {
  const db = await openDatabase()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite')
    const store = transaction.objectStore(storeName)
    const request = store.delete(key)

    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}
