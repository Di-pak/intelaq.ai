import React, { useEffect, useRef, useState } from "react";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Grid,
  Box,
  IconButton,
  Typography,
  TextField,
  FormControl,
  Button,
  CircularProgress,
  Modal,
} from "@mui/material";
import CloseIcon from "../../assets/closeIcon";
import BigwhiteIcon from "../../assets/BigwhiteIcon";
import ColorBookmark from "../../assets/colorBookmark";
import FolderIcon from "../../assets/folderIcon";
import BrushIcon from "../../assets/brushIcon";
import Header from "../../components/header";
import FileIcon from "../../assets/fileIcon";
import {
  addBrand,
  updateBrand,
  uploadBrandLogo,
} from "@/services/brand-service";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { fileToDataURL } from "@/utils";

const defaultTheme = createTheme();

interface BrandCreationProps {
  data: FormDataState | null;
  isEdit: boolean;
}

interface FormDataState {
  id?: string;
  name: string;
  logo: any;
  colorAccent: string;
  colorMaincolor: string;
  colorSecondary: string;
  description: string;
}

const initialFormData = {
  name: "",
  logo: null,
  colorAccent: "#FBCD2F",
  colorMaincolor: "#8ED1FC",
  colorSecondary: "#C4DEF6",
  description: "",
};

export default function BrandCreation({
  data = null,
  isEdit = false,
}: BrandCreationProps) {
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [formDataError, setFormDataError] = useState<any>({});
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const router = useRouter();
  const logoRef = useRef<any>();
  const [user] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (data && isEdit) {
      setFormData({ ...data });
    }
  }, [data]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
      <Container sx={{ marginTop: "40px" }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid
            item
            xs={12}
            md={6}
            lg={5}
            xl={4}
            style={{ order: 2 }}
            sx={{
              ...style.rightSection,
              [defaultTheme.breakpoints.down("md")]: {
                display: "none",
              },
            }}
          >
            <Box sx={style.rightSection} dir="rtl">
              <IconButton sx={style.closeIcon} onClick={() => router.push("/")}>
                <CloseIcon />
              </IconButton>
              <Typography variant="h5" sx={style.typography}>
                انشاء مشروع
              </Typography>
              <Typography variant="subtitle2" sx={style.typography4} dir="rtl">
                كل ما تحتاجه هو 10 دقائق لتحصل على إعلانات <br />
                مبتكرة لعلامتك التجارية
              </Typography>
              <Box sx={style.iconBox}>
                <BigwhiteIcon />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={7}
            xl={8}
            mr={8}
            sx={{
              order: 1,
              [defaultTheme.breakpoints.down("md")]: {
                mr: "none",
              },
            }}
            wrap="nowrap"
          >
            <Box sx={style.leftSection} dir="rtl">
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ marginBottom: "2.5rem" }}>
                  <FormControl fullWidth>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <ColorBookmark />
                      <StyledTypography>اسم العلامة التجارية</StyledTypography>
                    </Box>
                    <TextField
                      name="name"
                      error={formDataError?.name}
                      value={formData.name}
                      onChange={handleChangeField}
                      sx={style.customInput}
                      placeholder="اسم العلامة التجارية"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <FolderIcon />
                        <StyledTypography>
                          شعار العلامة التجارية
                        </StyledTypography>
                      </Box>
                      {(formData?.logo?.name || formData.logo) && (
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Button onClick={handleOpen} sx={{ padding: 0 }}>
                            تظهر الصورة
                          </Button>
                          <TaskAltIcon sx={{ color: "#4fe38f" }} />
                        </Box>
                      )}
                    </Box>

                    <TextField
                      dir="rtl"
                      sx={style.customInput}
                      // value={formData?.logo?.name || formData.logo}
                      placeholder="قم برفع الصورة"
                      onClick={handleBrandLogo}
                      InputProps={{
                        endAdornment: (
                          <input
                            type="file"
                            accept="image/*"
                            ref={logoRef}
                            style={{ display: "none" }}
                            onChange={async (e: any) => {
                              let file = e.target.files[0];
                              let url = await fileToDataURL(file);
                              setFormData({
                                ...formData,
                                logo: { src: url, file: file },
                              });
                            }}
                          />
                        ),
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <FormControl fullWidth>
                <BrushIcon />
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{ width: "100%" }}
                >
                  <label dir="ltr" style={style.labelStyle}>
                    <input
                      type="color"
                      style={style.colorInput}
                      value={formData.colorAccent}
                      name="colorAccent"
                      onChange={handleChangeField}
                    />
                    الاساسي
                  </label>
                  <label dir="ltr" style={style.labelStyle}>
                    <input
                      type="color"
                      style={style.colorInput}
                      value={formData.colorMaincolor}
                      name="colorMaincolor"
                      onChange={handleChangeField}
                    />
                    الثانوي
                  </label>{" "}
                  <label dir="ltr" style={style.labelStyle}>
                    <input
                      type="color"
                      style={{ ...style.colorInput, borderRadius: "50%" }}
                      value={formData.colorSecondary}
                      name="colorSecondary"
                      onChange={handleChangeField}
                    />
                    الثانوي
                  </label>
                </Box>
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <FileIcon />
                  <StyledTypography>وصف العلامة التجارية</StyledTypography>
                </Box>
                <StyledTextarea
                  aria-label="minimum height"
                  name="description"
                  value={formData.description}
                  onChange={handleChangeField}
                  rows={5}
                  placeholder="وصف العلامة التجارية"
                  style={{
                    borderColor: formDataError?.description
                      ? "red"
                      : "transparent",
                  }}
                />
              </FormControl>
              <Grid
                mt={1}
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <StyledButton variant="contained" onClick={handleSubmitBrand}>
                  {isAdding ? (
                    <CircularProgress size={28} style={{ color: "#fff" }} />
                  ) : (
                    <Typography> إنشاء</Typography>
                  )}
                </StyledButton>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style.modalStyle}>
            <img
              src={formData.logo?.src || formData.logo}
              width="auto"
              height={400}
            />
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );

  function handleChangeField(e: any) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormDataError({ ...formDataError, [e.target.name]: "" });
  }

  async function handleBrandLogo(e: any) {
    logoRef.current?.click();
  }

  function formValidation() {
    let isValid = true;
    if (!formData.name.trim()) {
      setFormDataError((prevState: any) => ({
        ...prevState,
        name: "Please Enter brand name",
      }));
      isValid = false;
    }

    if (!formData.logo) {
      setFormDataError((prevState: any) => ({
        ...prevState,
        logo: "Please select brand logo",
      }));
      isValid = false;
    }

    if (!formData.description.trim()) {
      setFormDataError((prevState: any) => ({
        ...prevState,
        description: "Please Enter brand description",
      }));
      isValid = false;
    }
    return isValid;
  }

  async function handleAddBrand() {
    let id = nanoid();
    setIsAdding(true);
    let logoUrl = "";
    if (formData?.logo?.file) {
      let fileData = await uploadBrandLogo(formData.logo.file, id);
      logoUrl = fileData.src;
    }
    addBrand(id, {
      ...formData,
      id,
      logo: logoUrl,
      userId: user?.uid,
      status: "active",
    })
      .then(() => {
        router.push("/");
        setIsAdding(false);
      })
      .catch(() => {
        console.log("catch");
        setIsAdding(false);
      });
  }

  async function handleEditBrand() {
    setIsAdding(true);
    if (!formData.id) return;
    let logoUrl = "";
    if (formData?.logo?.file) {
      let fileData = await uploadBrandLogo(formData.logo.file, formData.id);
      logoUrl = fileData.src;
    }
    updateBrand(formData.id, { ...formData, logo: logoUrl || formData.logo })
      .then(() => {
        router.push("/");
        setIsAdding(false);
      })
      .catch(() => {
        console.log("catch");
        setIsAdding(false);
      });
  }

  async function handleSubmitBrand() {
    if (!formValidation()) return;
    if (!isEdit) {
      handleAddBrand();
    } else {
      handleEditBrand();
    }
  }
}

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#24B1BE",
  justifyContent: "",
  "&:hover": {
    backgroundColor: "#24B1BE",
  },
}));
const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "#949494",
}));

const StyledTextarea = styled("textarea")(({ theme }) => ({
  marginTop: "15px",
  backgroundColor: "#F7F7F7",
  borderColor: "transparent",
  padding: "12px",
  borderRadius: "10px",
  transition: "border 0.2s ease",
  "&:hover": {
    borderColor: "transparent",
  },
  "&:focus": {
    outline: "none",
    borderColor: "transparent",
  },
}));
const style = {
  rightSection: {
    position: "relative",
    backgroundColor: "#F7F7F7",
    minHeight: "80vh",
    height: "100%",
    width: "100%",
    borderRadius: "22px",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  leftSection: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    top: "3vh",
    left: "3vh",
  },
  typography: {
    position: "absolute",
    top: "6vh",
    right: "3vh",
    color: "#24B1BE",
  },
  typography4: {
    position: "absolute",
    top: "15vh",
    right: "3vh",
    color: "#979797",
  },
  iconBox: {
    position: "absolute",
    left: "0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  customInput: {
    marginTop: "15px",
    color: "#949494",
    backgroundColor: "#F7F7F7",
    borderRadius: "10px",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
  },
  placeholder: {
    color: "#D9D9D9",
  },
  colorInput: {
    border: "none",
    padding: 0,
    boxShadow: "none",
    width: "30px",
    height: "30px",
  },
  labelStyle: {
    marginTop: "1rem",
    marginBottom: "2rem",
    width: "100%",
    color: "#949494",
    backgroundColor: "#F7F7F7",
    padding: "15px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalStyle: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 4,
  },
};
