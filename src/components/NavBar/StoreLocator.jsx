import {
  Box,
  IconButton,
  Popover,
  Typography,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { FaMapMarkerAlt } from "react-icons/fa";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useState } from "react";

export const StoreLocator = () => {
  const [storeLocalAnchorEl, setStoreLocalAnchorEl] = useState(null);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  const handleStoreLocalClick = (event) => {
    setStoreLocalAnchorEl(event.currentTarget);
  };
  const handleStoreLocalClose = () => {
    setStoreLocalAnchorEl(null);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setDistrict("");
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const cities = [
    { id: 1, city_name: "Hồ Chí Minh" },
    { id: 2, city_name: "Hà Nội" },
  ];

  const districts = [
    { id: 3, district_name: "Quận Tân Bình", cityId: 1 },
    { id: 4, district_name: "Quận Ba Đình", cityId: 2 },
  ];

  const stores = [
    {
      id: 1,
      store_name: "Xgear Tân Bình",
      address: "123 Đường Cộng Hòa, Quận Tân Bình",
      phone: "0901123456",
      opening_hours: "9:00 - 20:00",
      districtId: 3,
    },
    {
      id: 2,
      store_name: "Xgear Ba Đình",
      address: "10A1 Ngõ 49 Linh Lang, Quận Ba Đình",
      phone: "0972321881",
      opening_hours: "9:00 - 20:01",
      districtId: 4,
    },
  ];

  const filteredDistricts = districts.filter(
    (d) => d.cityId === parseInt(city)
  );

  const filteredStores = stores.filter((store) => {
    const storeDistrict = districts.find((d) => d.id === store.districtId);
    return (
      storeDistrict &&
      storeDistrict.cityId === parseInt(city) &&
      (!district || storeDistrict.id === parseInt(district))
    );
  });

  const open = Boolean(storeLocalAnchorEl);
  const id = open ? "store-local-popover" : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginRight: 2,
        height: "100%",
      }}
    >
      <IconButton
        color="inherit"
        aria-controls={id}
        onClick={handleStoreLocalClick}
        sx={{
          "&:hover": {
            borderRadius: "5px",
          },
          borderRadius: "5px",
        }}
      >
        <FaMapMarkerAlt style={{ fontSize: "20px" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 1,
          }}
        >
          <Typography variant="body2">Hệ thống</Typography>
          <Typography variant="body2">cửa hàng</Typography>
        </Box>
        <KeyboardArrowDownOutlinedIcon
          sx={{ fontSize: "16px", marginLeft: "4px" }}
        />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={storeLocalAnchorEl}
        onClose={handleStoreLocalClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "418px",
            padding: "10px 20px",
          }}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              color: "#000",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            Tìm cửa hàng gần bạn
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <Select
              value={city}
              onChange={handleCityChange}
              displayEmpty
              fullWidth
              sx={{ marginRight: "10px" }}
            >
              <MenuItem value="" disabled>
                Chọn tỉnh/thành phố
              </MenuItem>
              {cities.map((city) => (
                <MenuItem key={city.id} value={city.id}>
                  {city.city_name}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={district}
              onChange={handleDistrictChange}
              displayEmpty
              fullWidth
              disabled={!city}
            >
              <MenuItem value="" disabled>
                Chọn Quận/huyện
              </MenuItem>
              {filteredDistricts.map((district) => (
                <MenuItem key={district.id} value={district.id}>
                  {district.district_name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Danh sách cửa hàng */}
          {filteredStores.map((store) => (
            <Box
              key={store.id}
              sx={{
                backgroundColor: "#f8f8f8",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {store.store_name}
              </Typography>
              <Typography>{store.address}</Typography>
              <Typography>📞 {store.phone}</Typography>
              <Typography>
                Thời gian hoạt động: {store.opening_hours}
              </Typography>
              <Button
                size="small"
                startIcon={<FaMapMarkerAlt />}
                sx={{ padding: 0, textTransform: "none", color: "blue" }}
              >
                Chỉ đường
              </Button>
            </Box>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};
