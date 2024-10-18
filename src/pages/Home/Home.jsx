import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { ProductSlider } from "../../components/Home/Slider";
import { ProductList } from "../../components/Home/ProductList";

export const Home = () => {
  const [laptopProducts, setLaptopProducts] = useState([]);
  const [pcProducts, setPCProducts] = useState([]);
  const [screenProducts, setScreenProducts] = useState([]);
  const [laptopCategories, setLaptopCategories] = useState([]);
  const [pcCategories, setPCCategories] = useState([]);
  const [screenCategories, setScreenCategories] = useState([]);

  // Call API for laptops
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Laptops
        const laptopCategoriesResponse = await fetch(
          "http://localhost:3001/categories/children/Laptop"
        );
        const laptopCategoriesData = await laptopCategoriesResponse.json();

        setLaptopCategories(laptopCategoriesData);

        const laptopProductsResponse = await fetch(
          `http://localhost:3001/products/category?name=laptop&page=${page}&limit=${limit}`
        );
        const laptopProductsData = await laptopProductsResponse.json();
        setLaptopProducts(laptopProductsData);

        // PCs
        const pcCategoriesResponse = await fetch(
          `http://localhost:3001/categories/children/pc`
        );
        const pcCategoriesData = await pcCategoriesResponse.json();
        setPCCategories(pcCategoriesData);

        const pcProductsResponse = await fetch(
          `http://localhost:3001/products/category?name=pc&page=${page}&limit=${limit}`
        );
        const pcProductsData = await pcProductsResponse.json();
        setPCProducts(pcProductsData);

        // Screens
        const screenCategoriesResponse = await fetch(
          `http://localhost:3001/categories/children/Màn hình`
        );
        const screenCategoriesData = await screenCategoriesResponse.json();
        setScreenCategories(screenCategoriesData);

        const screenProductsResponse = await fetch(
          `http://localhost:3001/products/category?name=Màn hình&page=${page}&limit=${limit}`
        );
        const screenProductsData = await screenProductsResponse.json();
        setScreenProducts(screenProductsData);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const limit = 10;
  const page = 1;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "fit-content",
        background: "#F5F5F5",
        alignItems: "center",
        width: "100%",
        paddingBottom: "50px",
      }}
    >
      {/* Slider */}
      <ProductSlider />

      {/* Laptop List */}
      <ProductList
        categoryName="Laptop"
        categories={laptopCategories}
        products={laptopProducts}
      />

      {/* Screen List */}
      <ProductList
        categoryName="Màn hình"
        categories={screenCategories}
        products={screenProducts}
      />

      {/* PC Gaming List */}
      <ProductList
        categoryName="PC Gaming"
        categories={pcCategories}
        products={pcProducts}
      />
    </Box>
  );
};
