import React from "react";

export default function StatCard({
  value,
  label,
  color = "#12355b",
  background = "#eff6ff",
  border = "1px solid #dbeafe",
  style = {},
}) {
  return (
    <div
      style={{
        background,
        border,
        borderRadius: 18,
        padding: 18,
        textAlign: "center",
        minWidth: 140,
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 30,
          fontWeight: 900,
          color,
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>

      <div
        style={{
          marginTop: 6,
          fontSize: 14,
          color: "#64748b",
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
}
