import {
  Box,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import styled from "styled-components";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import { useState, useEffect } from "react";

// Styled Container for filter
const Container = styled(Box)`
  max-width: 290px;
  width: 100%;
  min-width: 212.5px;
  height: fit-content;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 2;
  padding: 15px;
  margin: 24px 0 0 24px;
  border-radius: 5px;

  @media (max-width: 993px) {
    display: none;
  }
`;

export const FilterProduct = ({ categories, onCategoryChange }) => {
  const [category, setCategory] = useState([]);

  // Cập nhật trạng thái khi nhận được categories mới từ props
  useEffect(() => {
    if (categories.length > 0) {
      // Bảo toàn trạng thái 'checked' cũ
      const updatedCategories = categories.map((cat) => {
        const existingCategory = category.find((c) => c.name === cat.name);
        return {
          name: cat.name,
          checked: existingCategory ? existingCategory.checked : false,
        };
      });
      setCategory(updatedCategories);
    }
  }, [categories]);

  const handleCategoryChange = (index) => {
    const updatedCategories = [...category];
    updatedCategories[index].checked = !updatedCategories[index].checked;
    setCategory(updatedCategories);

    // Gửi các danh mục được chọn lên CategoryPage
    const selectedCategories = updatedCategories
      .filter((cat) => cat.checked)
      .map((cat) => cat.name);
    onCategoryChange(selectedCategories);
  };

  return (
    <Container>
      <Typography fontWeight={"bold"} sx={{ width: "fit-content" }}>
        Thương hiệu
      </Typography>
      <Grid container spacing={2}>
        {category.map((category, index) => (
          <Grid
            item
            xs={6}
            key={category.name}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={category.checked}
                  icon={<CheckBoxOutlineBlankOutlinedIcon />}
                  checkedIcon={<CheckBoxOutlinedIcon />}
                  onChange={() => handleCategoryChange(index)} // Xử lý khi thay đổi checkbox
                />
              }
            />
            <Typography variant="subtitle2"> {category.name}</Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
