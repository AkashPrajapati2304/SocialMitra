import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        // 1. FIX THE HEIGHT: 
        // We set the container height to the viewport height minus the Navbar/Padding (approx 100px).
        // We hide overflow on the parent so the whole page doesn't scroll.
        height={isNonMobileScreens ? "calc(100vh - 100px)" : "auto"}
        sx={{
          overflow: "hidden", 
          position: "sticky", // Ensures the container stays put
        }}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          // 2. SCROLLABLE MIDDLE SECTION:
          // We set height to 100% to fill the parent.
          // We allow Y-axis scrolling.
          // We add CSS to hide the scrollbar visually.
          sx={isNonMobileScreens ? {
            height: "100%", 
            overflowY: "scroll",
            // Hide Scrollbar for Chrome/Safari/Opera
            "&::-webkit-scrollbar": {
              display: "none",
            },
            // Hide Scrollbar for Firefox
            "scrollbarWidth": "none",
            // Hide Scrollbar for IE/Edge
            "-ms-overflow-style": "none", 
          } : undefined}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;