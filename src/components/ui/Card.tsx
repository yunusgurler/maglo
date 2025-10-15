import React from "react";

type Props = {
  className?: string;
  title?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
};

export const Card: React.FC<Props> = ({
  className = "",
  title,
  action,
  children,
}) => (
  <div className={`bg-white rounded-2xl ${className}`}>
    {(title || action) && (
      <div className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-slate-100">
        {title ? (
          <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
        ) : (
          <span />
        )}
        {action}
      </div>
    )}
    <div className="py-6">{children}</div>
  </div>
);

export default Card;
