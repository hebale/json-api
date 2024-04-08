import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Checkbox,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

type HeaderTableProps = {
  onChange: (headers: { [key: string]: string }) => void;
};

type HeaderData = {
  id: number;
  status: boolean;
  key: string;
  value: string;
  [key: string]: string | number | boolean;
};

const tableContainerStyle = {
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: "4px",
  "& .MuiTableCell-root": {
    p: 0.5,
    border: "none",
  },
  "& .MuiInputBase-root": {
    fontSize: "14px",
  },
};

const HeaderTable = ({ onChange }: HeaderTableProps) => {
  const [count, setCount] = useState(0);
  const [headers, setHeaders] = useState<HeaderData[]>([]);

  useEffect(() => {
    addHeader();
  }, []);

  useEffect(() => {
    onChange(
      headers.reduce((a: { [key: string]: string }, b) => {
        if (b.status) {
          a[b.key] = b.value;
        }

        return a;
      }, {})
    );
  }, [headers]);

  const addHeader = () => {
    const id = count + 1;

    setHeaders((prev) => [...prev, { id, status: false, key: "", value: "" }]);
    setCount(id);
  };

  const onChangeData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    payload: { id: number; type: string }
  ) => {
    const { id, type } = payload;
    const isLast = count === id;

    setHeaders((prev) =>
      prev.map((header) => {
        if (header.id === id) {
          if (isLast) header.status = true;
          header[type] = e.target.value;
        }
        return header;
      })
    );

    isLast && addHeader();
  };

  const onCheckHeader = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    if (count === id) return;

    setHeaders((prev) =>
      prev.map((header) => {
        if (header.id === id) header.status = e.target.checked;
        return header;
      })
    );
  };

  const onRemoveHeader = (id: number) => {
    setHeaders((prev) => prev.filter((header) => header.id !== id));
  };

  return (
    <TableContainer sx={tableContainerStyle}>
      <Table>
        <TableBody>
          {headers.map(({ id, status, key, value }, index) => {
            return (
              <TableRow key={id}>
                <TableCell>
                  <Checkbox
                    tabIndex={-1}
                    color="primary"
                    checked={status}
                    onChange={(e) => onCheckHeader(e, id)}
                    disabled={count === id}
                  />
                </TableCell>
                <TableCell>
                  <OutlinedInput
                    size="small"
                    placeholder="key"
                    defaultValue={key}
                    sx={{ width: "100%" }}
                    onChange={(e) => onChangeData(e, { id, type: "key" })}
                  />
                </TableCell>
                <TableCell>
                  <OutlinedInput
                    size="small"
                    placeholder="value"
                    defaultValue={value}
                    sx={{ width: "100%" }}
                    onChange={(e) => onChangeData(e, { id, type: "value" })}
                  />
                </TableCell>
                <TableCell>
                  {headers.length > index + 1 && (
                    <IconButton
                      tabIndex={-1}
                      color="error"
                      sx={{ mt: 0.4 }}
                      onClick={() => onRemoveHeader(id)}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HeaderTable;
