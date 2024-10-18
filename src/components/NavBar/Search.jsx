import { Box, IconButton, Typography } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Lấy hàm điều hướng
  const searchRef = useRef(null); // Tạo ref cho thành phần tìm kiếm

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const performSearch = async () => {
    if (searchValue.trim() !== "") {
      try {
        const response = await fetch(
          `http://localhost:3001/products/search-by-name?name=${encodeURIComponent(
            searchValue
          )}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  const handleButtonClick = () => {
    performSearch();
  };

  const handleProductClick = (product) => {
    console.log("Product clicked:", product); // In ra thông tin sản phẩm
    navigate(`/product/${product.productId}`); // Điều hướng đến trang chi tiết sản phẩm
    setShowDropdown(false); // Ẩn dropdown sau khi điều hướng
  };

  // Sử dụng useEffect để lắng nghe các cú nhấp chuột bên ngoài thành phần tìm kiếm
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box
      ref={searchRef} // Gắn ref vào thành phần tìm kiếm
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "427px",
      }}
    >
      {/* Backdrop khi dropdown mở */}
      {showDropdown && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
          onClick={() => setShowDropdown(false)}
        />
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          background: "white",
          padding: "0 3px",
          borderRadius: "4px",
          position: "relative",
          zIndex: 2, // Đảm bảo ô input nằm trên backdrop
        }}
      >
        <input
          value={searchValue}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          style={{
            height: "40px",
            padding: "0px 10px",
            boxSizing: "border-box",
            borderRadius: "4px 0 0 4px", // Bo tròn góc trái
            border: "1px solid white",
            backgroundColor: "#f5f5f5",
            outline: "none",
            width: "100%",
            background: "white",
          }}
        />
        <IconButton
          onClick={handleButtonClick}
          sx={{
            height: "36px",
            width: "60px",
            background: "red",
            color: "white",
            borderRadius: "4px",
            "&:hover": {
              background: "darkred",
            },
          }}
        >
          <FaSearch />
        </IconButton>
      </Box>

      {/* Dropdown search */}
      <Box
        className="drop-down-search"
        sx={{
          display: showDropdown && products.length > 0 ? "flex" : "none",
          flexDirection: "column",
          width: "100%",
          maxHeight: "300px",
          position: "absolute",
          top: "100%",
          zIndex: 3, // Đảm bảo dropdown nằm trên backdrop
          height: "auto",
          overflowY: "auto",
          background: "white",
          paddingBottom: "24px",
          borderRadius: "0 0 4px 4px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Thêm bóng đổ để nổi bật
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{
            color: "black",
            textAlign: "center",
            textTransform: "uppercase",
            padding: "10px 0",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          Kết quả tìm kiếm
        </Typography>
        {products.map((product, index) => (
          <Box
            onClick={() => handleProductClick(product)} // Gọi hàm khi nhấp vào sản phẩm
            key={index}
            sx={{
              display: "flex",
              padding: "10px",
              borderBottom: "1px solid #e0e0e0",
              backgroundColor: "#fff",
              cursor: "pointer",
              color: "black",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <img
              src={product.images[0]}
              alt={product.productId}
              style={{
                width: "90px",
                height: "80px",
                borderRadius: "4px",
                marginRight: "10px",
              }}
              onMouseEnter={(e) => {
                if (product.images.length > 1) {
                  e.currentTarget.src = product.images[1];
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.src = product.images[0];
              }}
            />
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              {/* Name */}
              <Typography
                variant="subtitle2"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  fontSize: {
                    xs: "12px", // Kích thước màn hình nhỏ (mobile)
                    sm: "14px", // Kích thước màn hình trung bình (tablet)
                    md: "16px", // Kích thước
                  },
                }}
              >
                {product.name.length > 60
                  ? product.name.substring(0, 60) + "..."
                  : product.name}
              </Typography>
              {/* Price */}
              <Box sx={{ display: "flex", gap: 2, marginTop: 1,alignItems: "center" }}>
                {product.discountedPrice < product.originalPrice && (
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      textAlign: "center",
                      color: "red",
                      fontSize: {
                        xs: "10px", // Kích thước màn hình nhỏ (mobile)
                        sm: "12px", // Kích thước màn hình trung bình (tablet)
                        md: "14px", // Kích thước màn hình lớn (desktop)
                        lg: "16px", // Màn hình rất lớn
                      },
                    }}
                  >
                    {product.discountedPrice.toLocaleString()}₫
                  </Typography>
                )}
                <Typography
                  variant="overline"
                  sx={{
                    textDecoration:
                      product.discountedPrice < product.originalPrice
                        ? "line-through"
                        : "none",
                    fontSize: {
                      xs: "10px", // Kích thước màn hình nhỏ (mobile)
                      sm: "12px", // Kích thước màn hình trung bình (tablet)
                      md: "14px", // Kích thước màn hình lớn (desktop)
                      lg: "16px", // Màn hình rất lớn
                    },
                    textJustify: "center",
                  }}
                >
                  {product.originalPrice.toLocaleString()}₫
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
