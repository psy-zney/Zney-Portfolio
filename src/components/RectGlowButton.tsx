import React, { useRef, useEffect } from 'react';
import './RectGlowButton.css';

interface RectGlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const RectGlowButton: React.FC<RectGlowButtonProps> = ({ children, onClick, color = '#fff', style, className = '' }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const blurRef = useRef<SVGRectElement>(null);
  const lineRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (btnRef.current && blurRef.current && lineRef.current) {
      // Apply the same border radius to the SVG rects as the button
      const computedStyle = window.getComputedStyle(btnRef.current);
      const rx = computedStyle.borderRadius;
      if (rx && rx !== '0px') {
        blurRef.current.setAttribute('rx', rx);
        lineRef.current.setAttribute('rx', rx);
      }
    }
  }, []);

  return (
    <button
      ref={btnRef}
      className={`rect-glow-btn ${className}`}
      onClick={onClick}
      style={{
        ...style,
        '--glow-line-color': color,
        '--glow-blur-color': color,
      } as React.CSSProperties}
    >
      {children}
      <svg className="glow-container">
        <rect ref={blurRef} pathLength="100" strokeLinecap="round" className="glow-blur"></rect>
        <rect ref={lineRef} pathLength="100" strokeLinecap="round" className="glow-line"></rect>
      </svg>
    </button>
  );
};
