// @ts-nocheck
import React, { useState, useEffect, ReactElement } from "react";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { Description } from "@mui/icons-material";

type ApiTableType = {
  name: string;
  children: any;
};

type ApiTableConfigType = {
  // key: string;
  // align?: string;
  // width?: number | string;
};

const tableConfig = [
  { key: "method", align: "left" },
  { key: "delay", align: "center", width: 80 },
  { key: "status", align: "right", width: 80 },
];

const methodColor = {
  POST: "#49cc90",
  GET: "#61affe",
  PATCH: "#fca130",
  DELETE: "##f93e3e",
};

const ApiTable = ({
  method,
  apiName,
  description,
  children,
}: ApiTableType): JSX.Element => {
  return (
    <>
      <InfoHeader path={} method={} onClick={() => console.log("test")} />
      <InfoControl></InfoControl>
    </>
    // <TableContainer>
    //   <Table stickyHeader>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell
    //           colSpan={tableConfig.length}
    //           sx={{
    //             py: 1.5,
    //             border: "none",
    //             borderRadius: "4px",
    //             fontSize: "16px",
    //             fontWeight: 500,
    //             color: "#fff",
    //             backgroundColor: "#444",
    //           }}
    //         >
    //           <Chip
    //             label={method}
    //             variant="outlined"
    //             size="small"
    //             sx={{
    //               mr: 1,
    //               borderRadius: "3px",
    //               fontSize: "12px",
    //               fontWeight: 600,
    //               color: "#fff",
    //               borderColor: methodColor[method],
    //               background: methodColor[method],
    //             }}
    //           />
    //           {apiName}
    //         </TableCell>
    //       </TableRow>
    //       <TableRow>
    //         {tableConfig.map((cell) => {
    //           return (
    //             <TableCell
    //               key={cell.key}
    //               align={cell.align}
    //               sx={{
    //                 width: cell?.width,
    //                 px: 0,
    //                 pb: 1.2,
    //                 fontWeight: 600,
    //               }}
    //             >
    //               {cell.key}
    //             </TableCell>
    //           );
    //         })}
    //       </TableRow>

    //       <TableRow>
    //         <TableCell
    //           colSpan={tableConfig.length}
    //           sx={{ px: 0, py: 1, border: "none" }}
    //         >
    //           {description}
    //         </TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>{children}</TableBody>
    //   </Table>
    // </TableContainer>
  );
};

export default ApiTable;
