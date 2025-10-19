import React from 'react';
import { Box, Typography } from '@mui/material';

interface LogoProps {
  variant?: 'default' | 'large' | 'small';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', className = '' }) => {
  const getSize = () => {
    switch (variant) {
      case 'large':
        return { fontSize: '2.5rem', fontWeight: 700 };
      case 'small':
        return { fontSize: '1.2rem', fontWeight: 600 };
      default:
        return { fontSize: '1.5rem', fontWeight: 600 };
    }
  };

  return (
    <Box 
      className={`flex items-center cursor-pointer ${className}`}
      sx={{
        '&:hover': {
          opacity: 0.8,
          transition: 'opacity 0.2s ease',
        }
      }}
    >
      <Typography
        sx={{
          ...getSize(),
          color: '#1976d2',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          fontWeight: 700,
        }}
      >
        BookHub
      </Typography>
    </Box>
  );
};

export default Logo;