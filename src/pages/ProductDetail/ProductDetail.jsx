import {
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Divider,
  Dialog, // Import Dialog
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react"; // Import useState và useEffect

const ProductDetailWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  align-items: center;
  background: #f5f5f5;
`;

const ProductDetailContainer = styled(Box)`
  display: flex;
  max-width: 1250px;
  width: 100%;
  height: fit-content;
  margin-top: 45px;
  margin-bottom: 45px;
  flex-direction: column;
`;

export const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `http://localhost:3001/products/${productId}`
      );
      const data = await response.json();
      setProduct(data);
    };
    fetchProduct();
  }, [productId]);

  // Handle image switching
  const handleNextImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePreviousImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Handle opening and closing the dialog
  const handleImageClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <ProductDetailWrapper>
      <ProductDetailContainer>
        <Grid container sx={{ paddingBottom: "45px", background: "white" }}>
          {/* First Grid for image display */}
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            sx={{
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyItems: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {/* Mũi tên trái */}
                <IconButton
                  onClick={handlePreviousImage}
                  sx={{
                    position: "absolute",
                    left: -8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                  }}
                >
                  <ArrowBackIosIcon />
                </IconButton>

                <img
                  src={product.images[currentImageIndex].imageUrl} // Hình ảnh hiện tại
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    width: "600px",
                    height: "auto",
                    objectFit: "contain", // Đảm bảo hình ảnh không bị méo
                    cursor: "pointer", // Thêm con trỏ pointer
                  }}
                  onClick={handleImageClick} // Mở dialog khi click
                />

                {/* Mũi tên phải */}
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: "absolute",
                    right: -8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>

              {/* Danh sách hình ảnh nhỏ phía dưới */}
              <Box
                sx={{
                  display: {
                    xs: "none", // Ẩn khi kích thước màn hình nhỏ hơn `sm`
                    sm: "flex", // Hiển thị từ `sm` trở lên
                  },
                  justifyContent: "center",
                  marginTop: "15px",
                }}
              >
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.imageUrl}
                    alt={`thumbnail-${index}`}
                    onClick={() => handleThumbnailClick(index)}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      margin: "0 10px",
                      border:
                        currentImageIndex === index
                          ? "1px solid black"
                          : "1px solid transparent",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Second Grid for product info */}
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              background: "white",
              paddingLeft: "15px",
              paddingTop: "15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "fit-content",
              }}
            >
              {/* Name product */}
              <Typography variant="h5" fontWeight={"bold"}>
                {product.name}
              </Typography>

              <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
                <Typography variant="subtitle1">
                  Thương hiệu:{" "}
                  <Typography
                    component="span" // Dùng span để không tạo ra block mới
                    sx={{ color: "red" }} // Đặt màu đỏ
                    fontWeight={"bold"}
                  >
                    {product.brandName.name}
                  </Typography>
                </Typography>
                <Divider orientation="vertical" flexItem />
                <Typography variant="subtitle1">
                  Loại:{" "}
                  <Typography
                    component="span" // Dùng span để không tạo ra block mới
                    sx={{ color: "red" }} // Đặt màu đỏ
                    fontWeight={"bold"}
                  >
                    {product.categories[0].name}{" "}
                  </Typography>
                </Typography>
              </Box>
              {/* Hiển thị giá, nếu có giảm giá thì hiển thị cả giá gốc */}
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                {product.discountedPrice < product.originalPrice && (
                  <Typography
                    variant="h6"
                    sx={{ marginTop: 1, fontWeight: 600, color: "red" }}
                  >
                    {product.discountedPrice.toLocaleString()}₫
                  </Typography>
                )}
                <Divider orientation="vertical" flexItem />
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: 1,
                    textDecoration:
                      product.discountedPrice < product.originalPrice
                        ? "line-through"
                        : "none",
                  }}
                >
                  {product.originalPrice.toLocaleString()}₫
                </Typography>
              </Box>

              {/* Số lượng sản phẩm */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "15px",
                  border: "1px solid #e1e1e1",
                  width: "fit-content",
                }}
              >
                <IconButton
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1} // Không cho phép giảm dưới 1
                  sx={{ margin: "0 10px", "&:hover": { background: "none" } }}
                >
                  -
                </IconButton>
                <Typography variant="subtitle1">{quantity}</Typography>
                <IconButton
                  onClick={increaseQuantity}
                  sx={{ margin: "0 10px", "&:hover": { background: "none" } }}
                >
                  +
                </IconButton>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  gap: 2,
                  marginTop: "30px",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    background: "#d0021b",
                    color: "white",
                    padding: "0 5px",
                    alignContent: "center",
                    borderRadius: "5px",
                  }}
                >
                  Đã bao gồm VAT
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    background: "#d0021b",
                    color: "white",
                    padding: "0 5px",
                    alignContent: "center",
                    borderRadius: "5px",
                  }}
                >
                  Bảo hành 24 tháng chính hãng.
                </Typography>
              </Box>
              <Button
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  border: "5px",
                  background: "#D0021B",
                  color: "white",
                  marginTop: "30px",
                  gap: 1,
                }}
              >
                <Typography
                  sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                >
                  Thêm vào giỏ hàng
                </Typography>
                <Typography variant="subtitle2">
                  Giao Tận Nơi Nhận Tại Cửa Hàng
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Dialog hiển thị hình ảnh lớn */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
          <img
            src={product.images[currentImageIndex].imageUrl}
            alt={product.name}
            style={{ width: "100%", height: "auto" }}
          />
        </Dialog>
        <Box sx={{ width: "" }}></Box>

        {/* Description */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "fit-content",
            background: "white",
            marginTop: "30px",
            flexDirection: "column",
            wordBreak: "break-all", // Tự động xuống dòng nếu vượt quá chiều rộng
            paddingLeft: "20px", // Đảm bảo có khoảng cách bên trái
            listStylePosition: "inside", // Đảm bảo chấm đầu dòng nằm bên trong
          }}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              padding: "15px",
            }}
          >
            Mô tả sản phẩm
          </Typography>
          <ul dangerouslySetInnerHTML={{ __html: product.description }} />
        </Box>
      </ProductDetailContainer>
    </ProductDetailWrapper>
  );
};
