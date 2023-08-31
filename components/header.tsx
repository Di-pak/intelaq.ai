import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import BrandIcon from "../assets/brand-icon";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { getUser } from "@/services/users-service";
import { createTheme } from "@mui/material";

// Define the props interface

const defaultTheme = createTheme();

const Header = () => {
  let router = useRouter();
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState<any>(null);

  const style = {
    upperToolbar: {
      borderBottom: 1,
      borderColor: "divider",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      minHeight: "80px",
    },
    iconButton: {
      marginLeft: "auto",
      marginRight: "4rem",
    },
    avatarStyle: {
      marginLeft: "4rem",
      [defaultTheme.breakpoints.down("sm")]: {
        marginLeft: "0rem",
      },
    },
  };

  useEffect(() => {
    if (!user) return;
    getUser(user.uid).then((res) => {
      setUserData(res);
    });
  }, [user]);

  return (
    <Toolbar sx={style.upperToolbar}>
      <Avatar sx={style.avatarStyle} src="/broken-image.jpg" />
      <Button size="small">{userData?.name}</Button>
      <IconButton sx={style.iconButton} onClick={() => router.push("/")}>
        <BrandIcon />
      </IconButton>
    </Toolbar>
  );
};

export default Header;
