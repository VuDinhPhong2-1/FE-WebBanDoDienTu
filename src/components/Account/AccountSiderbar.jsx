import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";
import { AuthContext } from "../../utils/AuthContext";
import PersonIcon from "@mui/icons-material/Person";
import InventoryIcon from "@mui/icons-material/Inventory";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 290px;
  padding: 15px 0;
  background: white;
  border-radius: 10px;
`;

const AcountLeftHeader = styled(Box)`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e3e3e3;
  padding: 0 15px 20px 15px;
`;

// Định nghĩa NavigateItem với prop $isactive
const NavigateItem = styled(Box)`
  display: flex;
  border-radius: 50px;
  background: ${({ $isactive }) => ($isactive ? "red" : "#eaeaea")};
  color: ${({ $isactive }) => ($isactive ? "white" : "inherit")};
  width: 100%;
  max-width: 260px;
  height: 42px;
  align-items: center;
  padding: 0 5px;
  gap: 8px;
  cursor: pointer;
  .icon-wrapper {
    color: ${({ $isactive }) => ($isactive ? "red" : "#B4B4B4")};
  }
  &:hover {
    color: white;
    background: red;
    .icon-wrapper {
      color: red;
    }
  }
`;

function AccountSiderbar({ nameRoute }) {
  const { userData: contextUserData } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (contextUserData) {
      setUserData(contextUserData);
    }
  }, [contextUserData]);

  if (!userData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      {/* Account left header */}
      <AcountLeftHeader>
        <img
          src={userData.profilePicture}
          alt="avatar"
          style={{
            borderRadius: "50%",
            maxWidth: "65%",
            maxHeight: "65%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Typography noWrap>{userData.fullName}</Typography>
          <Typography variant="caption" color="#545454" noWrap>
            {userData.email}
          </Typography>
        </Box>
      </AcountLeftHeader>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          padding: "0 15px",
          marginTop: "15px",
          gap: 2,
          flexDirection: "column",
        }}
      >
        {/* Truyền prop $isactive vào NavigateItem */}
        <NavigateItem
          $isactive={nameRoute === "profile"}
          onClick={() => navigate(`/account`)}
        >
          <Box
            className="icon-wrapper"
            sx={{
              width: "30px",
              height: "30px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50px",
              transition: "background 0.3s, color 0.3s",
            }}
          >
            <PersonIcon />
          </Box>
          <Typography>Thông tin cá nhân</Typography>
        </NavigateItem>
        <NavigateItem
          $isactive={nameRoute === "orders"}
          onClick={() => navigate("/account/order")}
        >
          <Box
            className="icon-wrapper"
            sx={{
              width: "30px",
              height: "30px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50px",
              transition: "background 0.3s, color 0.3s",
            }}
          >
            <InventoryIcon />
          </Box>
          <Typography>Đơn hàng của bạn</Typography>
        </NavigateItem>

        <NavigateItem
          $isactive={nameRoute === "address"}
          onClick={() => navigate("/account/address")}
        >
          <Box
            className="icon-wrapper"
            sx={{
              width: "30px",
              height: "30px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50px",
              transition: "background 0.3s, color 0.3s",
            }}
          >
            <HomeIcon />
          </Box>
          <Typography>Địa chỉ giao hàng</Typography>
        </NavigateItem>
      </Box>
    </Container>
  );
}

export default AccountSiderbar;
