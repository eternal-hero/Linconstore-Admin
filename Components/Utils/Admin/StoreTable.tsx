import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Router, { useRouter } from "next/router";
import { Box, Grid, Modal, Stack, TextField, Switch, Typography, useMediaQuery } from "@mui/material";
import { EditOutlined, Close } from "@mui/icons-material";
import { TSellerStore } from "../../../Helpers/Types";
import {
  useUpdateSellerPausedPayout,
} from "../../../hooks/useDataFetch";
import Button from "@mui/material/Button";
import { useUpdatedBalance } from "../../../hooks/useDataFetch";
interface IAdminPayout {
  _id: string;
  seller: TSellerStore,
  length: number,
  pendingBalance: number,
  availBalance: number,
  payoutRequest: number,
  status: string
}

interface IAdminSeller {
  stores: IAdminPayout[];
  handleRefetch: () => void;
}
const StoreTable: React.FC<IAdminSeller> = ({ stores, handleRefetch }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedStore, setSelectedStore] = useState<IAdminPayout | null>(null);

  const handleUpdate = (id: string) => {
    const data = { id, };
    updateSeller(data);
  };
  const onSuccess = (seller: any) => {
    // setOpenModal(false)
    handleRefetch();
  };

  const [payoutValue, setPayoutValue] = useState<string>("nil")

  useEffect(() => {
    setPayoutValue((selectedStore?.payoutRequest.toString()));
    setIsUpdated(false);
    setUpdatedAvailBalance(0);
  }, [selectedStore]);

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isPad = useMediaQuery("(max-width: 900px)");

  const { mutate: updateSeller, isLoading } = useUpdateSellerPausedPayout(onSuccess);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const handleOpenModal = (id: string) => {
    setOpenModal(true)
    const tempSelectedStore = stores.filter((store) => store.seller.storeId._id === id)[0]
    setSelectedStore(tempSelectedStore)
  }
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getStoreCurrency = (currency: string): string => {
    if (currency === 'Pounds') return 'GBP'
    return currency
  }

  /////////////////////////////////////////////////////////////// update balance ///////////////////////////

  const [isUpdated, setIsUpdated] = useState(false);
  const [updatedAvailBalance, setUpdatedAvailBalance] = useState(0);
  const updateBalance = (amount: number) => {
    
    const data = {
      storeId: selectedStore.seller.storeId._id,
      amount: amount,
      currency: selectedStore?.seller.storeId?.currency,
      destination: selectedStore?.seller.accId
    }
    updatedBalance(data);
  }

  const router = useRouter();

  const updatedBalanceSuccess = (data: any) => {
    alert("Successfull update!");
    
    setPayoutValue("");
    setOpenModal(false)
    handleRefetch();
    // router.reload();
  }

  const { isLoading: isPaying, mutate: updatedBalance } = useUpdatedBalance(updatedBalanceSuccess);

  return (
    <>
      <Typography variant={"h6"} my={2}>
        {" "}
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: "transparent" }}>
        <Table sx={{ minWidth: 350 }} aria-label="stats table">
          <TableHead>
            <TableRow>
              <TableCell>Store name</TableCell>
              <TableCell align="left">Seller Email</TableCell>
              <TableCell align="left">Pending Payout</TableCell>
              <TableCell align="left">Payout Method</TableCell>
              <TableCell align="left">Payout Request</TableCell>
              <TableCell align="left">Update Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map(({ seller, pendingBalance, length, payoutRequest }, index) => {
                if (seller.storeId) {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {seller.storeId?.name}
                      </TableCell>
                      <TableCell align="left"> {seller.owner?.email} </TableCell>
                      <TableCell align="left">
                        {" "}
                        {getStoreCurrency(seller.storeId?.currency) + " " + pendingBalance.toFixed(2)}
                      </TableCell>
                      <TableCell align="left">
                        {seller.paypal ?
                          <span>Paypal:<br />{seller.paypal}</span>
                          : seller.accId && <span>Stripe:<br />{seller.accId}</span>}
                      </TableCell>
                      <TableCell align="left">
                        {payoutRequest ? getStoreCurrency(seller.storeId?.currency) + " " + payoutRequest.toFixed(2) : "nil"}
                      </TableCell>
                      <TableCell align="left">
                        {" "}
                        <Button
                          disabled={seller.storeId?.disabled}
                          onClick={() => handleOpenModal(seller.storeId._id)}
                          className={"pointer"}
                        >
                          <EditOutlined />
                        </Button>{" "}
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={stores.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{
          bottom: isMobile ? 50 : 0,
        }}
      >
        <Box
          sx={{
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            top: "100",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "1000",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: !isMobile ? "50%" : "70%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: isPad ? "95vw" : 500,
              bgcolor: "background.paper",
              borderRadius: "20px",
              boxShadow: 24,
              p: 3,
              pb: !isMobile ? 3 : 10,
            }}
          >
            <Stack spacing={2}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography fontWeight={600}>{selectedStore?.seller?.storeId?.name}</Typography>
                <Close onClick={() => setOpenModal(false)} sx={{ cursor: "pointer" }} />
              </Box>

              <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                  <Stack>
                    <Typography fontSize={14}>Account Holder</Typography>
                    <Typography fontSize={14}>{selectedStore?.seller?.owner.firstName + " " + selectedStore?.seller?.owner.lastName}</Typography>
                    <Typography fontSize={14}>{selectedStore?.seller?.owner?.email}</Typography>
                    <Typography fontSize={14}>{selectedStore?.seller?.owner.phone}</Typography>
                  </Stack>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Stack>
                    <Typography fontSize={14}>Open Refund</Typography>
                    <Typography fontSize={14}>0</Typography>
                  </Stack>
                </Grid>
              </Grid>

              <Stack p={1}>
                <Typography fontSize={14}>Payout Method</Typography>
                <Typography fontSize={14}>{selectedStore?.seller?.accId && <span>Stripe: {selectedStore?.seller?.accId}</span>}{selectedStore?.seller?.paypal && <span>Paypal: {selectedStore?.seller?.paypal}</span>}</Typography>
              </Stack>

              <Stack direction={"row"} spacing={5} p={1}>
                <Stack>
                  <Typography fontSize={14}>Pending Payout</Typography>
                  <Typography fontSize={14}>{getStoreCurrency(selectedStore?.seller.storeId?.currency) + " " + selectedStore?.pendingBalance.toFixed(2)}</Typography>
                </Stack>
                <Stack>
                  <Typography fontSize={14}>Available Payout</Typography>
                  <Typography fontSize={14}>{getStoreCurrency(selectedStore?.seller.storeId?.currency) + " " + selectedStore?.availBalance.toFixed(2)}</Typography>
                </Stack>
                <Stack>
                  <Typography fontSize={14}>Payout Request</Typography>
                  <Typography fontSize={14}>{(selectedStore?.status == "Approve") ? "nil": selectedStore?.payoutRequest }</Typography>
                </Stack>
              </Stack>
              {
                (selectedStore?.seller?.accId || selectedStore?.seller?.paypal) && <>
                  <Grid container spacing={1}>
                    <Grid item md={12}>
                      <Stack>
                        <Stack direction={"row"}>
                          <Typography sx={{ mr: "10px" }}>Pause payout</Typography>
                          <Switch
                            disabled={isLoading}
                            checked={selectedStore?.seller.isPausedPayout}
                            onChange={() => handleUpdate(selectedStore?.seller._id)}
                          />
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item md={6}>
                      <Stack>
                        <Typography fontSize={14}>Send Payout</Typography>
                        <TextField size="small" disabled value={(selectedStore?.status == "Approve")? "" : payoutValue} />
                      </Stack>
                    </Grid>
                    <Grid item md={6}>
                      <Stack>
                        <Typography fontSize={14}>Memo</Typography>
                        <TextField size="small" defaultValue={"Seller Payout Withdrawn"} />
                      </Stack>
                    </Grid>
                  </Grid>

                  <Box display={"flex"} p={1} justifyContent={isMobile ? 'start' : 'end'}>
                    <Button disabled = {selectedStore?.status == "Approve" || !selectedStore?.payoutRequest} variant="outlined" size="small" sx={{ borderRadius: '10px', minWidth: "200px" }} onClick={() => updateBalance(selectedStore.payoutRequest)}>
                      Update Balance
                    </Button>
                  </Box>
                </>
              }
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default StoreTable;
