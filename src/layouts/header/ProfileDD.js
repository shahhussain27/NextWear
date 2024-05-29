import React from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import userimg from "../../../assets/images/users/user2.jpg";
import {
  Box,
  Menu,
  Typography,
  Link,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
const ProfileDD = () => {

  return (
    <>
      <Box p={2} className="flex items-center gap-2">
        <p className="text-black">Hi Admin</p>
        <Link href="/admin/login">
          <Button
            fullWidth
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Logout
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default ProfileDD;
