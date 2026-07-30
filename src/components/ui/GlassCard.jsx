import React from "react";

export default function GlassCard({
  children,
  padding = 28,
  radius = 24,
  style = {},
  className,
}) {
  return (
    <div
      className={className}
      style={{
        background: "rgba(255, 255, 255, 0.92)",
        borderRadius: radius,
        padding,
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.10)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
