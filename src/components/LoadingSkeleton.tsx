import { Skeleton } from "./ui/skeleton";

interface LoadingSkeletonProps {
  variant?:
    | "card"
    | "table"
    | "form"
    | "list"
    | "page"
    | "kpi"
    | "chart"
    | "profile";
  count?: number;
  className?: string;
}

export function LoadingSkeleton({
  variant = "card",
  count = 1,
  className = "",
}: LoadingSkeletonProps) {
  if (variant === "card") {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border p-6 space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className={`space-y-3 ${className}`}>
        {/* Header */}
        <div className="flex gap-4 pb-3 border-b border-border">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20 ml-auto" />
        </div>
        {/* Rows */}
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex gap-4 py-3 border-b border-border">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20 ml-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "form") {
    return (
      <div className={`space-y-6 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "page") {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Page Header */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border p-6 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="rounded-lg border border-border p-6 space-y-4">
          <Skeleton className="h-6 w-48" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "kpi") {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border p-6 space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "chart") {
    return (
      <div className={`rounded-lg border border-border p-6 ${className}`}>
        <div className="space-y-3 mb-6">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (variant === "profile") {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Avatar and Name */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Profile Fields */}
        <div className="space-y-4">
          {Array.from({ length: count || 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default fallback
  return <Skeleton className={className} />;
}
