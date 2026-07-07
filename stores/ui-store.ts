import { create } from "zustand";

/**
 * Shared UI state for the app shell. Currently drives the mobile navigation
 * drawer so the Topbar hamburger and the Sidebar drawer (separate components
 * rendered by the server layout) can coordinate without prop drilling.
 */
interface UIState {
  mobileNavOpen: boolean;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileNavOpen: false,
  openMobileNav: () => set({ mobileNavOpen: true }),
  closeMobileNav: () => set({ mobileNavOpen: false }),
  toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),
}));
