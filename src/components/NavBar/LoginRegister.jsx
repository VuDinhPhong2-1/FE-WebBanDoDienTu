import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Popover,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import PersonOutlineTwoToneIcon from "@mui/icons-material/PersonOutlineTwoTone";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useState, useEffect, useContext } from "react";
import { FaExclamationCircle, FaLock, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginRegister = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sử dụng login và logout thay vì setIsLoggedIn từ AuthContext
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      login(token, JSON.parse(userData));
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Email không hợp lệ! Vui lòng nhập đúng định dạng email.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("Mật khẩu phải dài ít nhất 8 ký tự!");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    if (validateEmail(email) && password.length >= 8) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:3001/auths/signIn",
          { email, password },
          { withCredentials: true }
        );

        const { access_token, user: userData } = response.data;

        // Sử dụng login từ AuthContext để lưu token và userData
        login(access_token, userData);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("userData", JSON.stringify(userData));

        handleClose();
      } catch (error) {
        console.error("Login failed:", error);
        alert("Đăng nhập thất bại. Vui lòng thử lại!");
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!validateEmail(email))
        setEmailError(
          "Email không hợp lệ! Vui lòng nhập đúng định dạng email."
        );
      if (password.length < 8)
        setPasswordError("Mật khẩu phải dài ít nhất 8 ký tự!");
    }
  };

  const handleLogout = () => {
    // Sử dụng logout từ AuthContext để đăng xuất
    logout();
    navigate("/");
    handleClose();
  };

  const navigate = useNavigate();

  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const ErrorText = styled(Typography)(({ theme }) => ({
    color: theme.palette.error.main,
    fontSize: "0.75rem",
    marginTop: theme.spacing(0.5),
    display: "flex",
    alignItems: "center",
  }));

  const StyledButton = styled(Button)({
    backgroundColor: "#000",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#333",
    },
  });

  const open = Boolean(anchorEl);
  const id = open ? "login-popover" : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginRight: 2,
        height: "100%",
      }}
    >
      {isLoggedIn ? (
        <IconButton
          aria-controls={id}
          onClick={handleClick}
          color="inherit"
          sx={{
            "&:hover": {
              borderRadius: "5px",
            },
            borderRadius: "5px",
          }}
        >
          <PersonOutlineTwoToneIcon style={{ fontSize: "35px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 1,
              alignItems: "start",
            }}
          >
            <Typography variant="body2">Tài khoản</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2">của bạn</Typography>
              <KeyboardArrowDownOutlinedIcon
                sx={{ fontSize: "16px", marginLeft: "4px" }}
              />
            </Box>
          </Box>
        </IconButton>
      ) : (
        <IconButton
          aria-controls={id}
          onClick={handleClick}
          color="inherit"
          sx={{
            "&:hover": {
              borderRadius: "5px",
            },
            borderRadius: "5px",
          }}
        >
          <PersonOutlineTwoToneIcon style={{ fontSize: "35px" }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: 1,
              alignItems: "start",
            }}
          >
            <Typography variant="body2">Đăng Nhập</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2">Đăng Ký</Typography>
              <KeyboardArrowDownOutlinedIcon
                sx={{ fontSize: "16px", marginLeft: "4px" }}
              />
            </Box>
          </Box>
        </IconButton>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {isLoggedIn ? (
          <Box p={2} width="418px" textAlign="center">
            <Typography variant="h6" gutterBottom>
              THÔNG TIN TÀI KHOẢN
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Tên: {storedUserData.fullName}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Email: {storedUserData.email}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                onClick={() => {
                  navigate(`/account`);
                  handleClose();
                }}
                style={{ marginTop: 16, width: "100%" }}
                color="secondary"
              >
                Xem chi tiết
              </Button>
              <Button
                variant="contained"
                onClick={handleLogout}
                style={{ marginTop: 16, width: "100%" }}
                color="secondary"
              >
                Đăng Xuất
              </Button>
            </Box>
          </Box>
        ) : (
          <Box p={2} width="320px" textAlign="center">
            <Typography variant="h6" gutterBottom>
              ĐĂNG NHẬP TÀI KHOẢN
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Nhập email và mật khẩu của bạn:
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              InputProps={{
                startAdornment: <FaUserCircle style={{ marginRight: 8 }} />,
              }}
              aria-describedby="email-error"
            />
            {emailError && (
              <ErrorText id="email-error">
                <FaExclamationCircle style={{ marginRight: 4 }} />
                {emailError}
              </ErrorText>
            )}
            <TextField
              fullWidth
              margin="normal"
              label="Mật khẩu"
              type="password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              error={!!passwordError}
              InputProps={{
                startAdornment: <FaLock style={{ marginRight: 8 }} />,
              }}
              aria-describedby="password-error"
            />
            {passwordError && (
              <ErrorText id="password-error">
                <FaExclamationCircle style={{ marginRight: 4 }} />
                {passwordError}
              </ErrorText>
            )}
            <StyledButton
              fullWidth
              variant="contained"
              onClick={handleLogin}
              style={{ marginTop: 16 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Đăng nhập"}
            </StyledButton>
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                color="primary"
                onClick={() => console.log("Register clicked")}
              >
                Tạo tài khoản
              </Button>
              <Button
                color="primary"
                onClick={() => console.log("Forgot password clicked")}
              >
                Khôi phục mật khẩu
              </Button>
            </Box>
          </Box>
        )}
      </Popover>
    </Box>
  );
};
