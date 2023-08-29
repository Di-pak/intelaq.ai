import React,{useState,useEffect} from "react";
import SettingIcon from "../assets/settingIcon";
import PresentationIcon from "../assets/presentationIcon";
import MenuIcon from "../assets/menu-icon";
import BookmarkIcon from "../assets/bookmarkIcon";
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import {
  styled,
  Drawer,
  List,
  Typography,
  IconButton,
  Box,
  createTheme,
   useTheme 
} from "@mui/material";
import { useRouter } from "next/router";
import { AppBarProps as MuiAppBarProps, AppBar as MuiAppBar } from '@mui/material';

import Divider from '@mui/material/Divider';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const drawerWidth = 240;
const defaultTheme = createTheme();
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const style={
  hideSection: {
      
    [defaultTheme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  hideMobileSection:
  {
    
      
      [defaultTheme.breakpoints.down("lg")]: {
        display: "block",
      },
  }
  }

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
});


const SideDrawer = () => {
 

  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  
  return (
    <Drawer variant="permanent" anchor="right" sx={{
            ...style.hideSection,
          }}>
      <StyledComponent >
        <MenuIcon  />
      </StyledComponent>
      
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
   
    // <Box sx={{ ...style.hideSection,display: 'flex' }}>
    // <CssBaseline />
    // <AppBar position="fixed" open={open}>
    //   <Toolbar>
    //     <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
    //       Persistent drawer
    //     </Typography>
    //     <IconButton
    //       color="inherit"
    //       aria-label="open drawer"
    //       edge="end"
    //       onClick={handleDrawerOpen}
    //       sx={{ ...(open && { display: 'none' }) }}
    //     >
    //       <MenuIcon />
    //     </IconButton>
    //   </Toolbar>
    // </AppBar>
    // <Main open={open}>
    //   <DrawerHeader />
   
  
       
    //   </Main>
    //   <Drawer
    //     sx={{
    //       width: drawerWidth,
    //       flexShrink: 0,
    //       '& .MuiDrawer-paper': {
    //         width: drawerWidth,
    //       },
    //     }}
    //     variant="persistent"
    //     anchor="right"
    //     open={open}
    //   >
    //     <DrawerHeader>
    //       <IconButton onClick={handleDrawerClose}>
    //         {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    //       </IconButton>
    //     </DrawerHeader>
    //     <Divider />
    //     <StyledList>
    //     <WrapperDiv>
    //       <IconButton onClick={() => router.push("/")}>
    //         <BookmarkIcon selected={router.pathname === "/"} />
    //       </IconButton>
    //       {/* Use the StyledSelectedTypography conditionally */}
    //       {router.pathname === "/" ? (
    //         <StyledSelectedTypography variant="subtitle2">
    //           العلامات التجارية
    //         </StyledSelectedTypography>
    //       ) : (
    //         <StyledTypography variant="subtitle2">
    //           العلامات التجارية
    //         </StyledTypography>
    //       )}

    //       <IconButton onClick={() => router.push("/project")}>
    //         <PresentationIcon selected={router.pathname === "/project"} />
    //       </IconButton>
    //       {router.pathname === "/project" ? (
    //         <StyledSelectedTypography variant="subtitle2">
    //           المشاريع
    //         </StyledSelectedTypography>
    //       ) : (
    //         <StyledTypography variant="subtitle2">المشاريع</StyledTypography>
    //       )}

    //       <IconButton
    //       // onClick={() => router.push("/setting")}
    //       >
    //         <SettingIcon selected={router.pathname === "/setting"} />
    //       </IconButton>
    //       {router.pathname === "/setting" ? (
    //         <StyledSelectedTypography variant="subtitle2">
    //           الاعدادات
    //         </StyledSelectedTypography>
    //       ) : (
    //         <StyledTypography variant="subtitle2">الاعدادات</StyledTypography>
    //       )}
    //     </WrapperDiv>
    //   </StyledList> 
    //   </Drawer>
    // </Box>
    
  );
};

export default SideDrawer;
