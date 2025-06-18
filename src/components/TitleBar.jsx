import React from 'react';
import { Box, Typography } from '@mui/material';

const TitleBar = ({ title, children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
        width: '100%',
        borderBottom: "1px solid #DCE1F0",
        paddingBottom: 1,
        marginBottom: 1
      }}
    >
      <Typography variant="h5" fontWeight={600} color='#777777'>{title}</Typography>
      <Box>{children}</Box>
    </Box>
  );
};

export default TitleBar;