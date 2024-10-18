import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { MainLayout } from "./layouts/MainLayout";
import "./App.css";
import { ProductDetail } from "./pages/ProductDetail/ProductDetail";
import ProductEditor from "./pages/ProductEditor/ProductEditor";
import CategoryPage from "./pages/CategoryPage/CategoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          }
        />
        <Route
          path="/product-editor"
          element={
            <MainLayout>
              <ProductEditor />
            </MainLayout>
          }
        />
        <Route
          path="/collections/:categoryName"
          element={
            <MainLayout>
              <CategoryPage />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
