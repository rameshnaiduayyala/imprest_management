import React, { ReactNode } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

interface CustomButtonProps extends Omit<ButtonProps, 'size' | 'color'> {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  icon?: ReactNode;
  onClick?: () => void; // Define onClick event handler
}

const useStyles = makeStyles(() => ({
  sm: {
    fontSize: '14px',
  },
  md: {
    fontSize: '16px',
  },
  lg: {
    fontSize: '18px',
  },
}));

const CustomButton: React.FC<CustomButtonProps> = ({ size, color, children, icon, onClick, ...rest }) => {
  const classes = useStyles();

  return (
    <Button
      className={size ? classes[size] : classes.md}
      style={{
        backgroundColor: color || '#4caf50',
        color: 'Black', // Set text color to white
        margin:'10px'
      }}
      onClick={onClick} // Pass the onClick event handler
      {...rest}
    >
      {icon && icon}
      {children}
    </Button>
  );
};

export default CustomButton;
