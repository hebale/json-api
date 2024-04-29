import React from "react";
import { FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type ApiSearchBarProps = {
  onSearch: (str: string) => void;
};

const ApiSearchBar = ({ onSearch }: ApiSearchBarProps) => {
  return (
    <FormControl variant="outlined" size="small">
      <OutlinedInput
        type="text"
        placeholder="path"
        onChange={(e) => onSearch((e.target as HTMLInputElement).value)}
        sx={{ minWidth: "360px", alignItems: "center" }}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default ApiSearchBar;
