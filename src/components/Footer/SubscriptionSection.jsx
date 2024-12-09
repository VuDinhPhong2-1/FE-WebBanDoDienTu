import { Box, Button, Input, Typography } from "@mui/material";
import styled from "styled-components";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
const SubscriptionSection = styled(Box)`
  display: flex;
  max-width: 1250px;
  width: 100%; /* Đảm bảo nó chiếm 100% chiều rộng */
  min-height: 85.8px;
  height: fit-content;
  background-color: transparent;
  border-bottom: 1px solid white;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  @media (max-width: 976px) {
    flex-direction: column;
  }
`;
const InputEmailWrapper = styled(Box)`
  background: white;
  height: 45.1px;
  max-width: 450px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: 100px;
  padding-left: 10px;
  @media (max-width: 976px) {
    margin-left: 0;
  }
`;
export const Subscription = () => {
  return (
    <SubscriptionSection>
      {/* Nội dung của SubscriptionSection */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          height: "100%",
          gap: "10px",
          flexDirection: "row",
          // Thay đổi hướng layout dựa trên kích thước màn hình
          "@media (max-width: 976px)": {
            flexDirection: "column",
            justifyContent: "center",
          },
        }}
      >
        <Typography
          variant="body1"
          sx={{ textTransform: "uppercase", fontWeight: 600, color: "white" }}
        >
          đăng ký nhận tin
        </Typography>
        <form>
          <InputEmailWrapper>
            <EmailOutlinedIcon sx={{ color: "rgb(156, 156, 156)" }} />
            <Input
              disableUnderline
              placeholder="Email"
              type="email"
              required
              sx={{ marginLeft: "10px", fontSize: "14px", width: "100%" }}
            ></Input>

            <Button
              startIcon={<SendOutlinedIcon fontSize="14px" />}
              type="submit"
              sx={{
                background: "red",
                height: "100%",
                borderRadius: "0px",
                width: "100%",
                maxWidth: "120px",
                color: "white",
                "&:hover": {
                  background: "darkred",
                },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ textTransform: "uppercase" }}
              >
                Đăng ký
              </Typography>
            </Button>
          </InputEmailWrapper>
        </form>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <FacebookIcon sx={{ color: "blue", width: "50px", height: "50px" }} />
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <TwitterIcon sx={{ color: "blue", width: "50px", height: "50px" }} />
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <InstagramIcon sx={{ color: "red", width: "50px", height: "50px" }} />
        </Box>
      </Box>
    </SubscriptionSection>
  );
};
