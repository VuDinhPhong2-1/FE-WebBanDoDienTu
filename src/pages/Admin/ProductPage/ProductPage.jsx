import { useEffect, useState } from "react";
import ProductTableControls from "../../../components/Admin/ProductPage/ProductTableControls/ProductTableControls";
import "./ProductPage.css";
import fetchWithAuth from "../../../utils/authFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

function ProductPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const { data } = await fetchWithAuth(
        "/login",
        "http://localhost:3001/categories",
        {
          method: "GET",
        }
      );
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <main className="product-page-container">
      <section className="title">
        <FontAwesomeIcon icon={faProductHunt} />
        <a href="/admin/products">Products List</a>
      </section>
      <div className="product-page-title"> Filters</div>
      <div className="filter-container">
        <div className="filter-by-category">
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select Category</option>
            {categories.map((value, index) => (
              <option value={value.name} key={index}>
                {value.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="list-products">
        <ProductTableControls categoryName={selectedCategory} />
      </div>
    </main>
  );
}

export default ProductPage;
