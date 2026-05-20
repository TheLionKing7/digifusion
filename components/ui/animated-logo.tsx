'use client';

import Image from 'next/image';
import digiLogo from '@/assets/digilogo.png';

interface AnimatedLogoProps {
  size?: number;
}

export function AnimatedLogo({ size = 40 }: AnimatedLogoProps) {
  const c = size / 2;
  const outerR = c - 1;
  const blueR  = c * 0.72;
  const greenR = c * 0.52;
  const glowR  = c * 0.28;

  const ringStyle = {
    transformBox: 'fill-box',
    transformOrigin: 'center',
  } as React.CSSProperties;

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <Image
        src={digiLogo}
        alt="DigiFusion"
        width={size}
        height={size}
        style={{ objectFit: 'contain', display: 'block' }}
        priority
      />

      {/* Animated ring overlays */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', top: 0, left: 0 }}
        aria-hidden="true"
      >
        {/* Outer gold ring — 8s clockwise */}
        <circle
          cx={c}
          cy={c}
          r={outerR}
          fill="none"
          stroke="hsl(42, 95%, 55%)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeDasharray={`${outerR * 2.6} ${outerR * 1.4}`}
          style={{
            ...ringStyle,
            animation: 'logo-ring-cw 8s linear infinite',
          }}
        />

        {/* Blue arc ring — 5s counter-clockwise */}
        <circle
          cx={c}
          cy={c}
          r={blueR}
          fill="none"
          stroke="hsl(210, 100%, 65%)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${blueR * 2.2} ${blueR * 3.8}`}
          style={{
            ...ringStyle,
            animation: 'logo-ring-ccw 5s linear infinite',
          }}
        />

        {/* Green arc ring — 3.5s clockwise */}
        <circle
          cx={c}
          cy={c}
          r={greenR}
          fill="none"
          stroke="hsl(142, 70%, 50%)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${greenR * 1.8} ${greenR * 4.2}`}
          style={{
            ...ringStyle,
            animation: 'logo-ring-cw 3.5s linear infinite',
          }}
        />

        {/* Center glow — 3s pulse */}
        <circle
          cx={c}
          cy={c}
          r={glowR}
          fill="hsl(168, 100%, 42%)"
          style={{
            ...ringStyle,
            animation: 'logo-glow 3s ease-in-out infinite',
          }}
        />
      </svg>
    </div>
  );
}
