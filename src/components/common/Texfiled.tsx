import React, { ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import FormControl from "@mui/material/FormControl";

interface TextFieldProps {
  type: "number" | "text" | "password";
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  name?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  endAdornment?: JSX.Element;
  autoFocus?: boolean;
  error?: boolean;
  helperText?: string | number | boolean;
  required?: boolean;
}

const ReusableTextField: React.FC<TextFieldProps> = ({
  type,
  label,
  value,
  onChange,
  name,
  endAdornment = null,
  autoFocus = false,
  error = false,
  helperText = "",
  required = false,
  inputProps
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (type === "number") {
      onChange(parseFloat(newValue));
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className="text-field">
      <FormControl variant="filled">
        <TextField
          InputProps={{
            endAdornment: endAdornment && (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ),
          }}
          fullWidth
          variant="filled"
          type={type}
          value={value}
          onChange={handleChange}
          required={required}
          name={name}
          autoFocus={autoFocus}
          label={label}
          error={error}
          helperText={helperText}
          size='small'
          inputProps={inputProps}

        />
      </FormControl>
    </div>
  );
};

export default ReusableTextField;
