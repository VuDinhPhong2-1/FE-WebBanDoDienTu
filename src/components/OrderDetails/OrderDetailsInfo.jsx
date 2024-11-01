import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import { fetchWithAuth } from "../../utils/authFetch";
import { useParams } from "react-router-dom";

// Container cho toàn bộ phần chi tiết đơn hàng
const Container = styled(Box)`
  width: 100%;
  max-width: 930px;
  min-height: 290px;
  height: fit-content;
  background: white;
  border-radius: 10px;
  display: flex;
  padding: 15px;
  flex-direction: column;
`;

// Các thành phần cho bảng
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
`;

const TableHeader = styled.th`
  border: 1px solid black;
  padding: 10px;
  height: 70px;
  text-align: left;
  background-color: #f5f5f5;
  font-weight: bold;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableData = styled.td`
  border: 1px solid black;
  padding: 10px;
  text-align: left;
`;

function OrderDetailsInfo() {
  const [orderDetailsData, setOrderDetailsData] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    fetchOrders();
  }, [orderId]);

  async function fetchOrders() {
    try {
      const { data: fetchedOrderData } = await fetchWithAuth(
        `http://localhost:3001/orders/${orderId}`,
        { method: "GET" }
      );
      setOrderData(fetchedOrderData);

      const { data: fetchedOrderDetailsData } = await fetchWithAuth(
        `http://localhost:3001/order-details/${orderId}`,
        { method: "GET" }
      );
      setOrderDetailsData(fetchedOrderDetailsData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  return (
    <Container>
      <Typography variant="h6" fontWeight={600}>
        Chi tiết đơn hàng
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography>Đơn hàng:</Typography>
        <Typography fontWeight={600}>
          {orderData ? orderData.orderId : "loading..."}
        </Typography>
        ,<Typography>Đặt lúc-</Typography>
        <Typography>
          {orderData ? orderData.createdAt : "loading..."}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography fontWeight={600} variant="body2">
          Họ tên:
        </Typography>
        <Typography variant="body2">
          {orderData ? orderData.customerName : "loading..."}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography fontWeight={600} variant="body2">
          Số điện thoại:
        </Typography>
        <Typography variant="body2">
          {orderData ? orderData.customerPhone : "loading..."}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography fontWeight={600} variant="body2">
          Địa chỉ:
        </Typography>
        <Typography variant="body2">
          {orderData ? orderData.shippingAddress : "loading..."}
        </Typography>
      </Box>

      {/* Bảng chi tiết đơn hàng */}
      <StyledTable>
        <thead>
          <TableRow>
            <TableHeader>STT</TableHeader>
            <TableHeader>Sản phẩm</TableHeader>
            <TableHeader>Đơn giá</TableHeader>
            <TableHeader>Số lượng</TableHeader>
            <TableHeader>Thành tiền</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {orderDetailsData?.map((item, index) => (
            <TableRow key={item.id || index}>
              <>
                <TableData>
                  <img
                    src={item.images[0]}
                    alt={item.productName || "Product Image"}
                    style={{
                      width: "58px",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </TableData>
                <TableData>{item.productName}</TableData>
                <TableData>{item.unitPrice.toLocaleString()}đ</TableData>
                <TableData>{item.quantity}</TableData>
                <TableData>{item.totalPrice.toLocaleString()}đ</TableData>
              </>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
}

export default OrderDetailsInfo;
