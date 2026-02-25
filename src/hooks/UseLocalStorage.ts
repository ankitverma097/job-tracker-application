"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const item = window.localStorage.getItem(key);
      if (!item) return;
      // We deliberately hydrate from localStorage after mount
      // to keep server and initial client render in sync.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStoredValue(JSON.parse(item) as T);
    } catch {
      // Ignore JSON/permission errors
    }
  }, [key]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore write errors (quota/private mode)
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}