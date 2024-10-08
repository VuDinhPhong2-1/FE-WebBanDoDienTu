import { styled } from "@mui/material";
export const Logo = () => {
  const LogoImage = styled("img")(({ theme }) => ({
    height: "60px",
    marginRight: theme.spacing(2),
  }));

  return (
    <>
      <LogoImage
        src="https://file.hstatic.net/200000837185/file/logo-web-white-2_d77f90f6d67c47bea3c129624300ba8f.png"
        alt="Xgear Logo"
      />
    </>
  );
};
