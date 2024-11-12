import { Box, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import RoomIcon from "@mui/icons-material/Room";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
const CompanyInformationWrapper = styled(Box)`
  max-width: 1250px;
  width: 100%; /* Đảm bảo nó chiếm 100% chiều rộng */
  height: fit-content;
  padding: 25px 10px 0 0;
`;
export const CompanyInformation = () => {
  return (
    <CompanyInformationWrapper>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            gap: 2,
            paddingBottom: "45px",
          }}
        >
          <img
            src="../../../../logo-web-white_30e3c74436a2411bb27fa7fd58ca82ec_grande.webp"
            alt="Logo công ty"
            style={{ maxWidth: "200px", height: "auto" }}
          />
          <Typography variant="subtitle2">
            XGEAR - Chuyên cung cấp Laptop Gaming & PC cao cấp chính hãng.
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <RoomIcon fontSize="12px" />
            <Typography variant="subtitle2">
              HCM : 08 Tự Lập, Phường 4, Quận Tân Bình
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <RoomIcon fontSize="12px" />
            <Typography variant="subtitle2">
              Hà Nội : 10A1 Ngõ 49 Linh Lang, Ba Đình
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <LocalPhoneIcon fontSize="12px" />
            <Typography variant="subtitle2">
              Hà Nội : 10A1 Ngõ 49 Linh Lang, Ba Đình
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <EmailOutlinedIcon fontSize="12px" />
            <Typography variant="subtitle2">sales@thenewxgear.com</Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ textTransform: "uppercase", fontWeight: "bold" }}
          >
            Chính sách
          </Typography>
          <ul style={{ marginLeft: "19px" }}>
            <li>Tìm kiếm</li>
            <li>Liên Hệ</li>
            <li>Trung tâm bảo hành</li>
          </ul>

          <Typography
            variant="h6"
            sx={{ textTransform: "uppercase", fontWeight: "bold" }}
          >
            Bài viết
          </Typography>
          <ul style={{ marginLeft: "19px" }}>
            <li>Hướng Dẫn & Thủ Thuật</li>
            <li>Giải Teis & Game</li>
            <li>Tin Tức Công Nghệ</li>
            <li>Tin Tức</li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ color: "white" }}>
          <Typography
            variant="h6"
            sx={{ textTransform: "uppercase", fontWeight: "bold" }}
          >
            Hướng dẫn
          </Typography>
          <ul style={{ marginLeft: "19px" }}>
            <li>Hướng dẫn thanh toán</li>
            <li>Hướng dẫn trả góp</li>
            <li>Tra cứu bảo hành</li>
            <li>Tuyển dụng</li>
            <li>Tin công nghệ</li>
            <li>Chính sách bảo hành</li>
            <li>Chính sách đổi mới hoàn tiền</li>
          </ul>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ textTransform: "uppercase", fontWeight: "bold" }}
          >
            Tổng đài hỗ trợ
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <LocalPhoneIcon fontSize="12px" />
            <Typography variant="subtitle2">
              Hồ Chí Minh: 093 373 1881 (9h00-20h00)
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <LocalPhoneIcon fontSize="12px" />
            <Typography variant="subtitle2">
              Hà Nội: 097 232 1881 (9h00-20h00)
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <LocalPhoneIcon fontSize="12px" />
            <Typography variant="subtitle2">
              Hotline: 028 7108 1881 (9h00-20h00)
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box></Box>
    </CompanyInformationWrapper>
  );
};
