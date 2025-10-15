export const FieldError: React.FC<{ message?: string }> = ({ message }) =>
  message ? <p className="mt-1 text-xs text-red-600">{message}</p> : null;

export const Skeleton: React.FC<{ className?: string }> = ({
  className = "h-4 w-full",
}) => <div className={`skeleton ${className}`} />;
