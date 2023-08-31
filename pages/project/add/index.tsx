import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Grid,
  Box,
  IconButton,
  Typography,
  Button,
  Stepper,
  StepLabel,
  Step,
  TextField,
  CircularProgress,
  Modal,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "../../../assets/closeIcon";
import InstagramIcon from "../../../assets/instagramIcon";
import StepperIcon from "../../../assets/stepperIcon";
import Header from "../../../components/header";
import SocialRadioBox from "../../../components/socialradioBox";
import StepperUncheckedIcon from "../../../assets/stepperuncheck";
import TwitterIcon from "@/assets/twitterIcon";
import FacebookIcon from "@/assets/facebookIcon";
import LinkedInIcon from "@/assets/linkedinIcon";
import TiktokIcon from "@/assets/tiktokIcon";
import SnapchatIcon from "@/assets/snapchatIcon";
import RightarrowIcon from "@/assets/rightarrowIcon";
import YellowBarVerticalIcon from "@/assets/yellowBar";
import LeftarrowIcon from "@/assets/leftarrowIcon";
import CloudIcon from "@/assets/cloudIcon";
import CheckmarkIcon from "@/assets/checkmarkIcon";
import {
  addProject,
  updateProject,
  uploadProjectImage,
} from "@/services/project-service";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { fileToDataURL } from "@/utils";
import { useUserGetBrands } from "@/services/brand-service";
import { getUser } from "@/services/users-service";

const defaultTheme = createTheme();

const steps = ["Step 1", "Step 2", "Step 3"];
const MaxWordLimit = 3000;

const stepIcons = [
  [StepperUncheckedIcon, StepperUncheckedIcon, StepperIcon],
  [StepperUncheckedIcon, StepperIcon, StepperUncheckedIcon],
  [StepperIcon, StepperUncheckedIcon, StepperUncheckedIcon],
];
const radioBoxesData = [
  {
    label: "انستجرام",
    value: "انستجرام",
    buttonText: "بارسال",
    icon: <InstagramIcon />,
  },
  {
    label: "تويتر",
    value: "تويتر",
    buttonText: "صورة غلاف",
    icon: <TwitterIcon />,
  },
  {
    label: "فيسبوك",
    value: "فيسبوك",
    buttonText: "بوست",
    icon: <FacebookIcon />,
  },
  {
    value: "linkedin",
    label: "لينكد ان",
    buttonText: "بوست",
    icon: <LinkedInIcon />,
  },
  {
    label: "تيك توك",
    value: "تيك توك",
    buttonText: "بوست",
    icon: <TiktokIcon />,
  },
  {
    label: "سناب شات",
    value: "سناب شات",
    buttonText: "ستوري",
    icon: <SnapchatIcon />,
  },
];

interface ProjecctCreationProps {
  data: FormDataState | null;
  isEdit: boolean;
}

interface FormDataState {
  id?: string;
  title: string;
  image: any;
  details: string;
  demographic: string;
  platform: string;
  brandId: string;
  brandName: string;
}

const intialFormData = {
  title: "",
  image: null,
  details: "",
  demographic: "",
  platform: "انستجرام",
  brandId: "",
  brandName: "",
};

export default function ProjectSubmission({
  data,
  isEdit,
}: ProjecctCreationProps) {
  const [formData, setFormData] = useState<FormDataState>(intialFormData);
  const [formDataError, setFormDataError] = useState<any>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [step, setStep] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [brandData, isLoading] = useUserGetBrands(user?.uid);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (data && isEdit) {
      setFormData({ ...data });
    }
  }, [data]);

  useEffect(() => {
    getUser(user?.uid as string).then((res) => {
      setUserData(res);
    });
  }, [user]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
      <Container>
        <Grid container justifyContent="center" wrap="nowrap">
          <Grid item xs={12} md={6} lg={4} xl={4} style={{ order: 2 }} sx={{[defaultTheme.breakpoints.down("sm")]: {display:'none'}}}>
            <Box sx={style.rightSection} dir="rtl">
              <IconButton
                sx={style.closeIcon}
                onClick={() => router.push("/project")}
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h4" sx={style.typography}>
                انشاء مشروع
                <Box sx={style.yellowBarIcon}>
                  <YellowBarVerticalIcon />
                </Box>
              </Typography>
              <Typography variant="subtitle2" sx={style.typography4} dir="rtl">
                كل ما تحتاجه هو 10 دقائق لتحصل على إعلانات <br />
                مبتكرة لعلامتك التجارية
              </Typography>
              <Box sx={style.imageWrapper}>
                <Box
                  sx={{ ...style.image, top: step === 1 ? "17rem" : "10rem" }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={8} mr={8} style={{ order: 1 }}>
            <Box sx={{ width: "100%", marginTop: "4rem" }}>
              <Stepper activeStep={step} alternativeLabel>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={stepIcons[step][index]} />
                  </Step>
                ))}
              </Stepper>
            </Box>
            {step === 0 && renderFirstStep()}
            {step === 1 && renderSecondStep()}
            {step === 2 && renderThirdStep()}

            <Box sx={{ display: "flex", gap: "1rem", marginTop: "40px" }}>
              {step < 2 && (
                <StyledButton
                  variant="contained"
                  startIcon={<RightarrowIcon />}
                  onClick={handleNextClick}
                >
                  استمرار
                </StyledButton>
              )}
              {step > 0 && (
                <Button
                  variant="text"
                  style={{ color: "#24B1BE" }}
                  endIcon={<LeftarrowIcon />}
                  onClick={() => setStep(step - 1)}
                >
                  تراجع
                </Button>
              )}
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
              src={formData.image?.src || formData.image}
              width="auto"
              height={400}
            />
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
  function renderFirstStep() {
    return (
      <Box
        sx={{
          ...style.leftSection,
        }}
      >
        <Box dir="rtl" sx={{ marginBottom: "32px" }}>
          <StyledTypography>قم باختيار حجم المشروع</StyledTypography>
        </Box>
        <Grid container spacing={2} dir="rtl">
          {radioBoxesData.map((data, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={4}>
              <SocialRadioBox
                {...data}
                checked={formData.platform == data.value}
                onChange={() =>
                  setFormData({ ...formData, platform: data.value })
                }
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }
  function renderSecondStep() {
    return (
      <Box
        dir="rtl"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          marginTop: "4rem",
        }}
      >
        <BoxHeader>
          <StyledTypography>العلامات التجارية</StyledTypography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.brandId}
            label="Age"
            disabled={isLoading}
            sx={style.customInput}
            onChange={(e: any) => {
              setFormData({
                ...formData,
                brandId: e.target.value,
                brandName: brandData?.find((item) => item.id == e.target.value)
                  ?.name,
              });
            }}
          >
            {brandData?.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </BoxHeader>
        <BoxHeader>
          <StyledTypography>عبارة لافتة</StyledTypography>
          <TextField
            fullWidth
            name="title"
            value={formData?.title}
            onChange={handleChangeField}
            error={formDataError?.title}
            placeholder=""
            sx={style.customInput}
            dir="rtl"
          />
        </BoxHeader>
        <BoxHeader>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <StyledTypography>تحميل الصورة</StyledTypography>
            {(formData?.image?.name || formData.image) && (
              <Box display="flex" alignItems="center" gap={0.5}>
                <Button onClick={handleOpen} sx={{ padding: 0 }}>
                  {" "}
                  تظهر الصورة
                </Button>
                <TaskAltIcon sx={{ color: "#4fe38f" }} />
              </Box>
            )}
          </Box>
          <TextField
            dir="rtl"
            fullWidth
            // value={formData?.image?.name || formData.image}
            sx={style.customInputFile}
            placeholder="قم برفع الصورة"
            onClick={() => fileInputRef.current?.click()}
            InputProps={{
              startAdornment: <CloudIcon />,
              endAdornment: (
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              ),
            }}
          />
        </BoxHeader>
        <BoxHeader>
          <StyledTypography>وصف المشروع</StyledTypography>
          <StyledTextarea
            name="details"
            value={formData?.details}
            onChange={handleChangeField}
            style={{
              border: formDataError?.details
                ? "1px solid #D54930"
                : "1px solid #F7F7F7",
            }}
            aria-label="styled textarea"
            dir="rtl"
          />
          <StyledCharacterCount>
            {MaxWordLimit - formData?.details?.length}
          </StyledCharacterCount>
        </BoxHeader>
        <BoxHeader>
          <StyledTypography>الجمهور المستهدف</StyledTypography>
          <StyledTextarea
            name="demographic"
            value={formData?.demographic}
            onChange={handleChangeField}
            style={{
              border: formDataError?.demographic
                ? "1px solid #D54930"
                : "1px solid #F7F7F7",
            }}
            aria-label="styled textarea"
            dir="rtl"
          />
          <StyledCharacterCount>
            {MaxWordLimit - formData?.demographic?.length}
          </StyledCharacterCount>
        </BoxHeader>
      </Box>
    );
  }
  function renderThirdStep() {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "104px",
          gap: "58px",
          textAlignLast: "center",
        }}
      >
        <CheckmarkIcon />
        <Box>
          <Typography variant="h5" sx={{ marginTop: "2rem", color: "#24B1BE" }}>
            شكرا لك!
          </Typography>
          <StyledTypography>
            سوف نقوم بارسال ملفات التصميم عبر البريد الالكتروني خلال 3 أيام
          </StyledTypography>
        </Box>
        <Box>
          <StyledButton variant="contained" onClick={handleSubmitProject}>
            {isAdding ? (
              <CircularProgress size={28} style={{ color: "#fff" }} />
            ) : (
              <Typography>إنشاء</Typography>
            )}
          </StyledButton>
        </Box>
      </Box>
    );
  }
  function handleNextClick() {
    if (step == 1 && !formDataValidation()) return;
    if (step < steps.length - 1) {
      setStep((prevStep) => prevStep + 1);
    }
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      let url = await fileToDataURL(file);
      setFormData({
        ...formData,
        image: { src: url, file: file },
      });
    }
  }

  function handleChangeField(e: any) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormDataError({ ...formDataError, [e.target.name]: "" });
  }

  async function handleAddBrand() {
    let id = nanoid();
    setIsAdding(true);
    let logoUrl = "";
    if (formData?.image?.file) {
      let fileData = await uploadProjectImage(formData.image.file, id);
      logoUrl = fileData.src;
    }
    addProject(id, {
      ...formData,
      id,
      image: logoUrl,
      userId: user?.uid,
      status: "active",
      userName: userData.name,
      userEmail: userData.email,
      step: "project_submit",
    })
      .then(() => {
        router.push("/project");
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
    if (formData?.image?.file) {
      let fileData = await uploadProjectImage(formData.image.file, formData.id);
      logoUrl = fileData.src;
    }
    updateProject(formData.id, {
      ...formData,
      image: logoUrl || formData.image,
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

  async function handleSubmitProject() {
    if (!isEdit) {
      handleAddBrand();
    } else {
      handleEditBrand();
    }
  }

  function formDataValidation() {
    let isValid = true;
    if (!formData.title.trim()) {
      setFormDataError((prevState: any) => ({
        ...prevState,
        title: "Please enter title",
      }));
      isValid = false;
    }
    if (!formData.image) {
      setFormDataError((prevState: any) => ({
        ...prevState,
        image: "Please enter image",
      }));
      isValid = false;
    }
    if (!formData.details.trim()) {
      setFormDataError((prevState: any) => ({
        ...prevState,
        details: "Please enter detail",
      }));
      isValid = false;
    }
    if (!formData.demographic.trim()) {
      setFormDataError((prevState: any) => ({
        ...prevState,
        demographic: "Please enter demographic",
      }));
      isValid = false;
    }
    return isValid;
  }
}

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#24B1BE",
  padding: "8px 6px",
  "&:hover": {
    backgroundColor: "#24B1BE",
  },
}));
const BoxHeader = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  position: "relative",
}));
const StyledCharacterCount = styled("div")({
  position: "absolute",
  bottom: "1.5rem",
  left: "1.5rem",
  color: "#BFBFBF",
  fontSize: "16px",
});

const StyledTextarea = styled("textarea")(({ theme }) => ({
  backgroundColor: "#F7F7F7",
  borderRadius: "10px",
  lineHeight: "1.5",
  padding: "1rem",
  height: "208PX",
  resize: "none",
  "&:focus": {
    outline: "none",
  },
  "&:hover": {
    outline: "none",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: "#949494",
  whiteSpace: "nowrap",
  marginTop: "16px",
}));

const style = {
  rightSection: {
    position: "relative",
    backgroundColor: "#F7F7F7",
    maxHeight: "54rem",
    height: "100%",
    width: "100%",
    marginTop: "3vh",
    marginBottom: "2vh",
    borderRadius: "22px",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  leftSection: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    left: "0",
    [defaultTheme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
  },
  closeIcon: {
    position: "absolute",
    top: "3vh",
    left: "3vh",
  },
  typography: {
    position: "absolute",
    top: "10vh",
    right: "3vh",
    color: "#24B1BE",
  },
  modalStyle: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 4,
  },
  yellowBarIcon: {
    marginRight: "-1.5rem",
    marginTop: "-3.5rem",
  },

  typography4: {
    position: "absolute",
    top: "18vh",
    right: "3vh",
    color: "#979797",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    paddingTop: "100%",
  },
  image: {
    position: "absolute",
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: 'url("/intelaqfill_3.png")',
    backgroundSize: "cover",
  },
  customInput: {
    backgroundColor: "#F7F7F7",
    borderRadius: "10px",
    height: "56px",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "F7F7F7",
    },
    "& .Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#d32f2f",
    },
  },
  customInputFile: {
    backgroundColor: "#F7F7F7",
    borderRadius: "10px",
    border: "1px  dashed #DADADA",
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#d32f2f",
    },
  },
};
