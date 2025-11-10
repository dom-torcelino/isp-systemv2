import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useLanguage } from "../../contexts/LanguageContext";

interface NotFoundPageProps {
  onNavigateHome?: () => void;
  onGoBack?: () => void;
}

export function NotFoundPage({ onNavigateHome, onGoBack }: NotFoundPageProps) {
  const { t } = useLanguage();

  const handleNavigateHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.location.href = "/";
    }
  };

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background p-4"
      role="main"
    >
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <FileQuestion
              className="h-12 w-12 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </div>

        <h1 className="text-4xl mb-4">404</h1>
        <h2 className="text-2xl mb-4">{t("Page Not Found")}</h2>
        <p className="text-muted-foreground mb-8">
          {t(
            "The page you're looking for doesn't exist or has been moved. Please check the URL or return to the homepage."
          )}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleNavigateHome}>
            <Home className="mr-2 h-4 w-4" aria-hidden="true" />
            {t("Go to Homepage")}
          </Button>
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            {t("Go Back")}
          </Button>
        </div>
      </div>
    </div>
  );
}
