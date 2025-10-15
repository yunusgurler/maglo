import React from "react";
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>((props, ref) => (
  <input
    ref={ref}
    {...props}
    className={`w-full h-10 rounded-lg border px-3 text-sm outline-none transition bg-white ${
      props.error
        ? "border-red-500 focus:ring-2 ring-red-200"
        : "border-slate-200 focus:ring-2 ring-brand/40"
    } ${props.className ?? ""}`}
  />
));
Input.displayName = "Input";

export const Card: React.FC<{
  className?: string;
  title?: string;
  action?: React.ReactNode;
}> = ({ className = "", title, action, children }) => (
  <div className={`bg-white rounded-2xl shadow-card ${className}`}>
    {(title || action) && (
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        {action}
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);
