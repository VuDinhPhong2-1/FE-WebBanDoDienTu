import { createTheme } from "@mui/material/styles";
import "@fontsource/mulish"; // Import font Mulish

// Các biến cho chiều cao, màu sắc của header
const HEADER_HEIGHT = "55px";
const HEADER_WIDTH = "100%";
const HEADER_BACKGROUND_COLOR = "#d0021b";
const HEADER_TEXT_COLOR = "white";
const HEADER_PADDING = "16px";

// Tạo theme với các thuộc tính header và typography
const theme = createTheme({
  webSite: {
    headerHeight: HEADER_HEIGHT,
    headerWidth: HEADER_WIDTH,
    headerBackgroundColor: HEADER_BACKGROUND_COLOR,
    headerTextColor: HEADER_TEXT_COLOR,
    headerPadding: HEADER_PADDING,
  },
  typography: {
    fontFamily: "'Mulish', sans-serif", // Áp dụng font Mulish cho toàn bộ theme
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Mulish', sans-serif", // Áp dụng font Mulish cho toàn bộ body
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "*::-webkit-scrollbar-thumb": {
            background: "#dcdde1",
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            background: "white",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderWidth: "0.5px",
          "&:hover": {
            borderWidth: "0.5px",
          },
        },
      },
    },
  },
});

export default theme;
