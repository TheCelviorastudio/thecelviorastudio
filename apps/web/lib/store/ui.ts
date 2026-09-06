"use client";

import { create } from "zustand";

export type ToastTone = "butter" | "pink" | "lavender" | "mint";

export interface Toast {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface UiState {
  cartOpen: boolean;
  menuOpen: boolean;
  toasts: Toast[];
  openCart: () => void;
  closeCart: () => void;
  toggleMenu: (open?: boolean) => void;
  pushToast: (t: Omit<Toast, "id" | "tone"> & { tone?: ToastTone }) => void;
  dismissToast: (id: number) => void;
}

let toastSeq = 0;

export const useUiStore = create<UiState>()((set) => ({
  cartOpen: false,
  menuOpen: false,
  toasts: [],
  openCart: () => set({ cartOpen: true, menuOpen: false }),
  closeCart: () => set({ cartOpen: false }),
  toggleMenu: (open) => set((s) => ({ menuOpen: open ?? !s.menuOpen })),
  pushToast: ({ title, description, tone = "butter" }) =>
    set((s) => ({
      toasts: [...s.toasts.slice(-2), { id: ++toastSeq, title, description, tone }],
    })),
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
