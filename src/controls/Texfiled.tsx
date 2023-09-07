import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import {InputAdornment} from "@mui/material"
// import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface TextFieldProps {
  type: 'number' | 'text' | 'password';
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  name?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  endAdornment?: JSX.Element; 
}

const ReusableTextField: React.FC<TextFieldProps> = ({
  type,
  label,
  value,
  onChange,
  name,
  endAdornment = null,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (type === 'number') {
      // Parse the input value to a number
      onChange(parseFloat(newValue));
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className="text-field">
      <FormControl variant="outlined">
        {/* <InputLabel htmlFor={name}>{label}</InputLabel> */}
        <TextField
            InputProps={{
              endAdornment: endAdornment && (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ),
            }}
          fullWidth
        variant="outlined"
          type={type}
          value={value}
          onChange={handleChange}
          required
          name={name}
         autoFocus
        //  style={{width:'400px',marginBottom:'10px'}}
          label={label} // Add label prop to TextField
      
         
        />
      </FormControl>
    </div>
  );
};

export default ReusableTextField;
