import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  
  // Changed: renamed isImage to isAttachment to be generic
  const [isAttachment, setIsAttachment] = useState(false);
  // New State: track what type of media is being uploaded
  const [mediaType, setMediaType] = useState("image"); // "image", "video", "audio", "file"
  
  const [image, setImage] = useState(null); // This variable now holds any file (video/audio/img)
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      // "picture" is likely the field name your Multer middleware expects. 
      // Keep it as "picture" even for videos to avoid breaking the backend middleware.
      formData.append("picture", image);
      formData.append("picturePath", image.name);
      formData.append("mediaType", mediaType); // Send the type to backend
    }

    const response = await fetch(`http://localhost:4001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
    setIsAttachment(false); // Close dropzone after post
  };

  // Helper to toggle attachment modes
  const toggleAttachment = (type) => {
    if (isAttachment && mediaType === type) {
        setIsAttachment(false); // Close if clicking same icon
    } else {
        setIsAttachment(true); // Open dropzone
        setMediaType(type);
        setImage(null); // Clear previous file if switching types
    }
  };

  // Dynamic accepted files based on mode
  const getAcceptedFiles = () => {
    if (mediaType === "image") return ".jpg,.jpeg,.png";
    if (mediaType === "video") return ".mp4,.mkv,.avi";
    if (mediaType === "audio") return ".mp3,.wav,.mpeg";
    return "";
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isAttachment && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles={getAcceptedFiles()}
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add {mediaType} Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        {/* IMAGE TOGGLE */}
        <FlexBetween gap="0.25rem" onClick={() => toggleAttachment("image")}>
          <ImageOutlined sx={{ color: mediaType === "image" && isAttachment ? palette.primary.main : mediumMain }} />
          <Typography
            color={mediaType === "image" && isAttachment ? palette.primary.main : mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            {/* VIDEO TOGGLE */}
            <FlexBetween gap="0.25rem" onClick={() => toggleAttachment("video")}>
              <GifBoxOutlined sx={{ color: mediaType === "video" && isAttachment ? palette.primary.main : mediumMain }} />
              <Typography color={mediaType === "video" && isAttachment ? palette.primary.main : mediumMain} sx={{ cursor: "pointer" }}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            {/* AUDIO TOGGLE */}
            <FlexBetween gap="0.25rem" onClick={() => toggleAttachment("audio")}>
              <MicOutlined sx={{ color: mediaType === "audio" && isAttachment ? palette.primary.main : mediumMain }} />
              <Typography color={mediaType === "audio" && isAttachment ? palette.primary.main : mediumMain} sx={{ cursor: "pointer" }}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;