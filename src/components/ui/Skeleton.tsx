import React from "react";

type Props = { className?: string };

export const Skeleton: React.FC<Props> = ({ className = "h-4 w-full" }) => (
  <div className={`skeleton ${className}`} />
);

export default Skeleton;
