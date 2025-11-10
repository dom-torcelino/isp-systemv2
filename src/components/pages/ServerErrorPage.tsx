import { ServerCrash, RefreshCw, Home } from "lucide-react";
import { Button } from "../ui/button";
import { useLanguage } from "../../contexts/LanguageContext";

interface ServerErrorPageProps {
  onRetry?: () => void;
  onNavigateHome?: () => void;
  errorMessage?: string;
}

export function ServerErrorPage({
  onRetry,
  onNavigateHome,
  errorMessage,
}: ServerErrorPageProps) {
  const { t } = useLanguage();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleNavigateHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background p-4"
      role="main"
      aria-live="assertive"
    >
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10">
            <ServerCrash
              className="h-12 w-12 text-destructive"
              aria-hidden="true"
            />
          </div>
        </div>

        <h1 className="text-4xl mb-4">500</h1>
        <h2 className="text-2xl mb-4">{t("Server Error")}</h2>
        <p className="text-muted-foreground mb-2">
          {errorMessage ||
            t(
              "Something went wrong on our end. We're working to fix the issue. Please try again later."
            )}
        </p>
        <p className="text-muted-foreground text-sm mb-8">
          {t("If the problem persists, please contact support.")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleRetry}>
            <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
            {t("Try Again")}
          </Button>
          <Button variant="outline" onClick={handleNavigateHome}>
            <Home className="mr-2 h-4 w-4" aria-hidden="true" />
            {t("Go to Homepage")}
          </Button>
        </div>
      </div>
    </div>
  );
}
