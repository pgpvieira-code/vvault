import React from 'react';

import { LOGO_MARK_DATA_URI } from '@/utils/constants/logo';

type LogoProps = {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
  color?: string;
}

/**
 * Logo component.
 */
const Logo: React.FC<LogoProps> = ({
  className = '',
  width = 200,
  height = 50,
  showText = true,
  color = 'currentColor'
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      version="1.1"
      viewBox="0 0 2000 500"
      width={width}
      height={height}
      className={className}
    >
      {/* Logo mark */}
      <image href={LOGO_MARK_DATA_URI} x="0" y="0" width="500" height="500" />

      {/* Wordmark - only show if showText is true */}
      {showText && (
        <text
          x="550"
          y="355"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="700"
          fontSize="290"
          letterSpacing="-7"
          fill={color}
        >
          VVault
        </text>
      )}
    </svg>
  );
};

export default Logo;
