import React from "react";
import SettingIcon from "../assets/settingIcon";
import PresentationIcon from "../assets/presentationIcon";
import MenuIcon from "../assets/menu-icon";
import BookmarkIcon from "../assets/bookmarkIcon";
import {
  styled,
  Drawer,
  List,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";

const WrapperDiv = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StyledComponent = styled(Box)({
  width: 88,
  minHeight: 81,
  backgroundColor: "#24B1BE",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const StyledTypography = styled(Typography)({
  marginBottom: "1rem",
  color: "#979797",
});

const StyledSelectedTypography = styled(Typography)({
  marginBottom: "1rem",
  color: "#24B1BE",
});

const StyledList = styled(List)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const SideDrawer = () => {
  const router = useRouter();
  return (
    <Drawer variant="permanent" anchor="right">
      <StyledComponent>
        <MenuIcon />
      </StyledComponent>
      <StyledList>
        <WrapperDiv>
          <IconButton onClick={() => router.push("/")}>
            <BookmarkIcon selected={router.pathname === "/"} />
          </IconButton>
          {/* Use the StyledSelectedTypography conditionally */}
          {router.pathname === "/" ? (
            <StyledSelectedTypography variant="subtitle2">
              التجاريةا
              <br />
              لعلامات
            </StyledSelectedTypography>
          ) : (
            <StyledTypography variant="subtitle2">
              التجاريةا
              <br />
              لعلامات
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
              المشاريع
            </StyledSelectedTypography>
          ) : (
            <StyledTypography variant="subtitle2">المشاريع</StyledTypography>
          )}
        </WrapperDiv>
      </StyledList>
    </Drawer>
  );
};

export default SideDrawer;
