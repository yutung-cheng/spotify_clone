import { useEffect, useState } from "react";

/// Debounce our value. When we stop typing, we're going to use this Debounce to only get
/// result after 500 millisecond.
export default function useDebounce<T>(value: T, delay?: number): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay || 500);

    return () => {
      clearTimeout(timer); //no overflow.
    };
  }, [value, delay]);

  return debounceValue;
}
