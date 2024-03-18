import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
// import { Description } from "@mui/icons-material";

const tableConfig = [
  { key: "method", align: "left" },
  { key: "delay", align: "center", width: 80 },
  { key: "status", align: "right", width: 80 },
];

const InfoControl = ({ description }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {tableConfig.map((cell) => {
              return (
                <TableCell
                  key={cell.key}
                  align={cell.align}
                  sx={{
                    width: cell?.width,
                    px: 0,
                    pb: 1.2,
                    fontWeight: 600,
                  }}
                >
                  {cell.key}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{description}</TableCell>
            <TableCell>
              <TableCell></TableCell>
              {/* <Select value={age} label="Age" onChange={handleChange}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select> */}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InfoControl;
