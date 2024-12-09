import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderTableControls from "../../../components/Admin/OrderPage/OrderTableControls/OrderTableControls";
import "./OrderPage.css";
function AdminOrderPage() {
  return (
    <main className="order-page-container">
      <section className="title">
        <FontAwesomeIcon icon={faMoneyBill} />
        <a href="/admin/orders">Orders List</a>
      </section>
      <div className="list-orders">
        <OrderTableControls />
      </div>
    </main>
  );
}

export default AdminOrderPage;
