import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
export const Logo = ({ width, url }) => {
  const LogoImage = styled("img")(({ theme }) => ({
    height: "60px",
    margin: "0 30px",
    cursor: "pointer",
    maxWidth: width ? width : "",
    width: width ? "100%" : "",
  }));
  const navigate = useNavigate();
  return (
    <>
      <LogoImage
        onClick={() => navigate(`/`)}
        src={
          url
            ? url
            : "https://file.hstatic.net/200000837185/file/logo-web-white-2_d77f90f6d67c47bea3c129624300ba8f.png"
        }
        alt="Xgear Logo"
      />
    </>
  );
};
