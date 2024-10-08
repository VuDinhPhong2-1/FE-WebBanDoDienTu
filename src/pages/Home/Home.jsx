import { Box } from "@mui/material";
import { LaptopList } from "../../components/Home/LaptopList";
import { ScreenList } from "../../components/Home/ScreenList";
import { PCGamingList } from "../../components/Home/PCGaming";

export const Home = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "fit-content",
          background: "#F5F5F5",
          alignItems: "center",
          width: "100%",
          paddingBottom: "50px",
        }}
      >
        {/* Laptop List */}
        <LaptopList />
        {/* Screen List */}
        {/* <ScreenList /> */}
        {/* PC List */}
        {/* <PCGamingList /> */}
      </Box>
    </>
  );
};
