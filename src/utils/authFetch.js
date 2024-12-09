export default async function fetchWithAuth(redirectURL, url, options = {}) {
  let token = localStorage.getItem("access_token");

  if (!token) {
    window.location.href = redirectURL;
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
          credentials: "include",
        }
      );

      if (!refreshResponse.ok) {
        window.location.href = redirectURL;
        return;
      }

      const { access_token } = await refreshResponse.json();
      localStorage.setItem("access_token", access_token);

      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${access_token}`,
        },
      });
    }

    if (response.ok) {
      const data = await response.json();
      return { response, data };
    } else {
      const data = await response.json();
      throw new Error(
        data.message || "Access denied: insufficient permissions"
      );
    }
  } catch (err) {
    console.error("API request failed:", err);
    throw err;
  }
}
