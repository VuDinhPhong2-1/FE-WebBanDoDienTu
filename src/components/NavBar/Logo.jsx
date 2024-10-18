import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
export const Logo = () => {
  const LogoImage = styled("img")(({ theme }) => ({
    height: "60px",
    marginRight: theme.spacing(2),
    cursor: "pointer",
  }));
  const navigate = useNavigate();
  return (
    <>
      <LogoImage
        onClick={() => navigate(`/`)}
        src="https://file.hstatic.net/200000837185/file/logo-web-white-2_d77f90f6d67c47bea3c129624300ba8f.png"
        alt="Xgear Logo"
      />
    </>
  );
};
