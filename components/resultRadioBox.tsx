import React from "react";
import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  createTheme,
  styled,
} from "@mui/material";
import RadioUncheckedIcon from "@/assets/radiouncheckedIcon";
import RadioCheckedIcon from "@/assets/radiocheckedIcon";
import DownloadcolorIcon from "@/assets/downloadcolorIcon";
import EditcolorIcon from "@/assets/editcolorIcon";
import SaveLogo from "@/assets/saveIcon";
import { downloadFirebaseImage } from "@/services/brand-service";

interface ResultRadioBoxProps {
  value: string;
  checked: boolean;
  onChange: () => void;
  src: string;
  name: string;
}

const ResultRadioBox: React.FC<ResultRadioBoxProps> = ({
  value,
  src,
  name,
  checked,
  onChange,
}) => {
  const Container = styled(Box)({
    position: "relative",
  });

  const RadioBox = styled(Box)(({}) => ({
    width: 360,
    height: 416,
    borderRadius: 10,
    boxSizing: "border-box",
    background: "#F7F7F7",
    border: "1px solid #DADADA",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
  }));

  const ContainedImage = styled("img")({
    position: "absolute",
    width: 312,
    height: 312,
    left: 24,
    top: 24,
    background: "#FFFFFF",
    objectFit: "cover",
    borderRadius: 10,
  });

  const RadioGroupContainer = styled(Box)({
    position: "absolute",
    top: "2rem",
    left: "3rem",
    zIndex: 1,
  });

  const createIconContainer = (position: any) =>
    styled(Box)({
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 32,
      height: 32,
      borderRadius: "5px",
      bottom: "1.5rem",
      backgroundColor: "#EBEBEB",
      ...position,
    });

  const DownloadIconContainer = createIconContainer({
    left: "4rem",
  });

  const EditIconContainer = createIconContainer({
    left: "7rem",
  });

  const SaveIconContainer = createIconContainer({
    right: "2rem",
    backgroundColor: "#F7F7F7",
  });

  return (
    <Container>
      <RadioBox>
        {src && <ContainedImage src={src} />}
        {/* <RadioGroupContainer>
          <RadioGroup>
            <FormControlLabel
              value={value}
              control={
                <Radio
                  icon={<RadioUncheckedIcon />}
                  checkedIcon={<RadioCheckedIcon />}
                  checked={checked}
                  onChange={onChange}
                />
              }
              label=""
            />
          </RadioGroup>
        </RadioGroupContainer> */}
      </RadioBox>
      <DownloadIconContainer
        style={{ cursor: "pointer" }}
        onClick={() => {
          downloadFirebaseImage(src, name);
        }}
      >
        <DownloadcolorIcon />
      </DownloadIconContainer>
      <EditIconContainer>
        <EditcolorIcon />
      </EditIconContainer>
      <SaveIconContainer>
        <SaveLogo />
      </SaveIconContainer>
    </Container>
  );
};

export default ResultRadioBox;
