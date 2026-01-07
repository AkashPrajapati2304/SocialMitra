import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  Input,
  Button,
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContactsWidget = ({ allUsers }) => {
  console.log(`all usersa : `, allUsers.users);
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [avatar, setAvatar] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [lastMessage, setLastMessage] = useState("Hello");
  const [isTyping, setIsTyping] = useState(true);
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <>
      <div className="w-64 md:w-80 bg-white border-r flex flex-col h-full">
        <div className="p-4 border-b">
          <Input
            type="text"
            placeholder="Search conversations"
            className="w-full"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {allUsers.users.map((conversation) => (
            <div className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out rounded-lg cursor-pointer">
              <div className="w-10 h-10 mr-4 rounded-full border-2 border-red">
                <img
                  src={`http://localhost:4001/assets/${conversation.picturePath}`}
                  alt="user"
                  // width={40}
                  className="rounded-full border-2 border-red w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />

                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {conversation.firstName} {conversation.lastName}
                  </h3>
                  <span className="text-xs text-gray-500">10:10PM</span>
                </div>
                <p className="mt-1 text-sm text-gray-600 truncate">
                  {isTyping ? (
                    <span className="text-blue-500">Typing...</span>
                  ) : (
                    lastMessage
                  )}
                </p>
              </div>
              <div className="ml-4 flex flex-col items-end">
                {unreadCount > 0 ? (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500 rounded-full">
                    {unreadCount}
                  </span>
                ) : (
                  <></>
                  // <CheckCheck className="text-green-500" size={16} />
                )}
              </div>
              <hr />
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <Button className="w-full">
            {/* <Plus className="h-4 w-4 mr-2" /> */}
            New Chat
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatContactsWidget;
