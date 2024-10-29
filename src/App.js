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
        <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
