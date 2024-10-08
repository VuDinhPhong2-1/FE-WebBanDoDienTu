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
  top: 102%;
  left: 0;
  background-color: transparent;
  z-index: 1;
  width: 100%;
  height: fit-content;
  justify-content: center;
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
  width: fit-content;
  border-radius: 4px;
`;

const DropDownContentLevel2 = styled(Box)`
  display: grid;
  color: black;
  background-color: white;
  width: fit-content;
  border-radius: 0;
  box-shadow: -4px 4px 10px rgba(0, 0, 0, 0.2), 4px 4px 10px rgba(0, 0, 0, 0.2),
    0 8px 10px rgba(0, 0, 0, 0.2);
  width: 1258.1px;
  min-height: 300px;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 20px;
  padding: 14px 20px;
`;

export const CategoryMenu = () => {
  const [categories, setCategories] = useState([]);

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

    // Bước 1: Tạo một map với key là categoryId
    categories.forEach((category) => {
      categoryMap[category.categoryId] = { ...category, children: [] };
    });

    // Bước 2: Nhóm các danh mục theo parentCategoryId
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

  const laptopCategoriesLevel2Data = (name) => {
    return groupedCategories.find((category) => category.name === name);
  };
  const laptopLevel2Data = laptopCategoriesLevel2Data("Laptop");

  const manHinhCategoriesLevel2Data = (name) => {
    return groupedCategories.find((category) => category.name === name);
  };
  const manHinhLevel2Data = manHinhCategoriesLevel2Data("Màn hình");

  const linhKienCategoriesLevel2Data = (name) => {
    return groupedCategories.find((category) => category.name === name);
  };
  const linhKienLevel2Data = linhKienCategoriesLevel2Data("Linh Kiện");

  const gamingGearCategoriesLevel2Data = (name) => {
    return groupedCategories.find((category) => category.name === name);
  };
  const gamingGearLevel2Data = gamingGearCategoriesLevel2Data("Gaming Gear");

  const phuKienCategoriesLevel2Data = (name) => {
    return groupedCategories.find((category) => category.name === name);
  };
  const phuKienGearLevel2Data = phuKienCategoriesLevel2Data("Phụ kiện");
  return (
    <DropDown>
      {/* Nút hover */}
      <DropdownBtn>
        <FaTh />
        <Typography variant="body2">Danh Mục Sản Phẩm</Typography>
      </DropdownBtn>
      {/* Danh mục cấp 1 */}
      <DropDownWrapper>
        <DropDownContent>
          <CategoriesItemLevel1>
            <LaptopMacIcon />
            Laptop
            <DropDownCategoriesWrapperLevel2>
              <DropDownContentLevel2>
                {laptopLevel2Data?.children?.length > 0 &&
                  laptopLevel2Data.children.map((subCategory) => (
                    <div key={subCategory.categoryId}>
                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {subCategory.name}
                        </Typography>
                        <KeyboardArrowRightTwoToneIcon />
                      </Box>
                      {subCategory.children?.length > 0 &&
                        subCategory.children.map((childCategory) => (
                          <div key={childCategory.categoryId}>
                            <Typography>{childCategory.name}</Typography>
                          </div>
                        ))}
                    </div>
                  ))}
              </DropDownContentLevel2>
            </DropDownCategoriesWrapperLevel2>
          </CategoriesItemLevel1>
          {/* Danh mục của XGear */}
          <CategoriesItemLevel1>
            <ImportantDevicesOutlinedIcon />
            XGear
            <DropDownCategoriesWrapperLevel2>
              <DropDownContentLevel2></DropDownContentLevel2>
            </DropDownCategoriesWrapperLevel2>
          </CategoriesItemLevel1>
          {/* Danh mục Màn Hình */}
          <CategoriesItemLevel1>
            <TvIcon />
            Màn Hình
            <DropDownCategoriesWrapperLevel2>
              <DropDownContentLevel2>
                {manHinhLevel2Data?.children?.length > 0 &&
                  manHinhLevel2Data.children.map((subCategory) => (
                    <div key={subCategory.categoryId}>
                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {subCategory.name}
                        </Typography>
                        <KeyboardArrowRightTwoToneIcon />
                      </Box>
                      {subCategory.children?.length > 0 &&
                        subCategory.children.map((childCategory) => (
                          <div key={childCategory.categoryId}>
                            <Typography>{childCategory.name}</Typography>
                          </div>
                        ))}
                    </div>
                  ))}
              </DropDownContentLevel2>
            </DropDownCategoriesWrapperLevel2>
          </CategoriesItemLevel1>
          {/* Danh mục của Linh Kiện */}
          <CategoriesItemLevel1>
            <MemoryIcon />
            Linh Kiện
            <DropDownCategoriesWrapperLevel2>
              <DropDownContentLevel2>
                {linhKienLevel2Data?.children?.length > 0 &&
                  linhKienLevel2Data.children.map((subCategory) => (
                    <div key={subCategory.categoryId}>
                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {subCategory.name}
                        </Typography>
                        <KeyboardArrowRightTwoToneIcon />
                      </Box>
                      {subCategory.children?.length > 0 &&
                        subCategory.children.map((childCategory) => (
                          <div key={childCategory.categoryId}>
                            <Typography>{childCategory.name}</Typography>
                          </div>
                        ))}
                    </div>
                  ))}
              </DropDownContentLevel2>
            </DropDownCategoriesWrapperLevel2>
          </CategoriesItemLevel1>
          {/* Danh mục cảu Gaming Gear */}
          <CategoriesItemLevel1>
            <KeyboardAltOutlinedIcon />
            Gaming Gear
            <DropDownCategoriesWrapperLevel2>
              <DropDownContentLevel2>
                {gamingGearLevel2Data?.children?.length > 0 &&
                  gamingGearLevel2Data.children.map((subCategory) => (
                    <div key={subCategory.categoryId}>
                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {subCategory.name}
                        </Typography>
                        <KeyboardArrowRightTwoToneIcon />
                      </Box>
                      {subCategory.children?.length > 0 &&
                        subCategory.children.map((childCategory) => (
                          <div key={childCategory.categoryId}>
                            <Typography>{childCategory.name}</Typography>
                          </div>
                        ))}
                    </div>
                  ))}
              </DropDownContentLevel2>
            </DropDownCategoriesWrapperLevel2>
          </CategoriesItemLevel1>
          {/* Danh mục của Phụ Kiện */}
          <CategoriesItemLevel1>
            <BackpackOutlinedIcon />
            Phụ Kiện
            <DropDownCategoriesWrapperLevel2>
              <DropDownContentLevel2>
                {phuKienGearLevel2Data?.children?.length > 0 &&
                  phuKienGearLevel2Data.children.map((subCategory) => (
                    <div key={subCategory.categoryId}>
                      <Box sx={{ display: "flex" }}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {subCategory.name}
                        </Typography>
                        <KeyboardArrowRightTwoToneIcon />
                      </Box>
                      {subCategory.children?.length > 0 &&
                        subCategory.children.map((childCategory) => (
                          <div key={childCategory.categoryId}>
                            <Typography>{childCategory.name}</Typography>
                          </div>
                        ))}
                    </div>
                  ))}
              </DropDownContentLevel2>
            </DropDownCategoriesWrapperLevel2>
          </CategoriesItemLevel1>
          <CategoriesItemLevel1>
            <EventSeatOutlinedIcon />
            Bàn/Ghế
            <DropDownCategoriesWrapperLevel2>
              Level2-7
            </DropDownCategoriesWrapperLevel2>
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
