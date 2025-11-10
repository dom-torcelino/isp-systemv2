import { useState } from "react";
import { DesignSystemShowcase } from "./DesignSystemShowcase";
import { NotFoundPage } from "./NotFoundPage";
import { ServerErrorPage } from "./ServerErrorPage";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Building2 } from "lucide-react";

type DemoView = "home" | "showcase" | "404" | "500";

export function FoundationDemo() {
  const [currentView, setCurrentView] = useState<DemoView>("home");

  if (currentView === "showcase") {
    return <DesignSystemShowcase />;
  }

  if (currentView === "404") {
    return (
      <NotFoundPage
        onNavigateHome={() => setCurrentView("home")}
        onGoBack={() => setCurrentView("home")}
      />
    );
  }

  if (currentView === "500") {
    return (
      <ServerErrorPage
        onRetry={() => setCurrentView("home")}
        onNavigateHome={() => setCurrentView("home")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-6">
            <Building2 className="h-10 w-10" aria-hidden="true" />
          </div>
          <h1 className="text-4xl mb-3 text-center">ISP Manager</h1>
          <h2 className="text-2xl text-muted-foreground mb-2">
            Frontend Architecture & UI Foundation
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl">
            A comprehensive, accessible, and reusable design system built with React,
            TypeScript, Tailwind CSS, and following WCAG AA standards.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Design System Showcase</CardTitle>
              <CardDescription>
                Interactive demo of all foundational components, layouts, and patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setCurrentView("showcase")} className="w-full">
                View Component Library
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Error Pages</CardTitle>
              <CardDescription>
                Pre-built error pages with consistent styling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                onClick={() => setCurrentView("404")}
                className="w-full"
              >
                404 Not Found
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentView("500")}
                className="w-full"
              >
                500 Server Error
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Foundation Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="mb-3">Design System</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Complete color palette with Light/Dark modes</li>
                  <li>✓ Typography scale (Display to Caption)</li>
                  <li>✓ Spacing system (4px base)</li>
                  <li>✓ Border radius and elevation tokens</li>
                  <li>✓ Z-index scale for layering</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3">Core Components</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Button (6 variants, 4 sizes, all states)</li>
                  <li>✓ Input with icon support and validation</li>
                  <li>✓ Card, Modal, Table, Tabs, Toast</li>
                  <li>✓ Loading skeletons (8 variants)</li>
                  <li>✓ Empty state component</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3">Layout Frameworks</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ AppLayout (Desktop with collapsible sidebar)</li>
                  <li>✓ MobileLayout (Bottom tab navigation)</li>
                  <li>✓ AuthLayout (Centered card design)</li>
                  <li>✓ Responsive breakpoints</li>
                  <li>✓ Mobile drawer navigation</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3">System Components</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Notifications Center with badges</li>
                  <li>✓ Session Timeout Modal</li>
                  <li>✓ 404 and 500 error pages</li>
                  <li>✓ Dark mode toggle</li>
                  <li>✓ Language switcher (EN/FIL)</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3">Accessibility</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ WCAG AA compliant (4.5:1 contrast)</li>
                  <li>✓ Keyboard navigation support</li>
                  <li>✓ Screen reader friendly (ARIA)</li>
                  <li>✓ Focus indicators on all elements</li>
                  <li>✓ Semantic HTML structure</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-3">Engineering</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ TypeScript with strict types</li>
                  <li>✓ Reusable component architecture</li>
                  <li>✓ Flexbox/Grid layouts (no absolute)</li>
                  <li>✓ Design token system</li>
                  <li>✓ Clean, maintainable code</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentation Links */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            📚 Documentation:{" "}
            <code className="text-foreground">/guidelines/FoundationReadme.md</code>
          </p>
          <p className="mt-2">
            🎨 Design System Spec:{" "}
            <code className="text-foreground">/guidelines/DesignSystem.md</code>
          </p>
          <p className="mt-2">
            🔧 Global Styles:{" "}
            <code className="text-foreground">/styles/globals.css</code>
          </p>
        </div>
      </div>
    </div>
  );
}
