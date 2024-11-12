import React, { useEffect, useState } from "react";
import "./TableOrder.css";
import fetchWithAuth from "../../../utils/authFetch";

function TableOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await fetchWithAuth(
          "/login",
          "http://localhost:3001/orders/latest"
        );
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="table-order">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.totalAmount.toLocaleString()} VND</td>
              <td>{order.status}</td>
              <td>{order.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableOrder;
