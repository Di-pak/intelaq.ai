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
import DropdownIcon from "../assets/dropdownIcon";
import RadioUncheckedIcon from "@/assets/radiouncheckedIcon";
import RadioCheckedIcon from "@/assets/radiocheckedIcon";

const defaultTheme = createTheme();

interface SocialRadioBoxData {
  value: string;
  label: string;
  buttonText: string;
  icon: React.ReactNode;
}

interface SocialRadioBoxProps extends SocialRadioBoxData {
  checked: boolean;
  onChange: () => void;
}

const SocialRadioBox: React.FC<SocialRadioBoxProps> = ({
  value,
  label,
  buttonText,
  icon,
  checked,
  onChange,
}) => {
  const RadioBox = styled(Box)(({}) => ({
    width: 160,
    height: 166,
    borderRadius: 10,
    border: "1px solid #DADADA",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledradioButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#F7F7F7",
    color: "#979797",
    marginTop: "1rem",
    padding: "3px 6px",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#F7F7F7",
      boxShadow: "none",
    },
  }));
  const StyledTypography = styled(Typography)(({ theme }) => ({
    color: "#5C5C5C",
    whiteSpace: "nowrap",
  }));

  const RadioGroupContainer = styled(Box)({
    position: "absolute",
    top: 5,
    left: "8rem",
  });

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        position: "relative",
        marginBottom: "2rem",
        [defaultTheme.breakpoints.down("sm")]: {
          maxWidth: "100%",
        },
      }}
    >
      <RadioBox>
        {icon}
        <StyledTypography variant="body1">{label}</StyledTypography>
        <StyledradioButton variant="contained" endIcon={<DropdownIcon />}>
          {buttonText}
        </StyledradioButton>

        <RadioGroupContainer>
          <RadioGroup>
            <FormControlLabel
              value={value} // Use the unique value prop here
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
        </RadioGroupContainer>
      </RadioBox>
    </Box>
  );
};

export default SocialRadioBox;
