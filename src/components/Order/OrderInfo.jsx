import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import fetchWithAuth from "../../utils/authFetch";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await fetchWithAuth("/",
          "http://localhost:3001/orders/user-orders",
          {
            method: "GET",
          }
        );
        setOrderData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Không thể tải dữ liệu đơn hàng.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
            cursor: "pointer",
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

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;

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
