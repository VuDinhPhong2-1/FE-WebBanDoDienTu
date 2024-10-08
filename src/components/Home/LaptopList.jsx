import { Box, Typography, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
const ListLaptopWrapper = styled(Box)`
  width: 1220px;
  padding: 15px;
  background: white;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin: 24px 0 0 0;
  border-radius: 5px;
`;

const ItemCategory = styled(Typography)`
  width: fit-content;
  height: fit-content;
  background: #ededed;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #d91e1e;
  }
`;

// Điều chỉnh để đảm bảo các item có chiều cao bằng nhau
const ItemLaptop = styled(Box)`
  width: 232px;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid #ededed;
  height: 100%; /* Đảm bảo các item có chiều cao đầy đủ */
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }
`;
export const LaptopList = () => {
  const [laptopProduct, setLaptopProduct] = useState([]);
  console.log("🚀 ~ LaptopList ~ laptopProduct:", laptopProduct);
  const [categoriesProduct, setCategoriesProduct] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesLevel2 = await fetch(
          "http://localhost:3001/categories/Laptop/children"
        );

        if (!categoriesLevel2.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await categoriesLevel2.json();
        setCategoriesProduct(data);

        const products = await fetch(
          "http://localhost:3001/products/category/laptop"
        );

        if (!products.ok) {
          throw new Error("Network response was not ok");
        }
        const data2 = await products.json();
        setLaptopProduct(data2);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <ListLaptopWrapper>
      {/* Title Laptop and categories */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "fit-content",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textTransform: "uppercase",
            fontWeight: 600,
            letterSpacing: "2px",
            width: "fit-content",
            height: "fit-content",
            paddingLeft: "12px",
            borderLeft: "3px solid",
          }}
        >
          Laptop
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "fit-content",
            gap: 1,
          }}
        >
          {categoriesProduct?.length > 0 &&
            categoriesProduct.map((item) => (
              <ItemCategory key={item.categoryId}>{item.name}</ItemCategory>
            ))}
        </Box>
      </Box>

      {/* List Laptop */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {/* Giới hạn hiển thị 10 sản phẩm */}
        {laptopProduct.slice(0, 10).map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={product.productId}>
            <ItemLaptop>
              <img
                src={product.avatarUrl}
                alt={product.productId}
                style={{ width: "100%", height: "auto" }}
              />
              <Typography
                variant="overline"
                sx={{
                  marginTop: 2,
                  color: "black",
                  display: "-webkit-box",
                  WebkitLineClamp: 2, // Giới hạn 2 dòng
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {product.name}
              </Typography>

              {/* Hiển thị giá, nếu có giảm giá thì hiển thị cả giá gốc */}
              <Box sx={{ display: "flex", gap: 2 }}>
                {/* Nếu có giá giảm */}
                {product.discountedPrice < product.originalPrice && (
                  <Typography
                    variant="h6"
                    sx={{ marginTop: 1, fontWeight: 600, color: "red" }}
                  >
                    {product.discountedPrice.toLocaleString()}₫
                  </Typography>
                )}
                <Typography
                  variant="overline"
                  sx={{
                    marginTop: 1,
                    textDecoration:
                      product.discountedPrice < product.originalPrice
                        ? "line-through"
                        : "none", // Nếu có giá giảm thì gạch giá gốc
                  }}
                >
                  {product.originalPrice.toLocaleString()}₫
                </Typography>
              </Box>
            </ItemLaptop>
          </Grid>
        ))}
      </Grid>

      {/* Button "Xem tất cả" */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
          width: "100%",
          height: "fit-content",
        }}
      >
        <Button
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            backgroundColor: "#d91e1e",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            minWidth: "200px",
            "&:hover": {
              backgroundColor: "#c41b1b",
            },
          }}
          onClick={() => {
            console.log("Xem tất cả sản phẩm");
          }}
        >
          Xem tất cả
          <KeyboardDoubleArrowRightIcon sx={{ fontSize: "small" }} />
        </Button>
      </Box>
    </ListLaptopWrapper>
  );
};
