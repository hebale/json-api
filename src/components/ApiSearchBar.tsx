import React, { useState } from "react";
import { FormControl, OutlinedInput, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ApiSearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(e.target.value);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") doSearch();
  };

  const doSearch = () => {
    /* ~ contents search ~ */
    console.log(`"${searchText}" search!`);
  };

  return (
    <FormControl variant="outlined" size="small">
      <OutlinedInput
        type="text"
        placeholder="api name"
        {...{ onChange }}
        {...{ onKeyDown }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
            {/* <IconButton
              // onClick={handleClickShowPassword}
              // onMouseDown={handleMouseDownPassword}
              edge="start"
            >
            </IconButton> */}
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default ApiSearchBar;
