import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CrossButton = ({ onClick, sx }) => {
  return (
    <IconButton onClick={onClick} sx={{ ...sx }}>
      <CloseIcon />
    </IconButton>
  );
};

export default CrossButton;