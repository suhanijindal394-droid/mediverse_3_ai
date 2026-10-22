import { useState, useEffect, useCallback } from "react";

// Custom hook — reads/writes a piece of state to localStorage so demo data
// (auth session, appointments, notifications, profile...) survives a page refresh
// and syncs immediately across all active components in the app.
export default function useLocalStorage(key, initialValue) {
  const readValue = useCallback(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        return JSON.parse(stored);
      }
      return typeof initialValue === "function" ? initialValue() : initialValue;
    } catch (err) {
      console.warn("useLocalStorage: could not read", key, err);
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  }, [key, initialValue]);

  const [value, setStoredValue] = useState(readValue);

  const setValue = useCallback(
    (newValue) => {
      try {
        setStoredValue((prev) => {
          const valueToStore =
            typeof newValue === "function" ? newValue(prev) : newValue;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          window.dispatchEvent(
            new CustomEvent("mv_storage_change", {
              detail: { key, value: valueToStore },
            })
          );
          return valueToStore;
        });
      } catch (err) {
        console.warn("useLocalStorage: could not write", key, err);
      }
    },
    [key]
  );

  useEffect(() => {
    function handleStorageEvent(e) {
      if (e.key === key) {
        try {
          const parsed = e.newValue
            ? JSON.parse(e.newValue)
            : typeof initialValue === "function"
            ? initialValue()
            : initialValue;
          setStoredValue(parsed);
        } catch (err) {
          console.warn("useLocalStorage storage event parse error:", err);
        }
      }
    }

    function handleCustomEvent(e) {
      if (e.detail?.key === key) {
        setStoredValue(e.detail.value);
      }
    }

    window.addEventListener("storage", handleStorageEvent);
    window.addEventListener("mv_storage_change", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageEvent);
      window.removeEventListener("mv_storage_change", handleCustomEvent);
    };
  }, [key, initialValue]);

  return [value, setValue];
}

