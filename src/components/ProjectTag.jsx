import React from 'react';
import { Typography } from '@mui/material';

function ProjectTag({ label }) {
  let backgroundColor;
  let color = 'primary'; // Default color for the text

  switch (true) { // Changed to 'true' to allow for more complex conditions
    case label.toLowerCase().startsWith('minor project'):
      backgroundColor = '#f48fb1'; // Pink for Minor Project (I & II)
      color = 'white';
      break;
    case label.toLowerCase().startsWith('major project'):
      backgroundColor = '#4caf50'; // Green for Major Project (I & II)
      color = 'white';
      break;
    case label.toLowerCase() === 'industry internship':
      backgroundColor = '#ff9800'; // Orange for Industry Internship
      color = 'white';
      break;
    case label.toLowerCase() === 'dissertation i':
      backgroundColor = '#9c27b0'; // Purple for Dissertation I
      color = 'white';
      break;
    case label.toLowerCase() === 'dissertation ii':
      backgroundColor = '#673ab7'; // Darker Purple for Dissertation II
      color = 'white';
      break;
    default:
      backgroundColor = '#EFE9FD'; // Default light purple
      break;
  }

  return (
    <Typography
      variant="caption"
      color={color}
      sx={{
        backgroundColor: backgroundColor,
        padding: '4px 8px',
        borderRadius: '4px',
        fontWeight: 600,
      }}
    >
      {label}
    </Typography>
  );
}

export default ProjectTag;