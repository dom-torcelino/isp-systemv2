// src/app/layout.tsx
import "./globals.css";
import { Providers } from "./provider"; // Import your new providers

export const metadata = {
  title: "App",
  description: "Converted from Vite to Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}