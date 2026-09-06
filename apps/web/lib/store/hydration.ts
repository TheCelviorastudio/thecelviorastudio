"use client";

import { useSyncExternalStore } from "react";

interface PersistLike {
  onFinishHydration: (cb: () => void) => () => void;
  hasHydrated: () => boolean;
}

const serverSnapshot = () => false;

/**
 * True once a persisted zustand store (created with `skipHydration: true`)
 * has rehydrated on the client. Server and first client render both return
 * false, so markup matches and there is no hydration warning.
 */
export function useHydrated(persist: PersistLike): boolean {
  return useSyncExternalStore(
    (cb) => persist.onFinishHydration(cb),
    () => persist.hasHydrated(),
    serverSnapshot,
  );
}
