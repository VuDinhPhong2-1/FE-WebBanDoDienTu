import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import fetchWithAuth from "../../utils/authFetch";
import { useParams } from "react-router-dom";

const translatePaymentStatus = (status) => {
  switch (status) {
    case "pending":
      return "Chưa thanh toán";
    case "paid":
      return "Đã thanh toán";
    case "failed":
      return "Thanh toán thất bại";
    case "refunded":
      return "Đã hoàn tiền";
    case "partially_paid":
      return "Thanh toán một phần";
    case "declined":
      return "Từ chối thanh toán";
    case "authorized":
      return "Được ủy quyền";
    case "voided":
      return "Đã hủy thanh toán";
    case "in_progress":
      return "Đang xử lý thanh toán";
    case "chargeback":
      return "Tranh chấp thanh toán";
    default:
      return "Trạng thái không xác định";
  }
};

const translateOrderStatus = (status) => {
  switch (status) {
    case "Pending":
      return "Chờ xử lý";
    case "Processing":
      return "Đang xử lý";
    case "Shipped":
      return "Đã giao cho vận chuyển";
    case "Delivered":
      return "Đã giao hàng";
    case "Canceled":
      return "Đã hủy";
    case "Returned":
      return "Đã trả hàng";
    case "Completed":
      return "Hoàn tất";
    default:
      return "Trạng thái không xác định";
  }
};

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

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  font-size: 14px;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
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
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
`;

const ProductImage = styled.img`
  width: 58px;
  height: auto;
  object-fit: cover;
`;

const TotalRow = styled.tr`
  font-weight: bold;
`;

const StatusRow = styled.tr`
  font-weight: bold;
  color: #d9534f;
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
        "/",
        `http://localhost:3001/orders/${orderId}`,
        { method: "GET" }
      );
      setOrderData(fetchedOrderData);

      const { data: fetchedOrderDetailsData } = await fetchWithAuth("/",
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

      {/* Order details table */}
      <StyledTable>
        <thead>
          <TableRow>
            <TableHeader>STT</TableHeader>
            <TableHeader>Hình ảnh</TableHeader>
            <TableHeader>Sản phẩm</TableHeader>
            <TableHeader>Đơn giá</TableHeader>
            <TableHeader>Số lượng</TableHeader>
            <TableHeader>Thành tiền</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {orderDetailsData?.map((item, index) => (
            <TableRow key={item.id || index}>
              <TableData>{index + 1}</TableData>
              <TableData>
                <ProductImage
                  src={item.images[0]}
                  alt={item.productName || "Product Image"}
                />
              </TableData>
              <TableData>
                <Typography color="primary" fontWeight="bold">
                  {item.productName}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {item.productCategory}
                </Typography>
              </TableData>
              <TableData>{item.unitPrice.toLocaleString()}đ</TableData>
              <TableData>{item.quantity}</TableData>
              <TableData>{item.totalPrice.toLocaleString()}đ</TableData>
            </TableRow>
          ))}
        </tbody>
        {/* Total Price, Shipping, and Payment Status Rows */}
        <tfoot>
          <TotalRow>
            <TableData colSpan={5} style={{ textAlign: "right" }}>
              Tổng tiền
            </TableData>
            <TableData>
              {orderData
                ? orderData.totalAmount.toLocaleString()
                : "loading..."}
              đ
            </TableData>
          </TotalRow>
          <StatusRow>
            <TableData colSpan={5} style={{ textAlign: "right" }}>
              Trạng thái vận chuyển
            </TableData>
            <TableData>
              {orderData
                ? translateOrderStatus(orderData.status)
                : "loading..."}
            </TableData>
          </StatusRow>
          <StatusRow>
            <TableData colSpan={5} style={{ textAlign: "right" }}>
              Trạng thái thanh toán
            </TableData>
            <TableData>
              {orderData
                ? translatePaymentStatus(orderData.paymentStatus)
                : "loading..."}
            </TableData>
          </StatusRow>
        </tfoot>
      </StyledTable>
    </Container>
  );
}

export default OrderDetailsInfo;
