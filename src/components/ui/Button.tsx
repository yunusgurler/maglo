import React from "react";
export const Button = ({
  loading,
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) => (
  <button
    disabled={loading || rest.disabled}
    className={`inline-flex items-center justify-center rounded-lg bg-brand px-4 h-10 text-sm font-medium text-ink shadow hover:bg-brand-dark transition disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    {...rest}
  >
    {loading && (
      <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-ink/60 border-t-transparent" />
    )}
    {children}
  </button>
);
