import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { TTransaction } from "../../../Helpers/Types";
import { Loop, MarkChatRead } from "@mui/icons-material";

interface ITransaction {
  transactions: TTransaction[]; //TODO need to update type
}
const TransactionTable: React.FC<ITransaction> = ({ transactions }) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Typography variant={"h6"} my={2}>
        {" "}
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: "transparent" }}>
        <Table sx={{ minWidth: 350 }} aria-label="stats table">
          <TableHead>
            <TableRow>
              <TableCell>Transaction Type</TableCell>
              <TableCell align="center">Transaction ID</TableCell>
              <TableCell align="center">Account</TableCell>
              <TableCell align="center">Method</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    Withdrawal
                  </TableCell>
                  <TableCell align="center"> {row._id}</TableCell>
                  <TableCell align="center"> {row.account} </TableCell>
                  <TableCell align="center"> {row.method} </TableCell>
                  <TableCell align="center"> {row.amount} </TableCell>
                  <TableCell align="center" >
                    {row.status}
                  </TableCell>
                  <TableCell align="center" >
                    {new Date(row.createdAt).toISOString().split('T')[0]}
                  </TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
export default TransactionTable;
