import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { FilterProduct } from "../../components/CategoryPage/FilterProduct";
import { ProductList } from "../../components/CategoryPage/ProductList";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 8;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedCategoryName = encodeURIComponent(categoryName);

        // Fetch child categories
        const categoriesResponse = await fetch(
          `http://localhost:3001/categories/children/${encodedCategoryName}`
        );
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Fetch products based on selected categories
        if (selectedCategories.length > 0) {
          // Encode each category individually
          const selectedCategoriesString = selectedCategories
            .map((category) => encodeURIComponent(category))
            .join(",");

          const productsResponse = await fetch(
            `http://localhost:3001/products/category?name=${selectedCategoriesString}&page=${page}&limit=${limit}`
          );
          const productsData = await productsResponse.json();
          setProducts(productsData);
        } else {
          // Fetch products based on the main category name
          const productsResponse = await fetch(
            `http://localhost:3001/products/category?name=${encodedCategoryName}&page=${page}&limit=${limit}`
          );
          const productsData = await productsResponse.json();
          setProducts(productsData);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [categoryName, selectedCategories, page]);

  // Callback để nhận danh mục được chọn từ FilterProduct
  const handleCategoryChange = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        background: "#F5F5F5",
        gap: 2,
        overflowX: "hidden",
      }}
    >
      {/* Filter products */}
      <FilterProduct
        categories={categories}
        onCategoryChange={handleCategoryChange}
      />
      <ProductList
        categoryName={categoryName}
        categories={categories}
        products={products}
        setPage={setPage}
        page={page}
      />
    </Box>
  );
};

export default CategoryPage;
