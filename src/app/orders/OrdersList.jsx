"use client"
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField, TablePagination, TableSortLabel, IconButton, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { Add, Visibility } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { ConfirmBox } from '@/app/components/common/ConfirmBox';
import http_request from '../../../http-request'
import { Toaster } from 'react-hot-toast';
import { ToastMessage } from '@/app/components/common/Toastify';

import { ReactLoader } from '../components/common/Loading';
 

const OrdersList = (props) => {

  const router = useRouter()

  const categories = props?.categories;
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmBoxView, setConfirmBoxView] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState('asc');
  const [sortBy, setSortBy] = useState('id');

  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    const storedValue = localStorage.getItem("user");
    if (storedValue) {
      setUserData(JSON.parse(storedValue));
    }
  }, []);

  const filterData = props?.data?.filter((item) => item?.userId === userData?.user?._id)
  const data = userData?.user?.role === "ADMIN" ? props?.data : filterData;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };

  const sortedData = stableSort(data, getComparator(sortDirection, sortBy))?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleAdd = (row) => {
    setEditData(row)
    setEditModalOpen(true);
  }

  const deleteData = async () => {
    try {
      let response = await http_request.deleteData(`/deleteOrder/${orderId}`);
      let { data } = response;
      setConfirmBoxView(false);
      props?.RefreshData(data)
      ToastMessage(data);
    } catch (err) {
      console.log(err);
    }
  }
  
  const handleDelete = (id) => {
    setOrderId(id)
    setConfirmBoxView(true);
  }

  return (
    <div>
      <Toaster />
      <div className='flex justify-between items-center mb-3'>
        <div className='font-bold text-2xl'>Orders List</div>
        {/* <div onClick={handleAdd} className='flex bg-[#0284c7] hover:bg-[#5396b9] hover:text-black rounded-md p-2 cursor-pointer text-white justify-between items-center '>
          <Add style={{ color: "white" }} />
          <div className=' ml-2 '>Add Order</div>
        </div> */}
      </div>
      {!data.length > 0 ? <div className='h-[400px] flex justify-center items-center'> <ReactLoader /></div>
        :
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel active={sortBy === 'orderId'} direction={sortDirection} onClick={() => handleSort('orderId')}>
                      Sr. No.
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel active={sortBy === 'productName'} direction={sortDirection} onClick={() => handleSort('productName')}>
                      Design Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Contact </TableCell>
                  <TableCell>Address </TableCell>
                  <TableCell>Email </TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Order Status</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sortedData.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{row?.i}</TableCell>
                    <TableCell>{row.design}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.contact}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{new Date(row.createdAt)?.toLocaleString()}</TableCell>
                    <TableCell>{row.order}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <IconButton aria-label="edit" onClick={() => handleAdd(row)}>
                        <EditIcon color="success" />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => handleDelete(row.orderId)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>}
      
      <Dialog open={editModalOpen} onClose={handleEditModalClose}>
        <DialogTitle>{editData?._id ? "Edit Order" : "Add Order"}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleEditModalClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {/* <AddOrder userData={userData} existingOrder={editData} RefreshData={props?.RefreshData} onClose={handleEditModalClose} /> */}
        </DialogContent>
      </Dialog>

      <ConfirmBox bool={confirmBoxView} setConfirmBoxView={setConfirmBoxView} onSubmit={deleteData} />
    </div>
  );
};

export default OrdersList;

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
