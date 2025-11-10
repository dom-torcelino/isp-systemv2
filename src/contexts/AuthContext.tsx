// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from "react";

// 1. Define the roles based on your App.tsx
type Role =
  | "Super Admin"
  | "System Admin"
  | "Customer Support"
  | "Field Technician"
  | "Customer"
  | "IT";

// 2. Define the context's value shape
interface AuthContextType {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  userName: string;
  logout: () => void;
  // In a real app, you'd also have:
  // isAuthenticated: boolean;
  // user: User | null;
  // login: (user: string, pass: string) => Promise<void>;
}

// 3. Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Create the provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<Role>("Super Admin");

  // Logic to derive userName from role, based on your App.tsx
  const userName =
    currentRole === "Super Admin"
      ? "Admin User"
      : currentRole === "System Admin"
        ? "ISP Owner"
        : currentRole === "IT"
          ? "IT Admin"
          : currentRole === "Customer"
            ? "John Smith"
            : currentRole === "Field Technician"
              ? "Tech User"
              : "Support Agent";

  const logout = () => {
    // In a real app, this would clear tokens and redirect
    console.log("Logged out!");
    // For this demo, we'll just reset to a default role
    setCurrentRole("System Admin"); 
  };

  const value = {
    currentRole,
    setCurrentRole,
    userName,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 5. Create the custom hook for easy access
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}