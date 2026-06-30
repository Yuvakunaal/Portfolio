"use client";

import type { CSSProperties, ElementType } from "react";

export function KineticHeading({
  text,
  className,
  style,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
}) {
  const words = text.split(" ");
  return (
    <Tag data-kinetic className={className} style={style}>
      {words.map((w, i) => (
        <span className="mask" key={i}>
          <span>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
