import { create } from "zustand";

/** Replaces the get_quote page's custom states with a typed client store. */
interface QuoteWizardState {
  step: number;
  setStep: (step: number) => void;
  reset: () => void;
}

export const useQuoteWizard = create<QuoteWizardState>((set) => ({
  step: 0,
  setStep: (step) => set({ step }),
  reset: () => set({ step: 0 }),
}));
