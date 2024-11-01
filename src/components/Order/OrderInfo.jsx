import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchWithAuth } from "../../utils/authFetch";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Container = styled(Box)`
  width: 100%;
  max-width: 930px;
  min-height: 290px;
  height: fit-content;
  background: white;
  border-radius: 10px;
  display: flex;
  padding: 15px;
`;

const paginationModel = { page: 0, pageSize: 5 };

function OrderInfo() {
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const { response, data } = await fetchWithAuth(
        "http://localhost:3001/orders/user-orders",
        {
          method: "GET",
        }
      );
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  // Định nghĩa columns bên trong OrderInfo để có thể sử dụng navigate
  const columns = [
    {
      field: "orderId",
      headerName: "Mã đơn hàng",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Typography
          color="primary"
          onClick={() => navigate(`/account/order/${params.value}`)}
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
            cursor: "pointer", // Thêm con trỏ chuột để hiển thị là có thể nhấp vào
          }}
        >
          {`#XGEAR${params.value}`}
        </Typography>
      ),
    },
    {
      field: "orderDate",
      headerName: "Ngày đặt",
      width: 130,
      align: "center",
      headerAlign: "center",
      valueGetter: (params) => moment(params.value).format("DD/MM/YYYY"),
    },
    {
      field: "totalAmount",
      headerName: "Thành tiền",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            justifyContent: "center",
          }}
        >
          {`${params.value.toLocaleString()}₫`}
        </Typography>
      ),
    },
    {
      field: "paymentStatus",
      headerName: "Trạng thái thanh toán",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Vận chuyển",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <Container>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={orderData}
          columns={columns}
          getRowId={(row) => row.orderId}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </Container>
  );
}

export default OrderInfo;