import React, { useContext } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { ConfigContext } from "~/components/ListContainer";

const ListHead = () => {
  const config = useContext(ConfigContext);

  console.log(config);

  return (
    <TableContainer>
      <Table>
        <TableHead
          sx={{
            ".MuiTableCell-root": {
              border: "none",
            },
          }}
        >
          <TableRow>
            {config.map((cell) => {
              return (
                <TableCell
                  key={cell.key}
                  align={cell.align}
                  sx={{
                    pb: 1.2,
                    width: cell?.width,
                    fontWeight: 600,
                    border: "none",
                  }}
                >
                  {cell.key}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default ListHead;
