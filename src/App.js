import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home/HomePage";
import { MainLayout } from "./layouts/MainLayout";
import "./App.css";
import { ProductDetailPage } from "./pages/ProductDetail/ProductDetailPage";
import ProductEditor from "./pages/ProductEditor/ProductEditor";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import { useState, useEffect } from "react";
import CartPage from "./pages/CartPage/CartPage";
import Cookies from "js-cookie";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage/OrderSuccessPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import OrderDetailsPage from "./pages/OrderDetailsPage/OrderDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { SnackbarProvider } from "notistack";
import AdminRoute from "./components/Admin/AdminRoute/AdminRoute";
import NotAdminPage from "./pages/NotAdminPage/NotAdminPage";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import ProductPage from "./pages/Admin/ProductPage/ProductPage";
import CreateProductPage from "./pages/Admin/AddProductPage/CreateProductPage";
import EditProductPage from "./pages/Admin/EditProductPage/EditProductPage";
import AdminOrderPage from "./pages/Admin/OrderPage/OrderPage";
import EditOrderPage from "./pages/Admin/EditOrderPage/EditOrderPage";
import RolePage from "./pages/Admin/RolePage/RolePage";
import UserPage from "./pages/Admin/UserPage/UserPage";

function App() {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(Cookies.get("cart") || "[]");
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartItemsCount(totalItems);
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout cartItemsCount={cartItemsCount}>
                <HomePage />
              </MainLayout>
            }
          />
          <Route
            path="/product/:productId"
            element={
              <MainLayout cartItemsCount={cartItemsCount}>
                <ProductDetailPage updateCartCount={updateCartCount} />
              </MainLayout>
            }
          />
          <Route
            path="/product-editor"
            element={
              <MainLayout cartItemsCount={cartItemsCount}>
                <ProductEditor />
              </MainLayout>
            }
          />
          <Route
            path="/collections/:categoryName"
            element={
              <MainLayout cartItemsCount={cartItemsCount}>
                <CategoryPage />
              </MainLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <MainLayout cartItemsCount={cartItemsCount}>
                <CartPage updateCartCount={updateCartCount} />
              </MainLayout>
            }
          />
          <Route
            path="/checkout"
            element={<CheckoutPage updateCartCount={updateCartCount} />}
          />
          <Route
            path="/order-success/:orderId"
            element={<OrderSuccessPage />}
          />
          <Route
            path="/login"
            element={
              <MainLayout cartItemsCount={cartItemsCount}>
                <LoginPage updateCartCount={updateCartCount} />
              </MainLayout>
            }
          />
          <Route
            path="/account"
            element={
              <MainLayout cartItemsCount={cartItemsCount}>
                <AccountPage updateCartCount={updateCartCount} />
              </MainLayout>
            }
          />
          <Route
            path="/account/order"
            element={
              <MainLayout cartItemsCount={cartItemsCount}>
                <OrderPage updateCartCount={updateCartCount} />
              </MainLayout>
            }
          />
          <Route
            path="/account/order/:orderId"
            element={
              <MainLayout cartItemsCount={cartItemsCount}>
                <OrderDetailsPage updateCartCount={updateCartCount} />
              </MainLayout>
            }
          />
          <Route
            path="/register"
            element={
              <MainLayout cartItemsCount={cartItemsCount}>
                <RegisterPage updateCartCount={updateCartCount} />
              </MainLayout>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminLayout>
                  <ProductPage />
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products/create"
            element={
              <AdminRoute>
                <AdminLayout>
                  <CreateProductPage />
                </AdminLayout>
              </AdminRoute>
            }
          />{" "}
          <Route
            path="/admin/products/edit/:productId"
            element={
              <AdminRoute>
                <AdminLayout>
                  <EditProductPage />
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminLayout>
                  <AdminOrderPage />
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/roles"
            element={
              <AdminRoute>
                <AdminLayout>
                  <RolePage />
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders/edit/:orderId"
            element={
              <AdminRoute>
                <AdminLayout>
                  <EditOrderPage />
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminLayout>
                  <UserPage />
                </AdminLayout>
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/not-admin" element={<NotAdminPage />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
