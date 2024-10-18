import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const sliderImages = [
  {
    src: "https://file.hstatic.net/200000837185/file/1200x450_main_1024x1024.png",
    alt: "Slider 1",
  },
  {
    src: "https://file.hstatic.net/200000837185/file/rapoo_mt510pro_1024x1024.jpg",
    alt: "Slider 2",
  },
  {
    src: "https://file.hstatic.net/200000837185/file/sale_10-10_1024x1024.jpg",
    alt: "Slider 3",
  },
  {
    src: "https://file.hstatic.net/200000837185/file/laptop_lenovo_loq_1024x1024.jpg",
    alt: "Slider 4",
  },
];

// Custom Next Arrow Component
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        zIndex: 1,
        width: "40px",
        height: "40px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "50%",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

// Custom Prev Arrow Component
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        zIndex: 1,
        width: "40px",
        height: "40px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "50%",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
};

export const ProductSlider = () => {
  const settings = {
    dots: true, // Hiển thị phân trang
    infinite: true, // Vòng lặp
    speed: 500, // Thời gian chuyển slide
    slidesToShow: 1, // Số lượng slide hiển thị
    slidesToScroll: 1, // Số lượng slide chuyển khi scroll
    autoplay: true, // Tự động chuyển slide
    autoplaySpeed: 2500, // Thời gian giữa mỗi lần chuyển
    arrows: true, // Hiển thị nút điều hướng
    nextArrow: <NextArrow />, // Sử dụng nút điều hướng "Next" tùy chỉnh
    prevArrow: <PrevArrow />, // Sử dụng nút điều hướng "Prev" tùy chỉnh
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1220px",
        padding: "20px 0",
        position: "relative",
      }}
    >
      <Slider {...settings}>
        {sliderImages.map((image, index) => (
          <Box key={index}>
            <img
              src={image.src}
              alt={image.alt}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
