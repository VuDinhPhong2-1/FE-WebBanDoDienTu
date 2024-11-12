import React, { useEffect, useState } from "react";
import fetchWithAuth from "../../../utils/authFetch";
import NotFoundPage from "../../../pages/NotFoundPage/NotFoundPage";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true); // Trạng thái loading để biết khi nào quá trình xác thực hoàn tất

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // Gọi API để kiểm tra quyền admin
        await fetchWithAuth(
          "/not-admin",
          "http://localhost:3001/auths/admin-dashboard",
          {
            method: "GET",
          }
        );
      } catch (error) {
        console.error("Access denied:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AdminRoute;
