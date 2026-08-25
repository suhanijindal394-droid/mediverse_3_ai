import { useState, useEffect } from "react";

// Custom hook — reads/writes a piece of state to localStorage so demo data
// (auth session, appointments, notifications...) survives a page refresh.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (err) {
      console.warn("useLocalStorage: could not read", key, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn("useLocalStorage: could not write", key, err);
    }
  }, [key, value]);

  return [value, setValue];
}
