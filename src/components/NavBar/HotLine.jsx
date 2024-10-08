import { Box, Typography } from "@mui/material";
import { FaPhone } from "react-icons/fa";

export const HotLine = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginRight: 2,
        height: "100%",
      }}
    >
      <FaPhone />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body2" sx={{ marginLeft: 1 }}>
          Hot Line
        </Typography>
        <Typography variant="body2" sx={{ marginLeft: 1 }}>
          0855461370
        </Typography>
      </Box>
    </Box>
  );
};
