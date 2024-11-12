import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, MenuItem, Select, FormControl, Typography } from "@mui/material";

const LocationForm = ({ onLocationChange, locationErrors }) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching location data", error);
      }
    };
    fetchData();
  }, []);

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);  
    const selectedCityData = cities.find((city) => city.Name === cityName); 
    setDistricts(selectedCityData ? selectedCityData.Districts : []);
    setWards([]);
    setSelectedDistrict("");
    setSelectedWard("");

    onLocationChange({
      city: cityName,
      district: "",
      ward: "",
    });
  };

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);  
    const selectedDistrictData = districts.find(
      (district) => district.Name === districtName 
    );
    setWards(selectedDistrictData ? selectedDistrictData.Wards : []);
    setSelectedWard("");

    onLocationChange({
      city: selectedCity,
      district: districtName,
      ward: "",
    });
  };

  const handleWardChange = (e) => {
    const wardName = e.target.value;
    setSelectedWard(wardName);  // Lưu name thay vì ID

    onLocationChange({
      city: selectedCity,
      district: selectedDistrict,
      ward: wardName,
    });
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {/* Tỉnh/Thành */}
      <FormControl fullWidth error={locationErrors.city}>
        <Select
          value={selectedCity}
          onChange={handleCityChange}
          displayEmpty
          inputProps={{ "aria-label": "Tỉnh/thành" }}
        >
          <MenuItem value="" disabled>
            Chọn tỉnh thành
          </MenuItem>
          {cities.map((city) => (
            <MenuItem key={city.Id} value={city.Name}> {/* Lấy Name làm value */}
              {city.Name}
            </MenuItem>
          ))}
        </Select>
        {locationErrors.city && (
          <Typography color="error" variant="caption">
            Vui lòng chọn tỉnh thành.
          </Typography>
        )}
      </FormControl>

      {/* Quận/Huyện */}
      <FormControl fullWidth error={locationErrors.district}>
        <Select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          displayEmpty
          inputProps={{ "aria-label": "Quận/huyện" }}
          disabled={!selectedCity}
        >
          <MenuItem value="" disabled>
            Chọn quận huyện
          </MenuItem>
          {districts.map((district) => (
            <MenuItem key={district.Id} value={district.Name}> {/* Lấy Name làm value */}
              {district.Name}
            </MenuItem>
          ))}
        </Select>
        {locationErrors.district && (
          <Typography color="error" variant="caption">
            Vui lòng chọn quận huyện.
          </Typography>
        )}
      </FormControl>

      {/* Phường/Xã */}
      <FormControl fullWidth error={locationErrors.ward}>
        <Select
          value={selectedWard}
          onChange={handleWardChange}
          displayEmpty
          inputProps={{ "aria-label": "Phường/xã" }}
          disabled={!selectedDistrict}
        >
          <MenuItem value="" disabled>
            Chọn phường xã
          </MenuItem>
          {wards.map((ward) => (
            <MenuItem key={ward.Id} value={ward.Name}> {/* Lấy Name làm value */}
              {ward.Name}
            </MenuItem>
          ))}
        </Select>
        {locationErrors.ward && (
          <Typography color="error" variant="caption">
            Vui lòng chọn phường xã.
          </Typography>
        )}
      </FormControl>
    </Box>
  );
};

export default LocationForm;
