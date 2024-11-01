import { Box, Typography, Grid, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled components
const ProductListWrapper = styled(Box)`
  width: 100%;
  max-width: 960px;
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

const ProductItem = styled(Box)`
  max-width: 232px;
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  border: 1px solid #ededed;
  height: 100%;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }
`;

// Component ProductList
export const ProductList = ({
  categoryName,
  categories,
  products,
  setPage,
  page,
}) => {
  const navigate = useNavigate();

  return (
    <ProductListWrapper>
      {/* Tiêu đề và danh mục */}
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
          {categoryName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            maxWidth: "1000px",
            gap: 1,
            overflowX: "auto",
            whiteSpace: "nowrap",
            "&:hover::-webkit-scrollbar-thumb": {
              backgroundColor: "red",
            },
          }}
        >
          {categories?.length > 0 &&
            categories.map((item) => (
              <ItemCategory key={item.categoryId}>{item.name}</ItemCategory>
            ))}
        </Box>
      </Box>
      {/* Danh sách sản phẩm */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {products.products?.length > 0 ? (
          products.products.map((product) => (
            <Grid item xs={6} sm={4} md={3} lg={3} key={product.productId}>
              <ProductItem
                onClick={() => navigate(`/product/${product.productId}`)}
              >
                <img
                  src={product.images[0]}
                  alt={product.productId}
                  style={{ width: "100%", height: "auto" }}
                  onMouseEnter={(e) => {
                    if (product.images.length > 1) {
                      e.currentTarget.src = product.images[1];
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.src = product.images[0];
                  }}
                />
                <Typography
                  variant="overline"
                  sx={{
                    marginTop: 2,
                    color: "black",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {product.name}
                </Typography>

                {/* Hiển thị giá và giảm giá */}
                <Box sx={{ display: "flex", gap: 2 }}>
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
                          : "none",
                    }}
                  >
                    {product.originalPrice.toLocaleString()}₫
                  </Typography>
                </Box>
              </ProductItem>
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            sx={{ margin: "auto", marginTop: 4, color: "gray" }}
          >
            Không còn sản phẩm nào
          </Typography>
        )}
      </Grid>

      {/* Nút phân trang */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
          width: "100%",
          height: "fit-content",
        }}
      >
        <Pagination
          count={products.totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </ProductListWrapper>
  );
};
