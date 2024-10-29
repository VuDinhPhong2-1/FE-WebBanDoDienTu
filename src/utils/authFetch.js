export async function fetchWithAuth(url, options = {}) {
  let token = sessionStorage.getItem("access_token");

  if (!token) {
    window.location.href = "/login";
    return;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      const refreshResponse = await fetch("http://localhost:3001/auths/refresh-token", {
        method: "POST",
        credentials: "include", // Để gửi refresh_token trong cookie
      });

      if (!refreshResponse.ok) {
        window.location.href = "/login";
        return;
      }

      const { access_token } = await refreshResponse.json();
      sessionStorage.setItem("access_token", access_token);

      // Thử lại yêu cầu với access_token mới
      return await fetchWithAuth(url, options);
    }

    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
