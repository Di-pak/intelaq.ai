// Result.tsx

import React, { useEffect, useState } from "react";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Grid,
  Typography,
  Button,
  Toolbar,
  Box,
} from "@mui/material";

import Header from "../../../components/header";
import { useRouter } from "next/router";
import ForwardIcon from "@/assets/forwardIcon";
import DownloadAllIcon from "@/assets/downloadIcon";
import ResultRadioBox from "@/components/resultRadioBox";
import { getProject } from "@/services/project-service";

const defaultTheme = createTheme();

export default function Results() {
  const [selectedOption, setSelectedOption] = useState("Option1");
  const [data, setData] = useState<any>(null);
  const [loading, setloading] = useState<boolean>(true);
  const router = useRouter();
  const { id }: any = router.query;

  useEffect(() => {
    if (!id) return;
    getProject(id)
      .then((res) => {
        setData(res);
        setloading(false);
      })
      .catch(() => {
        setloading(false);
      });
  }, [id]);

  if (loading) return <p>loading...</p>;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
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
          <Box
            onClick={() => {
              router.back();
            }}
          >
            <ForwardIcon />
          </Box>
        </StyledToolbar>
      </Grid>

      <Container>
        <Grid container dir="rtl">
          {data?.result_images?.map((data: any, index: number) => (
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
