import React, { useState, useEffect } from 'react';
import { FormControl, OutlinedInput, InputAdornment } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

type ApiSearchBarProps = {
  onSearch: (str: string) => void;
};

const SearchBar = ({ onSearch }: ApiSearchBarProps) => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    onSearch(searchText);
  }, [searchText]);

  return (
    <FormControl variant="outlined" size="small">
      <OutlinedInput
        type="text"
        value={searchText}
        placeholder="path"
        onChange={(e) => setSearchText((e.target as HTMLInputElement).value)}
        sx={{ minWidth: '360px', alignItems: 'center' }}
        endAdornment={
          <InputAdornment position="end">
            <CancelIcon fontSize="small" onClick={() => setSearchText('')} />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default SearchBar;
