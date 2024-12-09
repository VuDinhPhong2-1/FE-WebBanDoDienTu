import Cookies from "js-cookie";
import { Box, Typography, Button, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import fetchWithAuth from "../../utils/authFetch";
import { clearCartCookies } from "../../utils/clearCartCookies";
function CartPage({ updateCartCount }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const getCartFromCookie = () => {
    const cartData = Cookies.get("cart");
    return cartData ? JSON.parse(cartData) : [];
  };

  useEffect(() => {
    const savedCart = getCartFromCookie();
    if (savedCart.length > 0) {
      const productIds = savedCart.map((item) => item.id);

      axios
        .get(`http://localhost:3001/products/by-ids`, {
          params: { ids: productIds.join(",") },
        })
        .then((response) => {
          const productsFromAPI = response.data;

          const updatedCart = savedCart.map((item) => {
            const product = productsFromAPI.find(
              (prod) => prod.productId === item.id
            );
            return {
              ...product,
              quantity: item.quantity,
            };
          });
          setCart(updatedCart);
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        });
    }
  }, []);

  const updateCartInCookie = (updatedCart) => {
    Cookies.set("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
    updateCartInCookie(updatedCart);
    updateCartCount();
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    updateCartInCookie(updatedCart);
    updateCartCount();
  };

  const removeProduct = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    updateCartInCookie(updatedCart);
    updateCartCount();
  };

  const totalAmount = cart.reduce(
    (acc, item) =>
      acc +
      (item.discountedPrice
        ? item.discountedPrice * item.quantity
        : item.originalPrice * item.quantity),
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert(
        "Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán."
      );
      return;
    }
  
    try {
      const response = await fetchWithAuth("/login",
        "http://localhost:3001/auths/protected",
        {
          method: "GET",
        }
      );
      if (response.response.ok) {
        const productsWithQuantity = cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        }));
        navigate("/checkout", { state: { productsWithQuantity } });
  
        // clearCartCookies();
        setCart([]);
        updateCartCount();
      } else {
        alert("Bạn cần đăng nhập để thanh toán");
        navigate("/login");
      }
    } catch (error) {
      console.error("Lỗi khi xác thực:", error);
      alert("Đã xảy ra lỗi. Vui lòng đăng nhập lại!");
      navigate("/login");
    }
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          sm: "column",
          lg: "row",
        },
        width: "100%",
        justifyContent: "center",
        height: "fit-content",
        gap: 2,
        background: "#F5F5F5",
      }}
    >
      {/* Container List Products */}
      <Box
        sx={{
          margin: "30px 0",
          maxWidth: "933px",
          width: "100%",
          backgroundColor: "white",
          minHeight: "300px",
          padding: "15px",
          background: "white",
          borderRadius: "5px",
        }}
      >
        {/* Title */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1.5px solid #eee",
            paddingBottom: "15px",
          }}
        >
          <Typography variant="h6" fontWeight={"bold"}>
            Giỏ hàng:
          </Typography>
          <Typography sx={{ textDecoration: "underline" }}>
            {totalItems} sản phẩm
          </Typography>
        </Box>

        {/* List Products */}
        {cart.map((product) => (
          <Box
            key={product.productId}
            sx={{
              display: "flex",
              justifyContent: "space-between", // Đảm bảo spacing giữa thông tin sản phẩm và các nút điều khiển
              marginBottom: "15px",
              borderBottom: "1px solid #eee",
              paddingBottom: "15px",
              marginTop: "15px",
              width: "100%",
              alignItems: "center",
            }}
          >
            {/* Img and information */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                maxWidth: "600px",
                width: "100%",
              }}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <Box sx={{ marginLeft: "15px", width: "100%" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ maxWidth: "400px", width: "100%" }}
                >
                  {product.name}
                </Typography>
                <Typography variant="body2">
                  Giá:{" "}
                  {(product.discountedPrice
                    ? product.discountedPrice
                    : product.originalPrice
                  ).toLocaleString()}
                  ₫
                </Typography>
              </Box>
            </Box>

            {/* Quantity controls and remove */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {/* Quantity controls */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e1e1e1",
                  gap: 2,
                  padding: "5px 0",
                }}
              >
                <IconButton
                  onClick={() => decreaseQuantity(product.productId)}
                  color="black"
                  sx={{ padding: "5px" }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body2">{product.quantity}</Typography>
                <IconButton
                  onClick={() => increaseQuantity(product.productId)}
                  color="black"
                  sx={{ padding: "5px" }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <IconButton
                onClick={() => removeProduct(product.productId)}
                color="black"
                sx={{
                  "&:hover": {
                    background: "white",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            {/* Price */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle2" fontWeight="bold" color="red">
                {(
                  (product.discountedPrice
                    ? product.discountedPrice
                    : product.originalPrice) * product.quantity
                ).toLocaleString()}
                ₫
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Container Price */}
      <Box
        sx={{
          maxWidth: "300px",
          width: "100%",
          background: "white",
          padding: "15px",
          height: "fit-content",
          margin: "30px 0",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", 
          borderRadius: "5px",
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          fontWeight={600}
          paddingBottom="10px"
          sx={{ borderBottom: "1.5px solid #e1e1e1" }}
        >
          Thông tin đơn hàng
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            alignItems: "center",
            borderBottom: "1.5px solid #e1e1e1",
            padding: "15px 0",
          }}
        >
          <Typography variant="body1" fontWeight={600}>
            Tổng tiền:{" "}
          </Typography>
          <Typography
            component="span"
            variant="h6"
            fontWeight="bold"
            color="red"
          >
            {totalAmount.toLocaleString()}₫
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            marginTop: "20px",
            padding: "12px 0",
            fontSize: "16px",
            background: "#161617",
          }}
          onClick={handleCheckout} // Sử dụng hàm điều hướng
        >
          Thanh toán
        </Button>
      </Box>
    </Box>
  );
}

export default CartPage;
