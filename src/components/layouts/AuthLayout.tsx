import { ReactNode } from "react";
import { Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  showLogo?: boolean;
  footer?: ReactNode;
}

export function AuthLayout({
  children,
  title,
  description,
  showLogo = true,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        {showLogo && (
          <div className="flex flex-col items-center mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4">
              <Building2 className="h-8 w-8" aria-hidden="true" />
            </div>
            <h1 className="text-2xl">ISP Manager</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Professional ISP Management Platform
            </p>
          </div>
        )}

        {/* Auth Card */}
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
          <CardContent>
            <main role="main">{children}</main>
          </CardContent>
        </Card>

        {/* Footer */}
        {footer && (
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
