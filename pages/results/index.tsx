// Result.tsx

import React, { useState } from "react";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Grid,
  Typography,
  Button,
  Toolbar,
} from "@mui/material";

import Header from "../../components/header";
import { useRouter } from "next/router";
import ForwardIcon from "@/assets/forwardIcon";
import DownloadAllIcon from "@/assets/downloadIcon";
import ResultRadioBox from "@/components/resultRadioBox";


const defaultTheme = createTheme();
const resultBoxesData = [
  {
    value: "Option1",
    image:
      "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80 388w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80 688w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80 776w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80 988w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80 1288w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80 1376w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80 1588w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80 1888w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80 1976w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2188&q=80 2188w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2488&q=80 2488w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2576&q=80 2576w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2788&q=80 2788w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3088&q=80 3088w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3176&q=80 3176w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3388&q=80 3388w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3688&q=80 3688w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3745&q=80 3745w",
  },
  {
    value: "Option2",
    image:
      "https://plus.unsplash.com/premium_photo-1679456062579-cc90340801db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhlYWRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    value: "Option3",
    image:
      "https://images.pexels.com/photos/6686448/pexels-photo-6686448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    value: "Option4",
    image:
      "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80 388w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80 688w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80 776w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80 988w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80 1288w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80 1376w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80 1588w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80 1888w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80 1976w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2188&q=80 2188w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2488&q=80 2488w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2576&q=80 2576w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2788&q=80 2788w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3088&q=80 3088w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3176&q=80 3176w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3388&q=80 3388w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3688&q=80 3688w, https://images.unsplash.com/photo-1612444530582-fc66183b16f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3745&q=80 3745w",
  },
  {
    value: "Option5",
    image:
      "https://plus.unsplash.com/premium_photo-1679456062579-cc90340801db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhlYWRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    value: "Option6",
    image:
      "https://images.pexels.com/photos/6686448/pexels-photo-6686448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

export default function CreateBrand() {
  const [selectedOption, setSelectedOption] = useState("Option1");
  const router = useRouter();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header username="اسم المستخدم" avatarSrc="/broken-image.jpg" />
      <Grid container>
        <StyledToolbar>
          <StyledButton variant="contained">
            <DownloadAllIcon />
            تحميل الكل{" "}
          </StyledButton>
          <Typography
            component="h1"
            variant="h4"
            color="#24B1BE"
            align="right"
            noWrap
            sx={{ flex: 1 }}
          >
            اسم المشروع
          </Typography>
          <ForwardIcon />
        </StyledToolbar>
      </Grid>

      <Container>
        <Grid container dir="rtl">
          {resultBoxesData.map((data, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={4} mt={4}>
              <ResultRadioBox
                {...data}
                checked={selectedOption === data.value}
                onChange={() => setSelectedOption(data.value)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

const StyledToolbar = styled(Toolbar)({
  backgroundColor: "#F7F7F7",
  borderRadius: "20px",
  width: "100%",
  height: "8rem",
  margin: "2rem 2rem",
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#24B1BE",
  padding: "0.5rem 1rem",
  margin: "0 0 0 3rem",
  "&:hover": {
    backgroundColor: "#24B1BE",
  },
}));
