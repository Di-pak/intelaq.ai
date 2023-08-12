import React from "react";
import BrandBookmarkCard from "../components/brandbookmarkCard";
import WhiteLogo from "../assets/whiteLogo";
import GrayLogo from "../assets/grayLogo";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/header";
import SideDrawer from "../components/sideDrawer";
import {
  styled,
  Grid,
  Button,
  Toolbar,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/router";
import { useUserGetBrands } from "@/services/brand-service";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Brand() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [brandData, isLoading, isError] = useUserGetBrands(user?.uid);
  if (isLoading) return null;
  return (
    <Grid>
      <SideDrawer />
      <Header />
      <Container>
        <Toolbar
          sx={{
            ...style.mainToolbar,
          }}
        >
          <StyledButton
            onClick={() => {
              router.push("/brand");
            }}
            variant="contained"
          >
            + إنشاء علامة تجارية
          </StyledButton>

          <SearchBar
            variant="outlined"
            placeholder="ابحث..."
            dir="rtl"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography
            component="h2"
            variant="h5"
            color="#24B1BE"
            align="right"
            noWrap
            sx={{ flex: 1 }}
          >
            العلامات التجارية
          </Typography>
          <WhiteLogo />
        </Toolbar>
        <Grid container spacing={1} mt={4} justifyContent={"flex-end"}>
          {brandData?.map((brand: any) => (
            <BrandBookmarkCard key={brand.id} brand={brand} />
          ))}
        </Grid>
        {!brandData?.length && (
          <NoBrandContainer>
            <StyledGrayLogo />
            <Typography variant="h6" mt={1} color="#5C5C5C">
              لا يوجد اي علامة تجارية قمت بانشاءها
            </Typography>
            <Grid mt={7}>
              <StyledButton
                variant="contained"
                onClick={() => {
                  router.push("/brand");
                }}
              >
                + إنشاء علامة تجارية
              </StyledButton>
            </Grid>
          </NoBrandContainer>
        )}
      </Container>
    </Grid>
  );
}

const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  backgroundColor: "#24B1BE",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#24B1BE",
  },
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  position: "absolute",
  width: "442px",
  height: "56px",
  left: "calc(50% - 442px/2 - 91px)",
  background: "#F0F0F0",
  borderRadius: "61px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent",
    },
  },
  "& .MuiInputLabel-outlined": {
    top: 0,
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    left: 0,
  },
}));

const Container = styled("div")({
  marginRight: "6.9em",
  marginLeft: "1.5em",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
const NoBrandContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "8rem",
});

const StyledGrayLogo = styled(GrayLogo)({
  width: 70,
  height: 70,
});

const style = {
  mainToolbar: {
    backgroundColor: "#F7F7F7",
    borderRadius: "1rem",
    marginTop: "2rem",
    width: "100%",
  },

  mainStyle: {
    position: "relative",
  },
  mainTitle: {
    color: "#5C5C5C",
    marginRight: "1rem",
    marginBottom: "1rem",
  },
  subTitle: {
    color: "#5C5C5C",
    marginTop: { xs: "2rem", md: "3rem" },
    marginRight: "1rem",
    marginBottom: "1rem",
  },
};
