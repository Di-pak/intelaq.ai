import styled from "@emotion/styled";
import {
  Box,
  Container,
  FormControl,
  Grid,
  Typography,
  InputAdornment,
  Button,
  Divider,
  Snackbar,
  CircularProgress,
  Alert,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  authConfig,
  fontFamily,
  intialSignUpFormData,
} from "../../config/authConfig";
import TextField from "@mui/material/TextField";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { BiLogoGoogle, BiLogoFacebook } from "react-icons/bi";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { addUser } from "@/services/users-service";
import { useRouter } from "next/router";

function Register() {
  const [formData, setFormData] = useState(intialSignUpFormData);
  let router = useRouter();
  const [formDataError, setFormDataError] = useState<any>({});
  const handleFieldChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormDataError({ ...formDataError, [e.target.name]: "" });
  };
  const [
    createUserWithEmailAndPassword,
    registeredUser,
    registerIsLoading,
    registerError,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [signInWithGoogle, gooleUserAfterSingIn, isloading, isError] =
    useSignInWithGoogle(auth);

  useEffect(() => {
    if (!registeredUser?.user) return;
    const { email, name } = formData;
    addUser(registeredUser.user.uid, {
      id: registeredUser.user.uid,
      email,
      name,
      status: "active",
    }).then(() => {
      router.push("/");
    });
  }, [registeredUser]);

  useEffect(() => {
    if (!gooleUserAfterSingIn?.user) return;
    const { uid, email, displayName } = gooleUserAfterSingIn.user;
    addUser(gooleUserAfterSingIn.user.uid, {
      id: uid,
      email,
      name: displayName,
      status: "active",
    }).then(() => {
      router.push("/");
    });
  }, [gooleUserAfterSingIn]);

  return (
    <Container maxWidth="xl" dir="rtl">
      <Snackbar open={registerError ? true : false} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Something went wrong
        </Alert>
      </Snackbar>
      <Box style={{ textAlign: "left" }}>
        <Image src="/logo.png" width={162} height={58} alt="Logo" />
      </Box>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        wrap="nowrap"
        gap="7.25rem"
        sx={{ height: "100%" }}
      >
        <Grid item xs={12} md={6} lg={4} xl={4} style={{ order: 1 }}>
          <Box sx={style.rightSection}>
            <Typography variant="h3" sx={style.welcometext2}>
              {authConfig.welcomeTextArabic}
            </Typography>
            <Typography variant="h6" sx={style.enterData}>
              {authConfig.enterData}
            </Typography>

            <Box
              sx={{
                position: "absolute",
                bottom: "-2%",
                right: "50%",
                transform: "translateX(50%)",
              }}
            >
              <Image
                src="/intelaqfill_3.png"
                width={487}
                height={542}
                alt="intelaq Fill"
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          xl={4}
          style={{ order: 2, flexGrow: 1 }}
        >
          <Box sx={style.leftSectionBox}>
            <Typography
              variant="h3"
              textAlign="center"
              style={style.createAnAccount}
            >
              {authConfig.createAnAccount}
            </Typography>
            <FormControl fullWidth style={style.form}>
              <StyledTextField
                error={formDataError?.name}
                required
                placeholder={authConfig.nameText}
                onChange={handleFieldChange}
                type="text"
                value={formData.name}
                name="name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon style={{ color: "#979797" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                error={formDataError?.email}
                required
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFieldChange}
                placeholder={authConfig.emailText}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon style={{ color: "#979797" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                required
                error={formDataError?.password}
                name="password"
                type="password"
                value={formData.password}
                onChange={handleFieldChange}
                placeholder={authConfig.passwordText}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenIcon style={{ color: "#979797" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <StyledButton onClick={handleRegister}>
              {registerIsLoading ? (
                <CircularProgress size={28} style={{ color: "#fff" }} />
              ) : (
                <Typography>{authConfig.createAnAccountButton}</Typography>
              )}
            </StyledButton>

            <Box style={style.dividerBox}>
              <Divider style={style.dividerLine} />
              <Typography variant="body1" sx={style.orText}>
                {authConfig.orText}
              </Typography>
              <Divider style={style.dividerLine} />
            </Box>
            <Box style={{ display: "flex", gap: "20px" }}>
              <BiLogoFacebook style={style.socialIcon} />
              <BiLogoGoogle
                style={style.socialIcon}
                onClick={async () => {
                  await signInWithGoogle(["email"]);
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
  function formValidation() {
    let isValid = true;
    if (!formData.name.trim()) {
      setFormDataError((prevState: any) => ({
        ...prevState,
        name: "Please enter the name",
      }));
      isValid = false;
    }
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      setFormDataError((prevState: any) => ({
        ...prevState,
        email: "Email is invalid",
      }));
      isValid = false;
    }
    if (formData.password.trim().length < 6) {
      setFormDataError((prevState: any) => ({
        ...prevState,
        password: "Password in invalid",
      }));
      isValid = false;
    }
    return isValid;
  }

  function handleRegister() {
    let valid = formValidation();
    if (!valid) return;
    const { email, password } = formData;
    createUserWithEmailAndPassword(email, password);
  }
}

export default Register;

const StyledButton = styled(Button)({
  backgroundColor: "#24B1BE",
  color: "#fff",
  height: "56px",
  width: "223px",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#24B1BE",
  },
});
const StyledTextField = styled(TextField)(({ error }) => ({
  backgroundColor: "#F7F7F7",
  borderWidth: 0,
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent !important",
  },
  ...(error && {
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#f44336",
    },
  }),
}));
const style = {
  rightSection: {
    position: "relative",
    backgroundColor: "#24B1BE",
    height: "54rem",
    width: "100%",
    borderRadius: "22px",
    marginLeft: 0,
    marginRight: "auto",
  },
  leftSectionBox: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: "2.5rem",
    marginLeft: 0,
    marginRight: "auto",
  },

  welcometext2: {
    color: "#FBCD2F",
    fontFamily: fontFamily,
    fontWeight: 500,
    fontSize: "2.5rem",
    paddingTop: "7rem",
    textAlign: "center",
  },
  enterData: {
    color: "#fff",
    fontFamily: fontFamily,
    fontWeight: 500,
    fontSize: "22px",
    marginTop: "3rem",
    textAlign: "center",
  },
  createAnAccount: {
    color: "#24B1BE",
    fontWeight: 500,
    fontSize: "2rem",
    lineHeight: "65px",
    fontFamily: fontFamily,
  },
  createAnAccountButton: {
    backgroundColor: "#24B1BE",
    color: "#fff",
    padding: "10px 40px",
    width: "fit-content",
    borderRadius: "10px",
  },
  form: {
    display: "flex",
    gap: "1rem",
  },
  orText: {
    fontSize: "16px",
    whiteSpace: "nowrap",
    fontWeight: 500,
    color: "#979797",
    fontFamily: fontFamily,
  },
  dividerBox: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dividerLine: {
    borderColor: "#D8D3D3",
    width: "169px",
  },
  socialIcon: {
    border: "1px solid #5C5C5C",
    borderRadius: "50%",
    cursor: "pointer",
    width: "18px",
    height: "18px",
    padding: "5px",
  },
};
