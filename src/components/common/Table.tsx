/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getValueByNestedProp } from "../../utilities/helper";

interface Column {
  id: string;
  label: string;
  IsNestedProprty?: boolean | undefined,
  align?: "left" | "right" | "center";
}

interface Data {
  [key: string]: any;
}

interface Props {
  columns: Column[];
  data: Data[];
  onEdit: (id: number) => void;
  onDelete?: (id: number) => void;
}

const ReusableTable: React.FC<Props> = ({
  columns,
  data,
  onDelete,
  onEdit,
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [orderBy, setOrderBy] = useState<string>("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = data.slice().sort((a, b) => {
    if (orderBy === "") return 0;

    const aValue: any = (a as any)[orderBy];
    const bValue: any = (b as any)[orderBy];

    if (typeof aValue === "string") {
      return order === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return order === "asc" ? aValue - bValue : bValue - aValue;
  });

  return (
    <Paper>
      <TableContainer style={{ width: "fitContent" }}>
        <Table>
          <TableHead style={{ borderTop: "4px solid blue" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || "left"}>
                  {column.id !== orderBy ? (
                    <TableSortLabel
                      active={false}
                      direction="asc"
                      onClick={() => handleSort(column.id)}
                      style={{ color: "blue" }}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    <TableSortLabel
                      active={true}
                      direction={order}
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align || "left"}>
                      {column.id === "actions" ? ( // Check if it's the useractions column
                        <>
                          <IconButton onClick={() => onEdit(row.id)}>
                            <EditIcon />
                          </IconButton>

                          {onDelete && (
                            <IconButton onClick={() => onDelete(row.id)}>
                              <DeleteIcon />
                            </IconButton>
                          )}
                        </>
                      ) : (typeof getValueByNestedProp(row, column.id, column.IsNestedProprty)) === "boolean" ? (
                        getValueByNestedProp(row, column.id, column.IsNestedProprty) ? (
                          "Active"
                        ) : (
                          "Inactive"
                        )
                      ) : (
                        getValueByNestedProp(row, column.id, column.IsNestedProprty)
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ReusableTable;