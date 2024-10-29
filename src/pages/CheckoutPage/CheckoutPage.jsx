import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { Logo } from "../../components/NavBar/Logo";
import LocationForm from "../../components/Checkout/LocationForm";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchWithAuth } from "../../utils/authFetch";
import { clearCartCookies } from "../../utils/clearCartCookies";

const CustomButton = styled(Button)({
  backgroundColor: "#338dbc",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#287a9b",
  },
});

const ProductItem = styled(Box)`
  display: flex;
  width: 100%;
  max-width: 418px;
  height: fit-content;
  gap: 20px;
  align-items: center;
`;

const ContainerPaymentMethod = styled(Box)`
  display: flex;
  flex-direction: column;
  max-width: 572px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  height: fit-content;
`;

const ContainerCheckout = styled(Box)`
  display: flex;
  width: 100%;
  height: fit-content;
  gap: 2px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DeliveryInformation = styled(Box)`
  display: flex;
  height: fit-content;
  padding: 56px 20px;
  max-width: 638px;
  width: 100%;
  flex-direction: column;
  gap: 30px;
  margin-left: auto;
  border-right: 2px solid black;
`;

const PaymentInformation = styled(Box)`
  display: flex;
  max-width: 462px;
  width: 100%;
  height: 100%;
  margin-right: auto;
  padding: 56px 20px;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ContainerInput = styled(Box)`
  width: 100%;
  max-width: 572px;
  position: relative;
  height: 43px;
  line-height: 43px;
  display: flex;
  align-items: center;
`;

const CustomLabel = styled(Box)`
  position: absolute;
  font-size: 15px;
  padding: 0 5px;
  margin: 0 5px;
  transition: 0.2s ease;
  background: #ffffff;
  height: 20px;
  display: flex;
  align-items: center;
`;

const CustomInput = styled.input`
  position: absolute;
  width: 100%;
  outline: none;
  font-size: 16px;
  padding: 0 30px;
  line-height: 43px;
  border-radius: 10px;
  transition: 0.2s ease;
  background: transparent;
  border: 1px solid #d9d9d9;
  &:focus {
    border: 2px solid #338dbc;
  }
  &:focus + ${CustomLabel} {
    transform: translate(-3px, -23px) scale(0.88);
    padding: 0 12px;
  }
  &:valid + ${CustomLabel} {
    transform: translate(-3px, -23px) scale(0.88);
    padding: 0 12px;
  }
`;

const CheckoutPage = () => {
  const userData = sessionStorage.getItem("userData");
  const parsedUserData = userData ? JSON.parse(userData) : null;
  const navigate = useNavigate();
  const location = useLocation();
  const { productsWithQuantity } = location.state || {};

  const [products, setProducts] = useState([]);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [locationData, setLocation] = useState({
    city: "",
    district: "",
    ward: "",
  });
  const [errors, setErrors] = useState({});
  const [locationErrors, setLocationErrors] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showBankOptions, setShowBankOptions] = useState(false);
  const [selectedBankOption, setSelectedBankOption] = useState("");

  const fetchProductDetails = async (productIds) => {
    try {
      const response = await axios.get(
        "http://localhost:3001/products/by-ids",
        {
          params: { ids: productIds.join(",") },
        }
      );
      const productsFromAPI = response.data;
      const updatedProducts = productsWithQuantity.map((item) => {
        const product = productsFromAPI.find(
          (prod) => prod.productId === item.productId
        );
        return {
          ...product,
          quantity: item.quantity,
        };
      });

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
  };

  useEffect(() => {
    if (productsWithQuantity && productsWithQuantity.length > 0) {
      const productIds = productsWithQuantity.map((item) => item.productId);
      fetchProductDetails(productIds);
    }
  }, [productsWithQuantity]);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (!fullName) {
      tempErrors["fullName"] = "Họ và tên không được để trống.";
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      tempErrors["phoneNumber"] = "Số điện thoại không hợp lệ.";
      isValid = false;
    }

    if (!address) {
      tempErrors["address"] = "Địa chỉ không được để trống.";
      isValid = false;
    }

    setErrors(tempErrors);

    const locationErrors = {
      city: !locationData.city,
      district: !locationData.district,
      ward: !locationData.ward,
    };
    setLocationErrors(locationErrors);

    return (
      isValid &&
      !locationErrors.city &&
      !locationErrors.district &&
      !locationErrors.ward
    );
  };

  const handlePaymentMethodChange = (e) => {
    const value = e.target.value;
    setSelectedPaymentMethod(value);
    setShowBankOptions(value === "bank");
    console.log("Selected Payment Method:", value); // Log phương thức thanh toán đã chọn
  };

  const handleBankOptionChange = (e) => {
    const value = e.target.value;
    setSelectedBankOption(value);
    console.log("Selected Bank Option:", value); // Log tùy chọn ngân hàng đã chọn
  };

  const handleSubmit = async () => {
    if (handleValidation()) {
      const fullAddress = `${address}, ${locationData.ward}, ${locationData.district}, ${locationData.city}`;

      const orderData = {
        customerName: fullName,
        customerPhone: phoneNumber,
        orderDate: new Date().toISOString(),
        totalAmount: totalAmount,
        shippingAddress: fullAddress,
        paymentMethodName: selectedPaymentMethod,
        products: products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
        })),
      };
      const response = await fetchWithAuth("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const responseData = await response.json();
        const orderId = responseData.orderId;

        if (
          selectedPaymentMethod === "bank" &&
          selectedBankOption === "stripe"
        ) {
          const stripeSession = await fetchWithAuth(
            "http://localhost:3001/stripe/checkout",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                currency: "vnd",
                orderId: orderId,
                products: products.map((product) => ({
                  productName: product.name,
                  unitAmount: Math.round(
                    Math.min(
                      product.discountedPrice || Infinity,
                      product.originalPrice
                    )
                  ),
                  quantity: product.quantity,
                })),
              }),
            }
          );

          const sessionData = await stripeSession.json();
          if (sessionData.url) {
            window.location.href = sessionData.url;
          }
        } else {
          navigate(`/order-success/${orderId}`);
        }
      } else {
        const errorResponse = await response.json();
        console.log("errorResponse", errorResponse);
        alert("Vui lòng đăng nhập để thanh toán!");
      }
    }
  };

  const totalAmount = products.reduce(
    (acc, product) =>
      acc +
      (product.discountedPrice
        ? product.discountedPrice
        : product.originalPrice) *
        product.quantity,
    0
  );

  return (
    <ContainerCheckout>
      <DeliveryInformation>
        <Logo
          width={"165px"}
          url={
            "https://file.hstatic.net/200000837185/file/chu_ki_mail_b62c6cf5ff4e47e39589493faf37dbc4_grande.jpg"
          }
        />
        <Typography variant="h6" fontWeight={600}>
          Thông tin giao hàng
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography color="#737373">{parsedUserData?.fullName}</Typography>
          <Typography color="#737373">({parsedUserData?.email})</Typography>
        </Box>

        {/* Input Họ và tên */}
        <ContainerInput>
          <CustomInput
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <CustomLabel>Họ và tên</CustomLabel>
          {errors.fullName && (
            <Typography
              sx={{
                position: "absolute",
                top: "102%",
                left: "10px",
              }}
              color="error"
              variant="caption"
            >
              Vui lòng nhập họ tên.
            </Typography>
          )}
        </ContainerInput>

        {/* Input Số điện thoại */}
        <ContainerInput>
          <CustomInput
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <CustomLabel>Số điện thoại</CustomLabel>
          {errors.phoneNumber && (
            <Typography
              sx={{
                position: "absolute",
                top: "102%",
                left: "10px",
              }}
              color="error"
              variant="caption"
            >
              Vui lòng nhập số điện thoại.
            </Typography>
          )}
        </ContainerInput>

        {/* Input Địa chỉ */}
        <ContainerInput>
          <CustomInput
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <CustomLabel>Địa chỉ</CustomLabel>
          {errors.address && (
            <Typography
              sx={{
                position: "absolute",
                top: "102%",
                left: "10px",
              }}
              color="error"
              variant="caption"
            >
              Vui lòng nhập địa chỉ.
            </Typography>
          )}
        </ContainerInput>

        {/* Location Form */}
        <LocationForm
          onLocationChange={(newLocation) => setLocation(newLocation)}
          locationErrors={locationErrors}
        />

        <Typography variant="h6" fontWeight={600}>
          Phương thức thanh toán
        </Typography>

        <ContainerPaymentMethod>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={selectedPaymentMethod}
              onChange={handlePaymentMethodChange}
              name="radio-buttons-group"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: " 1px solid #d9d9d9",
                  padding: "18.2px",
                }}
              >
                <FormControlLabel
                  value="cod"
                  sx={{ margin: 0 }}
                  control={<Radio />}
                />
                <img
                  src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=6"
                  alt=""
                />
                <Typography variant="subtitle1" sx={{ marginLeft: "10px" }}>
                  Thanh toán COD (Nhận hàng sau 3-5 ngày)
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: " 1px solid #d9d9d9",
                  padding: "18.2px",
                }}
              >
                <FormControlLabel
                  value="installment"
                  sx={{ margin: 0 }}
                  control={<Radio />}
                />
                <img
                  src="https://hstatic.net/0/0/global/design/seller/image/payment/alepay.svg?v=6"
                  alt=""
                />
                <Typography variant="subtitle1" sx={{ marginLeft: "10px" }}>
                  Trả góp online
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  borderBottom: " 1px solid #d9d9d9",
                  padding: "18.2px",
                }}
              >
                <FormControlLabel
                  value="bank"
                  sx={{ margin: 0 }}
                  control={<Radio />}
                />
                <img
                  src="https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=6"
                  alt="Bank Transfer"
                />
                <Typography variant="subtitle1" sx={{ marginLeft: "10px" }}>
                  Chuyển khoản qua ngân hàng
                </Typography>
              </Box>
            </RadioGroup>

            {showBankOptions && (
              <Box sx={{ paddingLeft: "40px", marginTop: "10px" }}>
                <FormControlLabel
                  value="momo"
                  control={<Radio checked={selectedBankOption === "momo"} />}
                  onChange={handleBankOptionChange}
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src="https://developers.momo.vn/v3/vi/assets/images/square-8c08a00f550e40a2efafea4a005b1232.png"
                        alt="Momo"
                        width="30"
                      />
                      <Typography>Momo</Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  value="stripe"
                  control={<Radio checked={selectedBankOption === "stripe"} />}
                  onChange={handleBankOptionChange}
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src="https://cdn.iconscout.com/icon/free/png-512/free-stripe-logo-icon-download-in-svg-png-gif-file-formats--technology-social-media-vol-6-pack-logos-icons-3030362.png?f=webp&w=256"
                        alt="Stripe"
                        width="30"
                      />
                      <Typography>Stripe</Typography>
                    </Box>
                  }
                />
              </Box>
            )}
          </FormControl>
        </ContainerPaymentMethod>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            color="#338dbc"
            onClick={() => navigate("/cart")}
            sx={{
              transition: "filter 0.3s ease",
              "&:hover": {
                filter: "brightness(1.2)",
                cursor: "pointer",
              },
            }}
          >
            Giỏ hàng
          </Typography>
          <CustomButton variant="contained" onClick={handleSubmit}>
            Hoàn tất đơn hàng
          </CustomButton>
        </Box>
      </DeliveryInformation>

      {/* Order information */}
      <PaymentInformation>
        <Box
          sx={{
            width: "100%",
            borderBottom: "1px solid #d9d9d9",
            paddingBottom: "20px",
          }}
        >
          {products.map((product) => {
            const totalProductPrice =
              (product.discountedPrice
                ? product.discountedPrice
                : product.originalPrice) * product.quantity;

            return (
              <ProductItem key={product.productId}>
                <Box sx={{ height: "64px", minWidth: "64px", width: "64px" }}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <Typography
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      backgroundColor: "gray",
                      color: "white",
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      fontSize: "12px",
                    }}
                  >
                    {product.quantity}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    width: "100%",
                    maxWidth: "234px",
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "red" }}
                >
                  {totalProductPrice.toLocaleString()}₫
                </Typography>
              </ProductItem>
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 0",
            borderBottom: "1px solid #d9d9d9",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Tổng cộng:
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="red">
            {totalAmount.toLocaleString()}₫
          </Typography>
        </Box>
      </PaymentInformation>
    </ContainerCheckout>
  );
};

export default CheckoutPage;
