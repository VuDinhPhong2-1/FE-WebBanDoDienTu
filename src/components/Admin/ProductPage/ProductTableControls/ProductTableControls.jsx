import React, { useEffect, useState } from "react";
import "./ProductTableControls.css";
import fetchWithAuth from "../../../../utils/authFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

function ProductTableControls({ categoryName }) {
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigation = useNavigate();
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    if (debouncedValue) {
      setCurrentPage(1);
    }
    fetchProducts();
  }, [categoryName, debouncedValue, currentPage]);

  async function fetchProducts() {
    try {
      let url = "http://localhost:3001/products/admin/find-all";
      const params = new URLSearchParams();

      params.append("page", currentPage);
      if (categoryName) {
        params.append("categoryName", categoryName);
      }
      if (debouncedValue) {
        params.append("productName", debouncedValue);
      }

      const fullUrl = `${url}?${params.toString()}`;
      const { data } = await fetchWithAuth("/login", fullUrl, {
        method: "GET",
      });

      if (data.result) {
        setProducts(data.result);
        setTotalPages(data.totalPages);
      } else {
        throw new Error("Invalid product data.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Unable to fetch product data.");
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="product-table-controls">
      <div className="search-container">
        <input
          type="text"
          placeholder="Nhập tên sản phẩm"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={() => navigation("/admin/products/create")}>
          THÊM MỚI
        </button>
      </div>

      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Discount Price</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                Không có sản phẩm nào.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.productId}>
                <td>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.discountedPrice.toLocaleString()}₫</td>
                <td>{product.originalPrice.toLocaleString()}₫</td>
                <td>
                  <div
                    className="button"
                    onClick={() =>
                      navigation(`/admin/products/edit/${product.productId}`)
                    }
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductTableControls;
