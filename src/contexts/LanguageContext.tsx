'use client'
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type Language = "English" | "Filipino";

interface Translations {
  [key: string]: {
    English: string;
    Filipino: string;
  };
}

// Translation dictionary - can be expanded as needed
const translations: Translations = {
  // Common UI elements
  Dashboard: { English: "Dashboard", Filipino: "Dashboard" },
  "My ISP Dashboard": {
    English: "My ISP Dashboard",
    Filipino: "Aking ISP Dashboard",
  },
  "New Unassigned Tickets": {
    English: "New Unassigned Tickets",
    Filipino: "Mga Bagong Ticket",
  },
  Customer: { English: "Customer", Filipino: "Kliyente" },
  Customers: { English: "Customers", Filipino: "Mga Kliyente" },
  Category: { English: "Category", Filipino: "Kategorya" },
  Status: { English: "Status", Filipino: "Katayuan" },
  Priority: { English: "Priority", Filipino: "Priyoridad" },
  Actions: { English: "Actions", Filipino: "Mga Aksyon" },
  View: { English: "View", Filipino: "Tingnan" },
  Edit: { English: "Edit", Filipino: "I-edit" },
  Delete: { English: "Delete", Filipino: "Tanggalin" },
  Search: { English: "Search", Filipino: "Maghanap" },
  Filter: { English: "Filter", Filipino: "Salain" },
  Export: { English: "Export", Filipino: "I-export" },
  Save: { English: "Save", Filipino: "I-save" },
  Cancel: { English: "Cancel", Filipino: "Kanselahin" },
  Submit: { English: "Submit", Filipino: "Isumite" },
  Close: { English: "Close", Filipino: "Isara" },
  Back: { English: "Back", Filipino: "Bumalik" },

  // Navigation
  "Ticket Management": {
    English: "Ticket Management",
    Filipino: "Pamamahala ng Ticket",
  },
  "Customer Management": {
    English: "Customer Management",
    Filipino: "Pamamahala ng Kliyente",
  },
  Billing: { English: "Billing", Filipino: "Singil" },
  Reports: { English: "Reports", Filipino: "Mga Ulat" },
  "Tenant Settings": {
    English: "Tenant Settings",
    Filipino: "Mga Setting ng Tenant",
  },
  "Audit Log": { English: "Audit Log", Filipino: "Audit Log" },
  "Technician Ops": {
    English: "Technician Ops",
    Filipino: "Ops ng Technician",
  },
  "Network Devices": {
    English: "Network Devices",
    Filipino: "Mga Network Device",
  },
  "Knowledge Base": { English: "Knowledge Base", Filipino: "Knowledge Base" },
  Tickets: { English: "Tickets", Filipino: "Mga Ticket" },

  // KPI Cards
  "Total Customers": {
    English: "Total Customers",
    Filipino: "Kabuuang Kliyente",
  },
  "Active Tickets": { English: "Active Tickets", Filipino: "Aktibong Ticket" },
  "Monthly Revenue": { English: "Monthly Revenue", Filipino: "Buwanang Kita" },
  "Network Uptime": { English: "Network Uptime", Filipino: "Network Uptime" },
  "Open Tickets": { English: "Open Tickets", Filipino: "Bukas na Ticket" },
  "Pending Installation": {
    English: "Pending Installation",
    Filipino: "Nakabinbin ang Instalasyon",
  },
  "Overdue Payments": {
    English: "Overdue Payments",
    Filipino: "Nakaraang Bayad",
  },
  "Active Services": {
    English: "Active Services",
    Filipino: "Aktibong Serbisyo",
  },

  // User menu
  "Account Settings": {
    English: "Account Settings",
    Filipino: "Mga Setting ng Account",
  },
  "Change Language": {
    English: "Change Language",
    Filipino: "Palitan ang Wika",
  },
  "Dark Mode": { English: "Dark Mode", Filipino: "Dark Mode" },
  "Log Out": { English: "Log Out", Filipino: "Mag-logout" },

  // Roles
  "Super Admin": { English: "Super Admin", Filipino: "Super Admin" },
  "System Admin": { English: "System Admin", Filipino: "System Admin" },
  "Customer Support": {
    English: "Customer Support",
    Filipino: "Customer Support",
  },
  "Field Technician": {
    English: "Field Technician",
    Filipino: "Field Technician",
  },
  IT: { English: "IT", Filipino: "IT" },

  // Tenant Management
  "Tenant Management": {
    English: "Tenant Management",
    Filipino: "Pamamahala ng Tenant",
  },
  "Create New Tenant": {
    English: "Create New Tenant",
    Filipino: "Lumikha ng Bagong Tenant",
  },
  "SaaS Plans": { English: "SaaS Plans", Filipino: "Mga SaaS Plan" },
  "Global Settings": {
    English: "Global Settings",
    Filipino: "Pandaigdigang Setting",
  },
  "Audit Logs": { English: "Audit Logs", Filipino: "Mga Audit Log" },

  // Common words
  Name: { English: "Name", Filipino: "Pangalan" },
  Email: { English: "Email", Filipino: "Email" },
  Phone: { English: "Phone", Filipino: "Telepono" },
  Address: { English: "Address", Filipino: "Address" },
  Plan: { English: "Plan", Filipino: "Plano" },
  Amount: { English: "Amount", Filipino: "Halaga" },
  Date: { English: "Date", Filipino: "Petsa" },
  Time: { English: "Time", Filipino: "Oras" },
  Description: { English: "Description", Filipino: "Paglalarawan" },
  Type: { English: "Type", Filipino: "Uri" },
  Created: { English: "Created", Filipino: "Nilikha" },
  Updated: { English: "Updated", Filipino: "Na-update" },

  // IT Role specific
  "IT Operations Dashboard": {
    English: "IT Operations Dashboard",
    Filipino: "IT Operations Dashboard",
  },

  "Network Device Management": {
    English: "Network Device Management",
    Filipino: "Pamamahala ng Network Device",
  },
  "My Assigned IT Tickets": {
    English: "My Assigned IT Tickets",
    Filipino: "Aking Mga IT Ticket",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("English");

  // 2. Use useEffect to safely access localStorage *only* on the client-side
  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved) {
      setLanguageState(saved as Language);
    }
  }, []); // Empty array means this runs once on mount

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  // Translation function
  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    // If translation not found, return the key itself
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
