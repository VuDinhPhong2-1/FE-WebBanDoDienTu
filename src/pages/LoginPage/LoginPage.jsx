import { Box, Button, Typography, TextField, Alert } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../utils/AuthContext";

const Container = styled(Box)`
  display: flex;
  width: 100%;
  background: #d7e4ef;
  max-height: 100%;
  height: 500px;
  align-items: center;
  justify-content: center;
`;

const FormLogin = styled(Box)`
  display: flex;
  max-width: 650px;
  width: 100%;
  padding: 15px;
  background: white;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled(TextField)`
  max-width: 590px;
  width: 100%;
`;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3001/auths/signIn",
        { email, password },
        { withCredentials: true }
      );

      login(response.data.access_token, response.data.user);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại."
      );
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3001/auths/google/login";
  };

  return (
    <Container>
      <FormLogin component="form" onSubmit={handleLogin}>
        <Typography variant="h5" textAlign={"center"}>
          Đăng nhập
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <StyledInput
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <StyledInput
          label="Mật khẩu"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "130px", background: "black" }}
        >
          Đăng nhập
        </Button>
        <Box sx={{ width: "100%", display: "flex", gap: "10px", justifyContent:"center" }}>
          <Button
            variant="contained"
            sx={{ width: "200px", background: "darkred" }}
            onClick={handleGoogleLogin}
          >
            Đăng nhập với Google
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          <Link to="/forgot-password" style={{ textDecoration: "none", color: "black" }}>
            Quên mật khẩu?
          </Link>
          {" hoặc "}
          <Link to="/register" style={{ textDecoration: "none", color: "black" }}>
            Đăng ký
          </Link>
        </Typography>
      </FormLogin>
    </Container>
  );
}

export default LoginPage;
