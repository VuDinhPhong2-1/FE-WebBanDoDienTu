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
import { useState, useEffect } from "react";
import { FaExclamationCircle, FaLock, FaUserCircle } from "react-icons/fa";
import axios from "axios";

export const LoginRegister = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState(""); // Thay đổi từ email thành username
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(""); // Thay đổi từ emailError
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Thêm state để lưu thông tin người dùng

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9_]{3,20}$/;
    return re.test(String(username));
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (!validateUsername(e.target.value)) {
      setUsernameError(
        "Username phải chứa từ 3-20 ký tự, chỉ bao gồm chữ cái, số và dấu gạch dưới!"
      );
    } else {
      setUsernameError("");
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
    if (validateUsername(username) && password.length >= 8) {
      setIsLoading(true);
      try {
        // Gọi API đăng nhập với username
        const response = await axios.post(
          "http://localhost:3001/auths/signIn",
          {
            username, // Thay đổi từ email thành username
            password,
          },
          {
            withCredentials: true, // Nếu backend đặt cookie
          }
        );

        // Giả sử API trả về access_token trong response.data
        const { access_token, user: userData } = response.data;

        // Lưu access_token vào sessionStorage
        sessionStorage.setItem("access_token", access_token);

        // Cập nhật trạng thái đăng nhập và thông tin người dùng
        setIsLoggedIn(true);
        setUser(userData);

        // Đóng popover
        handleClose();
      } catch (error) {
        console.error("Login failed:", error);
        // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          // Bạn có thể thêm state để hiển thị thông báo lỗi
          alert(error.response.data.message);
        } else {
          alert("Đăng nhập thất bại. Vui lòng thử lại!");
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      if (!validateUsername(username))
        setUsernameError(
          "Username phải chứa từ 3-20 ký tự, chỉ bao gồm chữ cái, số và dấu gạch dưới!"
        );
      if (password.length < 8)
        setPasswordError("Mật khẩu phải dài ít nhất 8 ký tự!");
    }
  };

  const handleLogout = async () => {
    try {
      // Gọi API logout nếu cần
      await axios.post(
        "http://localhost:3001/auths/logout",
        {},
        {
          withCredentials: true, // Nếu backend đặt cookie
        }
      );

      // Xóa access_token khỏi sessionStorage
      sessionStorage.removeItem("access_token");

      // Cập nhật trạng thái đăng nhập
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Đăng xuất thất bại. Vui lòng thử lại!");
    }
  };

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
          <Box p={2} width="320px" textAlign="center">
            <Typography variant="h6" gutterBottom>
              TÀI KHOẢN CỦA BẠN
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Chào mừng bạn đến với trang của mình!
            </Typography>
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogout}
              style={{ marginTop: 16 }}
              color="secondary"
            >
              Đăng Xuất
            </Button>
          </Box>
        ) : (
          <Box p={2} width="320px" textAlign="center">
            <Typography variant="h6" gutterBottom>
              ĐĂNG NHẬP TÀI KHOẢN
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Nhập username và mật khẩu của bạn:
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Username" // Thay đổi từ "Email" thành "Username"
              variant="outlined"
              value={username}
              onChange={handleUsernameChange}
              error={!!usernameError} // Thay đổi từ emailError
              InputProps={{
                startAdornment: <FaUserCircle style={{ marginRight: 8 }} />,
              }}
              aria-describedby="username-error"
            />
            {usernameError && (
              <ErrorText id="username-error">
                <FaExclamationCircle style={{ marginRight: 4 }} />
                {usernameError}
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
