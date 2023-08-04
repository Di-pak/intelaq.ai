import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import BrandIcon from "../assets/brand-icon";
import { useRouter } from "next/router";

// Define the props interface
interface HeaderProps {
  username: string;
  avatarSrc?: string;
}

const Header: React.FC<HeaderProps> = ({ username, avatarSrc }) => {
  let router = useRouter();
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
    },
  };

  return (
    <Toolbar sx={style.upperToolbar}>
      <Avatar sx={style.avatarStyle} src={avatarSrc} />
      <Button size="small">{username}</Button>
      <IconButton sx={style.iconButton} onClick={() => router.push("/")}>
        <BrandIcon />
      </IconButton>
    </Toolbar>
  );
};

export default Header;
