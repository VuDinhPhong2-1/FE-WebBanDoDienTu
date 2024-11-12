import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import fetchWithAuth from "../../utils/authFetch";

const CustomButton = styled(Button)({
  backgroundColor: "#338dbc",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#287a9b",
  },
});

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f8f8f8;
`;

const SuccessHeader = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const OrderDetails = styled(Box)`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

const ThankYouImage = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const ProductSummary = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

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

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({
    orderDetails: [],
    totalAmount: 0,
    order: {},
  });

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const { response, data } = await fetchWithAuth("/login",
          `http://localhost:3001/orders/details/${orderId}`,
          {
            method: "GET",
          }
        );

        if (response.ok) {
          setOrderData(data);
        } else {
          console.log("Có lỗi xảy ra khi lấy chi tiết đơn hàng");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    if (orderId) {
      fetchOrderData();
    }
  }, [orderId]);

  if (!orderData) {
    return <Typography>Loading...</Typography>;
  }
  const totalPrice = () => {
    if (
      orderData.orderDetails &&
      orderData.orderDetails.orderDetails &&
      orderData.orderDetails.orderDetails.length > 0
    ) {
      const sumPrice = orderData.orderDetails.orderDetails.reduce(
        (acc, item) => {
          return (
            acc +
            (item.unitPrice < item.totalPrice
              ? item.unitPrice
              : item.totalPrice)
          );
        },
        0
      );

      return sumPrice;
    }

    return 0;
  };

  return (
    <Container>
      <SuccessHeader>
        <ThankYouImage
          src="https://file.hstatic.net/200000837185/file/chu_ki_mail_b62c6cf5ff4e47e39589493faf37dbc4_grande.jpg"
          alt="Thank You"
        />
        <Typography variant="h5" fontWeight={600} align="center" gutterBottom>
          Đặt hàng thành công
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Mã đơn hàng #{orderData?.order?.orderId || "Không có mã đơn hàng"}
        </Typography>
        <Typography variant="subtitle2" align="center">
          Cảm ơn bạn đã mua hàng!
        </Typography>
      </SuccessHeader>

      <OrderDetails>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Thông tin đơn hàng
        </Typography>
        <Typography variant="body1">
          Tên người nhận: {orderData?.order.customerName || "Đang cập nhật..."}
        </Typography>
        <Typography variant="body1">
          Số điện thoại người nhận:{" "}
          {orderData?.order.customerPhone || "Đang cập nhật..."}
        </Typography>
        <Typography variant="body1">
          Địa chỉ giao hàng:{" "}
          {orderData?.order?.shippingAddress || "Đang cập nhật..."}
        </Typography>
        <Typography variant="body1">
          Phương thức thanh toán:{" "}
          {orderData?.paymentMethodDescription || "Đang cập nhật..."}
        </Typography>
        <Typography variant="body1">
          Trạng thái đơn hàng:{" "}
          {translateOrderStatus(orderData?.order.status) || "Đang cập nhật..."}
        </Typography>
        <Typography variant="body1">
          Thanh toán đơn hàng:{" "}
          {translatePaymentStatus(orderData?.order.paymentStatus) ||
            "Đang cập nhật..."}
        </Typography>
      </OrderDetails>
      <OrderDetails>
        {orderData.orderDetails &&
        orderData.orderDetails.orderDetails &&
        orderData.orderDetails.orderDetails.length > 0 ? (
          orderData.orderDetails.orderDetails.map((item, index) => (
            <ProductSummary key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Hiển thị hình ảnh sản phẩm nếu có */}
                {item.images && item.images.length > 0 && (
                  <img
                    src={item.images[0]}  
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                )}
                <Typography variant="body1">
                  {item.name || "Sản phẩm không xác định"}
                </Typography>
              </Box>
              <Typography variant="body1" fontWeight={600} color="red">
                {item.unitPrice ? item.unitPrice.toLocaleString() : "0"}₫
              </Typography>
            </ProductSummary>
          ))
        ) : (
          <Typography>Không có sản phẩm nào trong đơn hàng.</Typography>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "16px 0",
          }}
        >
          <Typography
            variant="body1"
            fontWeight={600}
            color="black"
            sx={{ textAlign: "center" }}
          >
            Tổng cộng:
          </Typography>
          <Typography
            variant="body1"
            fontWeight={600}
            color="red"
            sx={{ textAlign: "center" }}
          >
            {totalPrice().toLocaleString() || "0"}₫
          </Typography>
        </Box>
        <CustomButton
          variant="contained"
          fullWidth
          onClick={() => navigate("/")}
        >
          Tiếp tục mua hàng
        </CustomButton>
      </OrderDetails>
    </Container>
  );
};

export default OrderSuccessPage;
