import { ReactNode, forwardRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "./ui/utils";

interface InputWithIconProps extends React.ComponentProps<"input"> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
  (
    {
      label,
      leftIcon,
      rightIcon,
      error,
      helperText,
      className,
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <Label htmlFor={inputId} className={hasError ? "text-destructive" : ""}>
            {label}
            {props.required && (
              <span className="text-destructive ml-1" aria-label="required">
                *
              </span>
            )}
          </Label>
        )}
        <div className="relative">
          {leftIcon && (
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}
          <Input
            ref={ref}
            id={inputId}
            className={cn(
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              hasError && "border-destructive focus-visible:ring-destructive/20",
              className
            )}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            {...props}
          />
          {rightIcon && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";
