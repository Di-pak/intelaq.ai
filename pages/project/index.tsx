import React from "react";
import BrandPresentationCard from "../../components/brandpresentationCard";
import WhiteLogo from "../../assets/whiteLogo";
import GrayLogo from "../../assets/grayLogo";
import {
  styled,
  Grid,
  Button,
  Toolbar,
  Typography,
  TextField,
  Divider,
  Box,
  createTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useUserGetProject } from "@/services/project-service";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Layout from "@/components/Layout";

const defaultTheme = createTheme();
export default function Brand() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [brandData = [], isLoading] = useUserGetProject(user?.uid);

  if (isLoading) return <p>...loading</p>;

  return (
    <Layout>
      <Container>
        <Toolbar
          sx={{
            ...style.mainToolbar,
          }}
        >
          <StyledButton
            onClick={() => {
              router.push("/project/add");
            }}
            variant="contained"
            sx={{
              [defaultTheme.breakpoints.down("sm")]: {
                marginTop: "10px",
                marginBottom: "20px",
              },
            }}
          >
            + إنشاء مشروع
          </StyledButton>

          {/* <SearchBar
            variant="outlined"
            placeholder="ابحث..."
            dir="rtl"
            sx={{
              [defaultTheme.breakpoints.down("sm")]: {
                marginTop: "60px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          /> */}
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Typography
              component="h2"
              variant="h5"
              color="#24B1BE"
              align="right"
              noWrap
            >
              قائمة المشاريع
            </Typography>
            <Box
              sx={{
                [defaultTheme.breakpoints.down("md")]: {
                  display: "none",
                },
              }}
            >
              <WhiteLogo />
            </Box>
          </Box>
        </Toolbar>
        {getFilterData(brandData).length > 0 &&
          getFilterData(brandData).map((item: any, i: number) => {
            return (
              <Grid key={i} container justifyContent={"flex-end"}>
                <Box width="100%" mt={8}>
                  <Typography
                    component="h1"
                    variant="h5"
                    dir="rtl"
                    sx={{ ...style.mainTitle }}
                  >
                    {item[0].brandName}
                  </Typography>
                  <Divider variant="middle" sx={{ marginBottom: "20px" }} />
                </Box>
                {item?.map((brand: any) => (
                  <BrandPresentationCard key={brand.id} presentation={brand} />
                ))}
              </Grid>
            );
          })}
        {!brandData?.length && (
          <NoBrandContainer>
            <StyledGrayLogo />
            <Typography variant="h6" mt={1} color="#5C5C5C">
              لا يوجد اي مشاريع قمت بانشاءها
            </Typography>
            <Grid mt={7}>
              <StyledButton
                variant="contained"
                onClick={() => {
                  router.push("/project/add");
                }}
              >
                + إنشاء مشروع
              </StyledButton>
            </Grid>
          </NoBrandContainer>
        )}
      </Container>
    </Layout>
  );

  function getFilterData(data: any) {
    const groupedByBrandId = data.reduce((acc: any, item: any) => {
      if (!acc[item.brandId]) {
        acc[item.brandId] = [];
      }
      acc[item.brandId].push(item);
      return acc;
    }, {});

    const arrayOfArrays = Object.values(groupedByBrandId);
    return arrayOfArrays;
  }
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
  [defaultTheme.breakpoints.down("md")]: {
    marginRight: "0.5rem",
    marginLeft: 0,
  },
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
    display: "flex",
    justifyContent: "space-between",
    gap: 4,
    flexWrap: "wrap",
    [defaultTheme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
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
