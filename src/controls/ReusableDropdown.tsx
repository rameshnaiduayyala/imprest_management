import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import {InputLabel} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (selectedValues: string) => void;
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

function getStyles(name: string, personName: string, theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
  const selectedValue=event.target.value
    onChange(selectedValue as string);
  };

  return (
    <div>
      <FormControl sx={{ width: 200 }} variant="standard" >
      <InputLabel htmlFor="outlined-select"
       style={{ textAlign: 'center'}} >select</InputLabel> 

        <Select
        fullWidth
          value={value}
          onChange={handleChange}
          MenuProps={MenuProps}
    
          
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              style={getStyles(option.value,value, theme)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
