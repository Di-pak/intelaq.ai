import Ticket from "@/components/ticket";
import {
  updateProjectImages,
  updatedProjectStep,
  uploadProjectImg,
  useGetAllProject,
} from "@/services/project-service";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import BrandIcon from "@/assets/brand-icon";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { downloadFirebaseImage, getBrand } from "@/services/brand-service";
import { AiOutlineDownload } from "react-icons/ai";
import CloudIcon from "@/assets/cloudIcon";
import { AiFillCloseCircle } from "react-icons/ai";
import { fileToDataURL } from "@/utils";

let steps = [
  { title: "Project submitted", value: "project_submit" },
  { title: "In progress", value: "in_progress" },
  { title: "Closed", value: "closed" },
  { title: "Archived", value: "archived" },
];

function AdminView() {
  const [user] = useAuthState(auth);
  const [projects = [], isLoading, isError] = useGetAllProject();
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isOpenUploadModal, setIsOpenUploadModal] = useState<boolean>(false);
  const [brandData, setBrandData] = useState<any>(null);
  const handleOpen = () => setOpen(true);
  const handleOpenUploadModal = () => setIsOpenUploadModal(true);
  const [selectedFiles, setSelectedFiles] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const [isUploading, setUploading] = useState<boolean>(false);

  const hadleClickShow = (id: string) => {
    let project = projects.find((item) => item.id == id);
    setSelectedProject(project);
    handleOpen();
  };

  const handleClickUpload = (id: string) => {
    let project = projects.find((item) => item.id == id);
    setSelectedProject(project);
    handleOpenUploadModal();
  };

  const handleStepChange = (id: any, step: string) => {
    updatedProjectStep(id, step).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    if (selectedProject) {
      getBrand(selectedProject.brandId).then((res) => {
        console.log("getBrand", res);
        setBrandData(res);
      });
    }
  }, [selectedProject]);

  if (isLoading) return null;
  return (
    <Box>
      <Toolbar sx={style.upperToolbar}>
        <IconButton sx={style.iconButton}>
          <BrandIcon />
        </IconButton>
      </Toolbar>
      <Container style={{ marginTop: "3rem" }}>
        <Grid container spacing={5}>
          {steps.map((step, i) => {
            return (
              <Grid item xs={12} sm={6} md={3} lg={3} key={step.value}>
                <Box
                  sx={{
                    borderRadius: "5px",
                    width: "100%",
                    minHeight: "100vh",
                    backgroundColor: "#E4E7EE",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    alignItems: "center",
                    p: "10px",
                  }}
                >
                  <Typography
                    variant="h6"
                    align="left"
                    sx={{
                      width: "90%",
                      textTransform: "capitalize",
                    }}
                    color="text.secondary"
                    component="p"
                  >
                    {step.title}
                  </Typography>
                  {projects.map((item, j) => {
                    if (item.step === step.value) {
                      return (
                        <Ticket
                          key={j}
                          item={item}
                          step={step}
                          hadleClickShow={hadleClickShow}
                          handleStepChange={handleStepChange}
                          handleClickUpload={handleClickUpload}
                        />
                      );
                    }
                  })}
                </Box>
              </Grid>
            );
          })}
        </Grid>
        {renderModal()}
        {renderUploadImageModal()}
      </Container>
    </Box>
  );

  function renderModal() {
    return (
      <Modal
        open={open && selectedProject}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              maxHeight: "80vh",
              minWidth: "70%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              borderRadius: "10px",
              p: 4,
              overflow: "scroll",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "20px",
                right: "20px",
                cursor: "pointer",
              }}
            >
              <AiFillCloseCircle onClick={handleClose} />
            </Box>
            <Grid container>
              <Grid item xs={12} md={8}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                    padding: "2rem",
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h5"
                  >
                    Project title : {selectedProject?.title}
                  </Typography>
                  <Box
                    sx={{ display: "flex", gap: "20px", alignItems: "center" }}
                  >
                    <StyledSpan>{selectedProject?.platform}</StyledSpan>

                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedProject?.step}
                      label="Age"
                      // onChange={handleChange}
                    >
                      {steps.map((item) => {
                        return (
                          <MenuItem key={item.value} value={item.value}>
                            {item.title}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                  <Box>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h6"
                    >
                      Description
                    </Typography>
                    <Box sx={{ position: "relative" }}>
                      <img
                        src={selectedProject?.image}
                        style={{
                          marginInline: "10px",
                          width: "250px",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                      <button
                        style={{
                          position: "absolute",
                          top: "20px",
                          left: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          downloadFirebaseImage(
                            selectedProject?.image,
                            selectedProject?.title
                          )
                        }
                      >
                        <AiOutlineDownload />
                      </button>
                    </Box>

                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h6"
                    >
                      {selectedProject?.details}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h6"
                    >
                      Demographic
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h6"
                    >
                      {selectedProject?.demographic}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    padding: "2rem",
                    borderLeft: "2px solid #f2f2f2",
                    height: "80%",
                  }}
                >
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    User name : {selectedProject?.userName}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    User email : {selectedProject?.userEmail}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Brand name : {selectedProject?.brandName}
                  </Typography>
                  <Box sx={{ mt: "20px" }}>
                    <Typography id="modal-modal-description" sx={{ mb: 1 }}>
                      Brand Colors
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          name="title"
                          value={brandData?.colorMaincolor}
                          disabled
                          sx={{
                            ...style.customInput,
                            background: brandData?.colorMaincolor,
                          }}
                          dir="rtl"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          name="title"
                          value={brandData?.colorSecondary}
                          disabled
                          sx={{
                            ...style.customInput,
                            background: brandData?.colorSecondary,
                          }}
                          dir="rtl"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          fullWidth
                          name="title"
                          value={brandData?.colorAccent}
                          disabled
                          sx={{
                            ...style.customInput,
                            background: brandData?.colorAccent,
                          }}
                          dir="rtl"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ mt: 2, position: "relative" }}>
                    <Typography id="modal-modal-description" sx={{ mb: 1 }}>
                      Brand Logo
                    </Typography>
                    <img
                      src={brandData?.logo}
                      style={{
                        marginInline: "10px",
                        width: "200px",
                        height: "200px",
                      }}
                    />
                    <button
                      style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                      }}
                      onClick={() =>
                        downloadFirebaseImage(brandData?.logo, brandData.name)
                      }
                    >
                      <AiOutlineDownload />
                    </button>
                    {/* <a
                      href={brandData?.logo}
                      download="test_image"
                      target="_blank"
                      style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                      }}
                    >
                      <button type="button" style={{ cursor: "pointer" }}>
                        <AiOutlineDownload />
                      </button>
                    </a> */}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      </Modal>
    );
  }

  function renderUploadImageModal() {
    return (
      <Modal
        open={isOpenUploadModal}
        onClose={() => {
          setIsOpenUploadModal(false);
          setSelectedFiles(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              maxHeight: "80vh",
              minWidth: "60%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              borderRadius: "10px",
              p: 4,
              overflow: "scroll",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "20px",
                right: "20px",
                cursor: "pointer",
              }}
            >
              <AiFillCloseCircle
                onClick={() => {
                  setSelectedFiles(null);
                  setIsOpenUploadModal(false);
                }}
              />
            </Box>
            <Box sx={{ padding: "1rem" }}>
              <Box>
                <TextField
                  dir="rtl"
                  fullWidth
                  sx={style.customInputFile}
                  placeholder="قم برفع الصورة"
                  onClick={() => fileInputRef.current?.click()}
                  InputProps={{
                    startAdornment: <CloudIcon />,
                    endAdornment: (
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    ),
                  }}
                />
              </Box>
              {selectedFiles?.length > 0 && (
                <Box sx={{ marginTop: "2rem" }}>
                  <Typography>Selected Images</Typography>
                  <Grid container justifyItems="center" mt={2} spacing={4}>
                    {selectedFiles?.map((item: any, i: number) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                          <img
                            src={item.src}
                            width={200}
                            height={200}
                            style={{ objectFit: "cover" }}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: "10px",
                      background: "#24B1BE",
                      color: "#ffffff",
                    }}
                    onClick={handleImageUpload}
                  >
                    {isUploading ? (
                      <CircularProgress size={28} style={{ color: "#fff" }} />
                    ) : (
                      "upload"
                    )}
                  </Button>
                </Box>
              )}

              {selectedProject?.result_images?.length > 0 && (
                <Box sx={{ marginTop: "2rem" }}>
                  <Typography>Uploaded Images</Typography>
                  <Grid container justifyItems="center" mt={2} spacing={4}>
                    {selectedProject?.result_images?.map(
                      (item: any, i: number) => {
                        return (
                          <Grid item xs={12} sm={6} md={4} key={i}>
                            <img
                              src={item?.src}
                              width={200}
                              height={200}
                              style={{ objectFit: "cover" }}
                            />
                          </Grid>
                        );
                      }
                    )}
                  </Grid>
                </Box>
              )}
            </Box>
          </Box>
        </>
      </Modal>
    );
  }

  async function handleFileChange(e: any) {
    let files = e.target.files;
    let i = 0;
    let images: any = [];
    while (i < files.length) {
      let url = await fileToDataURL(files[i]);
      images.push({ src: url, file: files[i] });
      i++;
    }
    setSelectedFiles(images);
  }

  async function handleImageUpload() {
    setUploading(true);
    if (selectedFiles?.length > 0 && selectedProject?.id) {
      const promises = selectedFiles.map((item: any) =>
        uploadProjectImg(selectedProject?.id, item.file)
      );
      const imagesData = await Promise.all(promises);
      updateProjectImages(selectedProject?.id, imagesData).finally(() => {
        setUploading(false);
        setIsOpenUploadModal(false);
        setSelectedFiles(null);
      });
    }
  }
}
export default AdminView;

const StyledSpan = styled("span")({
  backgroundColor: "#F7F7F7",
  borderRadius: "20px",
  padding: "0.5rem 1rem",
  color: "#979797",
});

const style = {
  customInput: {
    backgroundColor: "#F7F7F7",
    borderRadius: "10px",
    overflow: "hidden",
    color: "#FFF",
    padding: 0,
  },
  upperToolbar: {
    borderBottom: 1,
    borderColor: "divider",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    minHeight: "80px",
  },
  iconButton: {
    marginLeft: "auto",
    marginRight: "4rem",
  },
  customInputFile: {
    backgroundColor: "#F7F7F7",
    borderRadius: "10px",
    padding: "4rem 0",
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
