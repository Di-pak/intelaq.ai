import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import { getUser } from "@/services/users-service";
import { signOut } from "firebase/auth";

function Admin() {
  const [user] = useAuthState(auth);
  const [
    signInWithEmailAndPassword,
    userAfterSingIn,
    signInIsLoading,
    signInError,
  ] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();
  const [error, setError] = useState("");

  const validateUser = () => {
    if (!userAfterSingIn && !signInError) return;
    let userId = userAfterSingIn?.user?.uid;
    getUser(userId as string).then((res) => {
      if (res?.isAdmin) {
        router.push("/admin/view");
      } else {
        setError("You are not as Admin");
      }
    });
  };

  useEffect(() => {
    validateUser();
  }, [userAfterSingIn]);

  useEffect(() => {
    if (user) {
      signOut(auth).then(() => router.push("/auth/login"));
    }
  }, []);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {signInIsLoading ? (
              <CircularProgress size={28} style={{ color: "#fff" }} />
            ) : (
              "Sign In"
            )}
          </Button>
          {error && (
            <Typography color="red" component="h1" variant="h5">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signInWithEmailAndPassword(
      data.get("email") as string,
      data.get("password") as string
    );
  }
}
export default Admin;
