import { useParams } from "react-router-dom";
import fetchWithAuth from "../../../utils/authFetch";
import { useEffect, useRef, useState } from "react";
import "./EditOrderPage.css";
import Dialog from "../../../components/Dialog/Dialog";
import { toast, ToastContainer } from "react-toastify";
import { OrderStatus } from "../../../constants/OrderStatus";
import axios from "axios";

function EditOrderPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [orderDetailsData, setOrderDetailsData] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const dialogRef = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  function toggleDialog() {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  }
  useEffect(() => {
    fetchOrder();
    fetchDetailsOrders();
  }, [orderId]);

  useEffect(() => {
    if (order && order.userId) {
      fetchUser(order.userId);
    }
  }, [order]); // Fetch user only after the order is fetched
  async function handleUpdateOrderStatus() {
    let url = `http://localhost:3001/orders/${orderId}`;
    try {
      const token = localStorage.getItem("access_token");
      console.log("selectedStatus", selectedStatus);
      await toast.promise(
        axios.patch(
          url,
          { status: selectedStatus },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        {
          pending: "Updating order status...",
          success: "Order status updated successfully!",
          error: {
            render({ data }) {
              const message =
                data.response?.data?.message ||
                "Failed to update order status.";
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
      setOrder({ ...order, status: selectedStatus });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  }

  async function fetchDetailsOrders() {
    const { data: fetchedOrderDetailsData } = await fetchWithAuth(
      "/",
      `http://localhost:3001/order-details/${orderId}`,
      { method: "GET" }
    );
    console.log("Details Order", fetchedOrderDetailsData);
    setOrderDetailsData(fetchedOrderDetailsData);
  }

  async function fetchOrder() {
    let url = `http://localhost:3001/orders/${orderId}`;
    const { data } = await fetchWithAuth("/login", url, {
      method: "GET",
    });
    setOrder(data);
    setSelectedStatus(data.status);
    setShippingAddress(data.shippingAddress);
    console.log("order", data);
  }

  async function fetchUser(userId) {
    let url = `http://localhost:3001/users/${userId}`;
    const { data } = await fetchWithAuth("/login", url, {
      method: "GET",
    });
    setUser(data);
    console.log(" user", data);
  }

  if (!order || !orderDetailsData || !user) {
    return <div>Loading...</div>;
  }
  async function handlePatchOrderAddress() {
    let url = `http://localhost:3001/orders/${orderId}`;
    try {
      const token = localStorage.getItem("access_token");

      await toast.promise(
        axios.patch(
          url,
          { shippingAddress: shippingAddress },
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
      setOrder({ ...order, shippingAddress });
      toggleDialog();
    } catch (error) {
      console.error("Error updating shipping address:", error);
      // Toast đã hiển thị lỗi qua toast.promise
    }
  }

  const shippingStatusClass = (() => {
    switch (order.status) {
      case "Pending":
        return "red";
      case "Processing":
        return "yellow";
      case "Shipped":
        return "blue";
      case "Delivered":
        return "green";
      default:
        return "red";
    }
  })();

  const paymentStatusClass = order.paymentStatus === "paid" ? "green" : "red";

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <main>
        <div className="container">
          <div className="left-column">
            <div className="container-title">
              <div className="title">Order #{orderId}</div>
              <div className={`shipping-status ${shippingStatusClass}`}>
                {order.status}
              </div>
              <div className={`shipping-status ${paymentStatusClass}`}>
                {order.paymentStatus}
              </div>
            </div>
            <div className="order-date">{order.orderDate}</div>
            <div className="order-details">
              <table>
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QTY</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetailsData?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <img src={item.images[0]} alt="" />
                      </td>
                      <td>{item.unitPrice.toLocaleString()}đ</td>
                      <td>{item.quantity}</td>
                      <td>{item.totalPrice.toLocaleString()}đ</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} style={{ textAlign: "right" }}>
                      Subtotal
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {order.totalAmount
                        ? order.totalAmount.toLocaleString()
                        : "loading..."}
                      đ
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="right-column">
            <div className="customer-details">
              <div className="customer-title">Customer details</div>
              <div className="customer-info">
                <div className="avatar">
                  <img
                    src={
                      user.user?.profilePicture ||
                      "https://res.cloudinary.com/dk0lhapty/image/upload/v1732516783/uploads/gtbi5hgubp5r6gyfbdhy.png"
                    }
                    alt="avatar"
                  />
                </div>
                <div className="info">
                  <div className="name">
                    {order.customerName || "Loading..."}
                  </div>
                  <div className="customer-id">
                    Customer ID:#{user.user?.userId || "loading..."}
                  </div>
                </div>
              </div>
              <div className="contact-title">Contact info </div>
              <div className="email">
                Email: {user.user?.email || "loading..."}
              </div>
              <div className="phone-number">
                Mobile: {order.customerPhone || "loading..."}
              </div>
            </div>
            <div className="shipping-address">
              <div className="shipping-address-title">
                Shipping Address{" "}
                <p
                  onClick={() => {
                    toggleDialog();
                  }}
                >
                  Edit
                </p>
              </div>
              <div className="address">{order.shippingAddress}</div>
              <Dialog toggleDialog={toggleDialog} ref={dialogRef}>
                <div
                  style={{
                    background: "#35354E",
                    width: "500px",
                    height: "200px",
                    borderRadius: "5px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h2
                    style={{
                      fontWeight: "normal",
                      textAlign: "center",
                      color: "#eee",
                    }}
                  >
                    Edit Address Shipping
                  </h2>
                  <input
                    style={{ marginTop: "20px" }}
                    type="text"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                  />

                  <button
                    style={{
                      height: "40px",
                      padding: "0 20px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#5e61e5",
                      color: "#fff",
                      cursor: "pointer",
                      transition: " background-color 0.3s ease",

                      "&:hover": {
                        backgroundColor: "#6b6beb",
                      },

                      "&::before": {
                        content: "+",
                        marginRight: "5px",
                      },
                    }}
                    onClick={handlePatchOrderAddress}
                  >
                    Submit
                  </button>
                </div>
              </Dialog>
            </div>
            <div className="shipping-status-container">
              <div className="shipping-status-title">Shipping Status</div>
              <div className="select-status">
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value); // Cập nhật trạng thái được chọn
                  }}
                  id="shipping-status"
                  required
                >
                  <option value="">Select Status</option>
                  {OrderStatus.map((status, index) => (
                    <option value={status.key} key={index}>
                      {status.key}
                    </option>
                  ))}
                </select>
                <button onClick={handleUpdateOrderStatus}>Update Status</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default EditOrderPage;
