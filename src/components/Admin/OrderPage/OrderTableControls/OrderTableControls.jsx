import React, { useEffect, useState } from "react";
import "./OrderTableControls.css";
import fetchWithAuth from "../../../../utils/authFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function OrderTableControls() {
  const [orders, setOrders] = useState([]);
  const [inputValue, setInputValue] = useState(""); // For searching orders by ID
  const [debouncedValue, setDebouncedValue] = useState(""); // Debounced search value
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigation = useNavigate();
  const [selectStatus, setSelectStatus] = useState("");

  // Debounce input value to avoid sending too many requests
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue); // Set debounced value
    }, 500);

    return () => {
      clearTimeout(handler); // Clean up timeout on re-render
    };
  }, [inputValue]);

  // Fetch orders when debounced value or page changes
  useEffect(() => {
    fetchOrders();
  }, [debouncedValue, currentPage]);

  async function fetchOrders() {
    try {
      let url = "http://localhost:3001/orders/";
      const params = new URLSearchParams();

      params.append(
        "page",
        debouncedValue && !isNaN(debouncedValue) ? 1 : currentPage
      );

      if (debouncedValue && !isNaN(debouncedValue)) {
        params.append("orderId", debouncedValue); // Gửi orderId nếu là số hợp lệ
      }

      const fullUrl = `${url}?${params.toString()}`;
      console.log("Full URL:", fullUrl);

      const { data } = await fetchWithAuth("/login", fullUrl, {
        method: "GET",
      });

      if (data) {
        setOrders(data.result);
        setTotalPages(data.totalPages);
      } else {
        setError("Không tìm thấy đơn hàng hoặc dữ liệu không hợp lệ.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      const errorMessage = error.message || "Lỗi không xác định";
      setError(`Không thể tải dữ liệu: ${errorMessage}`);
    }
  }

  // Handle input changes for search
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Change page based on user interaction
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  async function handleStatusChange(orderId) {
    let url = `http://localhost:3001/orders/${orderId}`;
    try {
      const token = localStorage.getItem("access_token");

      await toast.promise(
        axios.patch(
          url,
          { status: selectStatus },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        {
          pending: "Submitting your order edit...",
          success: "Order updated successfully!",
          error: {
            render({ data }) {
              const message =
                data.response?.data?.message || "Failed to update order.";
              return message;
            },
          },
        },
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
      // Cập nhật trạng thái đơn hàng sau khi thành công
    } catch (error) {
      console.error("Error updating shipping address:", error);
      // Toast đã hiển thị lỗi qua toast.promise
    }
  }
  return (
    <div className="order-table-controls">
      <div className="search-container">
        <input
          type="text"
          placeholder="Nhập mã đơn hàng"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      <table>
        <thead>
          <tr>
            <th>ORDER</th>
            <th>DATE</th>
            <th>CUSTOMER</th>
            <th>PAYMENT</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                Không có sản phẩm nào.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.orderDate}</td>
                <td>{order.customerName}</td>
                <td>{order.paymentStatus}</td>
                <td>{order.status}</td>
                <td>
                  <div
                    className="button"
                    onClick={() =>
                      navigation(`/admin/orders/edit/${order.orderId}`)
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

export default OrderTableControls;
