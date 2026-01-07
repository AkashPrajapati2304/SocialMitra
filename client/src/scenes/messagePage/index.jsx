import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import ChatContactsWidget from "scenes/widgets/ChatContactsWidget";

const MessagePage = () => {
  // const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [isData, setIsData] = useState(false);

  const getAllUsers = async () => {
    const response = await fetch(`http://localhost:4001/users/allusers/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(`data : `, data);
    // setUser(data);
    setIsData(true);
    setAllUsers(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {isData && <ChatContactsWidget allUsers={allUsers} />}
          {/* <ChatContactsWidget allUsers={allUsers} /> */}
          {/* <Box m="2rem 0" /> */}
          {/* <FriendListWidget userId={userId} /> */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget picturePath={user.picturePath} /> */}
          <Box m="2rem 0" />
          {/* <PostsWidget userId={userId} isProfile /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default MessagePage;
