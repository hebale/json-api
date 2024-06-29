import React, { useState, useEffect, ReactEventHandler } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormControl, OutlinedInput, InputAdornment } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

type ApiSearchBarProps = {
  onSearch: (str: string) => void;
};

const SearchBar = ({ onSearch }: ApiSearchBarProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    const param = searchParam.get('search') ?? '';
    setSearchText(param);
    onSearch(param);
  }, []);

  const onChangeSearch = (value: string) => {
    searchParam.set('search', value);
    setSearchParam(searchParam);

    setSearchText(value);
    onSearch(value);
  };

  return (
    <FormControl variant="outlined" size="small">
      <OutlinedInput
        type="text"
        value={searchText}
        placeholder="path"
        onChange={(e) => onChangeSearch((e.target as HTMLInputElement).value)}
        sx={{ minWidth: '360px', alignItems: 'center' }}
        endAdornment={
          searchText && (
            <InputAdornment position="end">
              <CancelIcon fontSize="small" onClick={() => onChangeSearch('')} />
            </InputAdornment>
          )
        }
      />
    </FormControl>
  );
};

export default SearchBar;
