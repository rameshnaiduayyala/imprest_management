import React, { useState } from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


interface Column {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
}

interface Data {
  [key: string]: any;
}

interface Props {
    columns: Column[];
    data: Data[];
     onEdit ?:(id:number)=>void
    onDelete?: (id: number) => void; // Define the onDelete prop type
  }

const ReusableTable: React.FC<Props> = ({ columns, data,onDelete,onEdit }) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [orderBy, setOrderBy] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
 
  const handleChangePage = (event: unknown, newPage: number) => {
    console.log(event)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedData = data.slice().sort((a, b) => {
    if (orderBy === '') return 0;

    const aValue: any = (a as any)[orderBy];
    const bValue: any = (b as any)[orderBy];

    if (typeof aValue === 'string') {
      return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    return order === 'asc' ? aValue - bValue : bValue - aValue;
  });
  
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{backgroundColor:"#e1f0ef",boxShadow:"5px 3px blue"}}>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align || 'left'}>
                  {column.id !== orderBy ? (
                    <TableSortLabel
                      active={false}
                      direction="asc"
                      onClick={() => handleSort(column.id)}
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
                  <TableCell key={column.id} align={column.align || 'left'}>
                    {column.id === 'useractions' ? ( // Check if it's the useractions column
                      <>
                        <IconButton onClick={() => onEdit(row.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton   onClick={() => onDelete(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    ) : (
                      row[column.id]
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
