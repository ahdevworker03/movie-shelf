// Wraps localStorage read/write in try/catch so a corrupt
// or missing entry never crashes the app — it just falls back to the default.

export function getFromStorage(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      console.warn(`[storage] Expected array for "${key}", got ${typeof parsed}. Resetting to default.`)
      return fallback
    }
    return parsed
  } catch (err) {
    console.warn(`[storage] Failed to read "${key}":`, err)
    return fallback
  }
}

export function setInStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.warn(`[storage] Failed to write "${key}":`, err)
  }
}
