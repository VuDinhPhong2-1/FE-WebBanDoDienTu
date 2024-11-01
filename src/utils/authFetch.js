export async function fetchWithAuth(url, options = {}) {
  let token = localStorage.getItem("access_token");

  if (!token) {
    window.location.href = "/login";
    return;
  }

  try {
    let response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    // Kiểm tra nếu token không hợp lệ và cần refresh token
    if (response.status === 401) {
      const refreshResponse = await fetch(
        "http://localhost:3001/auths/refresh-token",
        {
          method: "POST",
          credentials: "include", // Gửi refresh_token trong cookie
        }
      );

      if (!refreshResponse.ok) {
        window.location.href = "/login";
        return;
      }

      const { access_token } = await refreshResponse.json();
      localStorage.setItem("access_token", access_token);

      // Gửi lại yêu cầu ban đầu với access_token mới
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${access_token}`,
        },
      });
    }
    const data = await response.json();
    // Trả về toàn bộ đối tượng response để sử dụng các thuộc tính như response.ok
    return { response, data };
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
