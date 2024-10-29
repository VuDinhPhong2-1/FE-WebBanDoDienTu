import { Badge, IconButton, styled, Typography } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Cart = ({ cartItemsCount }) => {
  const CartIconButton = styled(IconButton)(({ theme }) => ({
    color: "inherit",
    border: "2px solid white",
    borderRadius: "8px",
    padding: theme.spacing(1),
    width: "117px",
    height: "43px",
    display: "flex",
    gap: 10,
    marginLeft: "20px",
  }));
  const navigate = useNavigate();

  return (
    <CartIconButton onClick={() => navigate(`/cart`)}>
      <Badge
        badgeContent={cartItemsCount}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#F70000", // Màu sắc của badge
          },
        }}
      >
        <FaShoppingCart style={{ fontSize: "18px" }} />
      </Badge>
      <Typography variant="body2">Giỏ Hàng</Typography>
    </CartIconButton>
  );
};
