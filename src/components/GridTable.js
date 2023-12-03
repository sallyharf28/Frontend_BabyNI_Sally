import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables(props) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="Table">
        <h3>Preformance Grid</h3>
   
    <TableContainer component={Paper}
       style={{boxShadow:'0px 13px 20px 0px #80808029'}}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>DATETIME_KEY</StyledTableCell>
            <StyledTableCell align="center">{props.state === "alias" ? "NEALIAS" : props.state === "type" && "NETYPE"}</StyledTableCell>
            <StyledTableCell align="center">RSL_INPUT_POWER</StyledTableCell>
            <StyledTableCell align="center">MAX_RX_LEVEL</StyledTableCell>
            <StyledTableCell align="center">RSL_DEVIATION</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.dateTimeKey}
              </StyledTableCell>
              <StyledTableCell align="center">{props.state === "alias" ? row.neAlias : props.state === "type" && row.neType}</StyledTableCell>
              <StyledTableCell align="center">{row.rslInputPower}</StyledTableCell>
              <StyledTableCell align="center">{row.maxRxLevel}</StyledTableCell>
              <StyledTableCell align="center">{row.rslDeviation}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </TableContainer>
   
    </div>
  );
}
