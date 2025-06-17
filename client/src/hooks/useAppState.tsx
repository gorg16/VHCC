import { createContext, useContext, useState, ReactNode } from "react";
import type { Patient } from "@shared/schema";

interface AppState {
  currentUser: Patient | null;
  setCurrentUser: (user: Patient | null) => void;
  currentStep: string;
  setCurrentStep: (step: string) => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

interface AppStateProviderProps {
  children: ReactNode;
}

export function AppStateProvider({ children }: AppStateProviderProps) {
  const [currentUser, setCurrentUser] = useState<Patient | null>(null);
  const [currentStep, setCurrentStep] = useState("otp");

  const value: AppState = {
    currentUser,
    setCurrentUser,
    currentStep,
    setCurrentStep,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}
