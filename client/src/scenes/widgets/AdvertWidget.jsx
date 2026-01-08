import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // 1. Define your ads data here
  // Make sure these image files exist in your server's public/assets folder!
  const ads = [
    {
      company: "MikaCosmetics",
      website: "mikacosmetics.com",
      description:
        "Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating skin and shining like light.",
      image: "info4.jpeg", // Existing image
    },
    {
      company: "Burger King",
      website: "burgerking.com",
      description:
        "Taste the flame-grilled difference. Fresh ingredients and the best burgers in town delivered to you.",
      image: "info3.jpeg", // You need to ensure this image exists
    },
    {
      company: "Nike",
      website: "nike.com",
      description:
        "Just Do It. Innovative sportswear and footwear for every athlete.",
      image: "info2.jpeg", // You need to ensure this image exists
    },
  ];

  // 2. State to track the current index
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3. Effect to cycle through ads every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [ads.length]);

  const currentAd = ads[currentIndex];

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      
      {/* 4. Display Dynamic Content */}
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`http://localhost:4001/assets/${currentAd.image}`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>{currentAd.company}</Typography>
        <Typography color={medium}>{currentAd.website}</Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        {currentAd.description}
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;