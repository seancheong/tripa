import { useEffect, useRef } from 'react';

/**
 * Custom hook that triggers a callback when the watched value changes from null to a non-null value.
 * It provides both the new and previous values to the callback.
 */
export default function useWatch<T>(
  value: T,
  onChange: (newValue: T, oldValue: T | null) => void,
) {
  const prevRef = useRef<T>(null);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;

      if (value !== null) {
        onChange(value, null);
      }
    } else if (prevRef.current === null && value !== null) {
      onChange(value, prevRef.current);
    }

    prevRef.current = value;
  }, [value, onChange]);
}
