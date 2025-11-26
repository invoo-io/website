import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
}

export default function GradientText({ children }: GradientTextProps) {
  const gradientStyle = {
    background: 'linear-gradient(90deg, var(--accent-blue-main) 0%, var(--accent-pink-main) 93.27%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block'
  };

  return <span style={gradientStyle}>{children}</span>;
}