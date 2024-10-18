import EventSeatOutlinedIcon from "@mui/icons-material/EventSeatOutlined";
import BackpackOutlinedIcon from "@mui/icons-material/BackpackOutlined";
import KeyboardAltOutlinedIcon from "@mui/icons-material/KeyboardAltOutlined";
import { Box, Typography } from "@mui/material";
import { FaTh } from "react-icons/fa";
import styled from "styled-components";
import TvIcon from "@mui/icons-material/Tv";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import ImportantDevicesOutlinedIcon from "@mui/icons-material/ImportantDevicesOutlined";
import MemoryIcon from "@mui/icons-material/Memory";
import { useEffect, useState } from "react";
import KeyboardArrowRightTwoToneIcon from "@mui/icons-material/KeyboardArrowRightTwoTone";
import { useNavigate } from "react-router-dom";

const DropDownWrapper = styled(Box)`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: transparent;
  z-index: 1;
  width: 100%;
  max-width: 100%;
  height: 66px;
  justify-content: center;
`;

const DropDownCategoriesWrapperLevel2 = styled(Box)`
  display: none;
  position: absolute;
  top: 100%;
  background-color: transparent;
  z-index: 1;
  max-width: 1258.1px;
  width: 100%;
  height: fit-content;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
`;

const CategoriesItemLevel1 = styled(Box)`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 100%;
  margin: 0 10px;

  &:hover ${DropDownCategoriesWrapperLevel2} {
    display: flex;
  }
`;

const DropDown = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover ${DropDownWrapper} {
    display: flex;
  }
`;

const DropdownBtn = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DropDownContent = styled(Box)`
  display: flex;
  color: black;
  background-color: #d91e1e;
  width: 100%;
  max-width: 1258.09px;
  border-radius: 4px;
`;

const DropDownContentLevel2 = styled(Box)`
  display: grid;
  color: black;
  background-color: white;
  border-radius: 0;
  box-shadow: -4px 4px 10px rgba(0, 0, 0, 0.2), 4px 4px 10px rgba(0, 0, 0, 0.2),
    0 8px 10px rgba(0, 0, 0, 0.2);
  max-width: 1258.1px;
  width: 100%;
  min-height: 300px;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 20px;
  padding: 14px 20px;
`;

export const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseCategoriesData = await fetch(
          "http://localhost:3001/categories/"
        );
        if (!responseCategoriesData.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await responseCategoriesData.json();
        setCategories(data);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };

    fetchCategories();
  }, []);

  const groupCategories = (categories) => {
    const categoryMap = {};
    const groupedCategories = [];

    categories.forEach((category) => {
      categoryMap[category.categoryId] = { ...category, children: [] };
    });

    categories.forEach((category) => {
      if (category.parentCategoryId === null) {
        groupedCategories.push(categoryMap[category.categoryId]);
      } else {
        const parentCategory = categoryMap[category.parentCategoryId];
        if (parentCategory) {
          parentCategory.children.push(categoryMap[category.categoryId]);
        }
      }
    });

    return groupedCategories;
  };

  const groupedCategories = groupCategories(categories);

  const renderCategoryItem = (category, icon) => (
    <CategoriesItemLevel1 key={category.categoryId}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() =>
          navigate(`/collections/${encodeURIComponent(category.name)}`)
        }
      >
        {icon}
        <Typography>{category.name}</Typography>
      </Box>
      {category.children?.length > 0 && (
        <DropDownCategoriesWrapperLevel2>
          <DropDownContentLevel2>
            {category.children.map((subCategory) => (
              <div key={subCategory.categoryId}>
                <Box
                  sx={{ display: "flex" }}
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(
                      `/collections/${encodeURIComponent(subCategory.name)}`
                    );
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      "&:hover": { color: "red" },
                    }}
                  >
                    {subCategory.name}
                  </Typography>
                  <KeyboardArrowRightTwoToneIcon />
                </Box>
                {subCategory.children?.length > 0 &&
                  subCategory.children.map((childCategory) => (
                    <div key={childCategory.categoryId}>
                      <Typography
                        onClick={(event) => {
                          event.stopPropagation();
                          navigate(
                            `/collections/${encodeURIComponent(
                              childCategory.name
                            )}`
                          );
                        }}
                        sx={{ "&:hover": { color: "red" } }}
                      >
                        {childCategory.name}
                      </Typography>
                    </div>
                  ))}
              </div>
            ))}
          </DropDownContentLevel2>
        </DropDownCategoriesWrapperLevel2>
      )}
    </CategoriesItemLevel1>
  );

  return (
    <DropDown>
      <DropdownBtn>
        <FaTh />
        <Typography variant="body2">Danh Mục Sản Phẩm</Typography>
      </DropdownBtn>
      <DropDownWrapper>
        <DropDownContent>
          {groupedCategories.map((category) => {
            let icon;
            switch (category.name) {
              case "Laptop":
                icon = <LaptopMacIcon />;
                break;
              case "PC":
                icon = <ImportantDevicesOutlinedIcon />;
                break;
              case "Màn hình":
                icon = <TvIcon />;
                break;
              case "Linh Kiện":
                icon = <MemoryIcon />;
                break;
              case "Gaming Gear":
                icon = <KeyboardAltOutlinedIcon />;
                break;
              case "Phụ Kiện":
                icon = <BackpackOutlinedIcon />;
                break;
              default:
                icon = <EventSeatOutlinedIcon />;
            }
            return renderCategoryItem(category, icon);
          })}
          {/* Các điều hướng khác.. */}
          <CategoriesItemLevel1>
            <EventSeatOutlinedIcon />
            Bàn/Ghế
          </CategoriesItemLevel1>
          {/* Các mục điều hướng trang */}
          <CategoriesItemLevel1>
            <EventSeatOutlinedIcon />
            Phần Mềm
          </CategoriesItemLevel1>
          <CategoriesItemLevel1>
            <EventSeatOutlinedIcon />
            Khuyến Mãi
          </CategoriesItemLevel1>
          <CategoriesItemLevel1>
            <EventSeatOutlinedIcon />
            Best Seller
          </CategoriesItemLevel1>
          <CategoriesItemLevel1>
            <EventSeatOutlinedIcon />
            Tin Công Nghệ
          </CategoriesItemLevel1>
        </DropDownContent>
      </DropDownWrapper>
    </DropDown>
  );
};
