import { IconButton, InputBase, styled } from "@mui/material";
import { FaSearch } from "react-icons/fa";

export const Search = () => {
  const SearchInput = styled(InputBase)(({ theme }) => ({
    backgroundColor: "#f5f5f5",
    borderRadius: theme.shape.borderRadius,
    padding: "0px 2px",
    marginLeft: "85px",
    marginRight: theme.spacing(2),
    width: "427px",
    height: "40px",
  }));

  return (
    <SearchInput
      placeholder="Thương hiệu"
      endAdornment={
        <IconButton
          sx={{
            background: "red",
            width: "50px",
            height: "33px",
            borderRadius: "5px",
            "&:hover": {
              background: "red",
            },
          }}
        >
          <FaSearch style={{ color: "white" }} size={20} />
        </IconButton>
      }
    />
  );
};
