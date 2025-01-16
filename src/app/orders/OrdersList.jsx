"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  TablePagination,
  TableSortLabel,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { Toaster } from "react-hot-toast";
import { ConfirmBox } from "@/app/components/common/ConfirmBox";
import { ToastMessage } from "@/app/components/common/Toastify";
import { ReactLoader } from "../components/common/Loading";
import http_request from "../../../http-request";
import { Visibility } from "@mui/icons-material";
import { useRouter } from "next/navigation";
 

const OrdersList = (props) => {

  const router=useRouter()
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmBoxView, setConfirmBoxView] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [editData, setEditData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortBy, setSortBy] = useState("id");
  const [userData, setUserData] = useState(null);
  const [artistList, setArtistList] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    const storedValue = localStorage.getItem("user");
    if (storedValue) {
      setUserData(JSON.parse(storedValue));
    }
  }, []);

  useEffect(() => {
    // Fetch artist list from API
    const fetchArtists = async () => {
      try {
        const response = await http_request.get("/getAllArtists");
        const {data}=response
        setArtistList(data);
      } catch (error) {
        console.error("Failed to fetch artists:", error);
      }
    };
    fetchArtists();
  }, []);
// console.log(artistList);

  const filterData = props?.data?.filter(
    (item) => item?.userId === userData?.user?._id
  );
  const data = userData?.user?.role === "ADMIN" ? props?.data : filterData;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortBy(property);
  };

  const sortedData = stableSort(
    data,
    getComparator(sortDirection, sortBy)
  )?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditData(null);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setSelectedArtist(row?.assignedArtist || "");
    setOrderStatus(row?.status || "");
    setEditModalOpen(true);
  };

  const deleteData = async () => {
    try {
      const response = await http_request.deleteData(`/deleteOrder/${orderId}`);
      const { data } = response;
      setConfirmBoxView(false);
      props?.RefreshData(data);
      ToastMessage(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id) => {
    setOrderId(id);
    setConfirmBoxView(true);
  };

  const handleSave = async () => {
    
    const filterArtist=artistList?.find((f)=>f?._id===selectedArtist)
    
    try {
      const updatedOrder = {
        agentId:filterArtist?._id, agentName:filterArtist?.name, agentContact:filterArtist?.contact
      };
      console.log(updatedOrder);
      
      const response = await http_request.patch(
        `/asignArtistInOrder/${editData._id}`,
        updatedOrder
      );
      const { data } = response;
      props?.RefreshData(data);
      ToastMessage(data);
      handleEditModalClose();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  const handleDetails=(id)=>{
    router.push(`/orders/${id}`)
  }

  return (
    <div>
      <Toaster />
      <div className="flex justify-between items-center mb-3">
        <div className="font-bold text-2xl">Orders List</div>
      </div>
      {!data.length > 0 ? (
        <div className="h-[400px] flex justify-center items-center">
          <ReactLoader />
        </div>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "orderId"}
                      direction={sortDirection}
                      onClick={() => handleSort("orderId")}
                    >
                      Sr. No.
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Design Name</TableCell>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Order Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.map((row, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.design}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.contact}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      {new Date(row.createdAt)?.toLocaleString()}
                    </TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell style={{display:"flex"}}>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(row)}
                      >
                        <EditIcon color="success" />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleDetails(row?._id)}
                      >
                        <Visibility color="primary" />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(row.orderId)}
                      >
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
        </>
      )}

      <Dialog open={editModalOpen} onClose={handleEditModalClose}>
        <DialogTitle>Asign Artist</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleEditModalClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent style={{ width: '300px' }}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Assign Artist</InputLabel>
            <Select
              value={selectedArtist}
              onChange={(e) => setSelectedArtist(e.target.value)}
            >
              {artistList.map((artist) => (
                <MenuItem key={artist._id} value={artist._id}>
                  {artist.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <FormControl fullWidth margin="normal">
            <TextField
              label="Order Status"
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            />
          </FormControl> */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleEditModalClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          >
            Save
          </Button>

        </DialogActions>
      </Dialog>

      <ConfirmBox
        bool={confirmBoxView}
        setConfirmBoxView={setConfirmBoxView}
        onSubmit={deleteData}
      />
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
  return order === "desc"
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
