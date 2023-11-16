import React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
export interface DropdownOption {
  value: string | number;
  name: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string | number;
  onChange: (selectedValues: string | number) => void;
  name: string;
  error?: boolean;
  helperText?: string;
  isRequired?: boolean;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(options: DropdownOption[], value: DropdownOption, theme: Theme) {
  return {
    fontWeight:
      options.indexOf(value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const Dropdown: React.FC<DropdownProps> = ({ options,
  value, name, onChange, error, helperText }) => {
  const theme = useTheme();
  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue as string);
  };

  return (
    <div className="gen_ddn_position">
      <FormControl sx={{ m: 1, width: 300 }} variant="filled">
        <InputLabel id="demo-multiple-name-label" style={{ textAlign: "center" }}>
          {name}
        </InputLabel>

        <Select
          fullWidth
          value={value}
          onChange={handleChange}
          MenuProps={MenuProps}
          error={error}
          required
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              style={getStyles(options, option, theme)}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
        {error && helperText && (
          <div className="helper-text" style={{ color: 'red', fontSize: "13px" }}>
            {helperText}
          </div>
        )}
      </FormControl>
    </div>
  );
};



export default Dropdown;