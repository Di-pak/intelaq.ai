import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, createTheme, useTheme } from "@mui/material";
import BrandIcon from "@/assets/brand-icon";
import styled from "@emotion/styled";
import BookmarkIcon from "@/assets/bookmarkIcon";
import PresentationIcon from "@/assets/presentationIcon";
import SettingIcon from "@/assets/settingIcon";
import { useRouter } from "next/router";
import MenuIcon from "@/assets/menu-icon";

const defaultTheme = createTheme();

export default function Layout({ children }: { children: any }) {
  const theme = useTheme();
  const router = useRouter();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = useState(false);

  const toggleDrawer = (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  return (
    <div style={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" style={classes.appBar}>
        <Toolbar sx={classes.upperToolbar}>
          <Avatar sx={classes.avatarStyle} src="/broken-image.jpg" />
          <Button size="small">Dipak Gupta</Button>
          <IconButton sx={classes.iconButton}>
            <BrandIcon />
          </IconButton>
          <StyledComponent onClick={toggleDrawer} style={classes.menuButton}>
            <MenuIcon />
          </StyledComponent>
        </Toolbar>
      </AppBar>
      <Drawer
        style={classes.drawer}
        variant={isMdUp ? "permanent" : "temporary"}
        classes={{
          paper: "200",
        }}
        anchor="right"
        open={open}
        onClose={toggleDrawer}
      >
        <StyledList>
          <WrapperDiv>
            <IconButton onClick={() => router.push("/")}>
              <BookmarkIcon selected={router.pathname === "/"} />
            </IconButton>
            {/* Use the StyledSelectedTypography conditionally */}
            {router.pathname === "/" ? (
              <StyledSelectedTypography variant="subtitle2">
                العلامات التجارية
              </StyledSelectedTypography>
            ) : (
              <StyledTypography variant="subtitle2">
                العلامات التجارية
              </StyledTypography>
            )}

            <IconButton onClick={() => router.push("/project")}>
              <PresentationIcon selected={router.pathname === "/project"} />
            </IconButton>
            {router.pathname === "/project" ? (
              <StyledSelectedTypography variant="subtitle2">
                المشاريع
              </StyledSelectedTypography>
            ) : (
              <StyledTypography variant="subtitle2">المشاريع</StyledTypography>
            )}

            <IconButton
            // onClick={() => router.push("/setting")}
            >
              <SettingIcon selected={router.pathname === "/setting"} />
            </IconButton>
            {router.pathname === "/setting" ? (
              <StyledSelectedTypography variant="subtitle2">
                الاعدادات
              </StyledSelectedTypography>
            ) : (
              <StyledTypography variant="subtitle2">الاعدادات</StyledTypography>
            )}
          </WrapperDiv>
        </StyledList>
      </Drawer>
      <main style={classes.content}>{children}</main>
    </div>
  );
}

const WrapperDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StyledComponent = styled(Box)({
  width: 88,
  minHeight: 75,
  backgroundColor: "#24B1BE",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  right: 0,
  top: 0,
});

const StyledTypography = styled(Typography)({
  marginBottom: "1rem",
  color: "#979797",
  width: "42px",
});

const StyledSelectedTypography = styled(Typography)({
  marginBottom: "1rem",
  color: "#24B1BE",
  width: "42px",
});

const StyledList = styled(List)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "88px",
});

const classes = {
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: defaultTheme.zIndex.drawer + 1,
    backgroundColor: "#fff",
  },
  drawer: {
    flexShrink: 0,
  },
  menuButton: {
    [defaultTheme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: {
    ...defaultTheme.mixins.toolbar,
    [defaultTheme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: defaultTheme.palette.background.default,
    padding: defaultTheme.spacing(3),
    marginTop: "50px",
  },
  upperToolbar: {
    borderBottom: 1,
    borderColor: "divider",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    minHeight: "80px",
  },
  iconButton: {
    marginLeft: "auto",
    marginRight: "4rem",
    [defaultTheme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  avatarStyle: {
    marginLeft: "4rem",
    [defaultTheme.breakpoints.down("sm")]: {
      marginLeft: "0rem",
    },
  },
};
