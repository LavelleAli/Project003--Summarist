import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false while server rendering and hydrating, true once running in the browser
export function useHasMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
