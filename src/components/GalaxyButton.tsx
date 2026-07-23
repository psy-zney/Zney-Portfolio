import React, { useEffect, useRef } from 'react';
import './GalaxyButton.css';

interface GalaxyButtonProps {
  text: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  isIcon?: boolean;
  title?: string;
}

const RANDOM = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export const GalaxyButton: React.FC<GalaxyButtonProps> = ({ text, onClick, href, className = '', isIcon, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const particles = containerRef.current.querySelectorAll<HTMLElement>('.star');
      particles.forEach((p) => {
        p.style.setProperty('--angle', `${RANDOM(0, 360)}`);
        p.style.setProperty('--duration', `${RANDOM(6, 20)}`);
        p.style.setProperty('--delay', `${RANDOM(1, 10)}`);
        p.style.setProperty('--alpha', `${RANDOM(40, 90) / 100}`);
        p.style.setProperty('--size', `${RANDOM(2, 6)}`);
        p.style.setProperty('--distance', `${RANDOM(40, 200)}`);
      });
    }
  }, []);

  const innerContent = (
    <>
      <span className="spark"></span>
      <span className="backdrop"></span>
      <span className="galaxy__container">
        <span className="star star--static"></span>
        <span className="star star--static"></span>
        <span className="star star--static"></span>
        <span className="star star--static"></span>
      </span>
      <span className="galaxy">
        <span className="galaxy__ring">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="star"></span>
          ))}
        </span>
      </span>
      <span className="text">{text}</span>
    </>
  );

  return (
    <div className={`galaxy-button ${className} ${isIcon ? 'icon-mode' : ''}`} ref={containerRef} title={title}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {innerContent}
        </a>
      ) : (
        <button onClick={onClick} type="button">
          {innerContent}
        </button>
      )}
      <div className="bodydrop"></div>
    </div>
  );
};
