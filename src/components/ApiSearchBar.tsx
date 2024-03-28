import React, { useState } from "react";
import {
  FormControl,
  OutlinedInput,
  Typography,
  InputAdornment,
} from "@mui/material";
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
        placeholder="{path}"
        {...{ onChange }}
        {...{ onKeyDown }}
        sx={{ alignItems: "center" }}
        startAdornment={
          <Typography
            sx={{ mt: 0.5, mr: 0.2, fontWeight: 700 }}
          >{`http://localhost:${process.env.SERVER_PORT}/`}</Typography>
        }
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
