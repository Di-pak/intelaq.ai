import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box, Button, Menu, MenuItem, styled } from "@mui/material";
import FunctionIcon from "../assets/functionIcon";
import { useRouter } from "next/router";

interface BrandBookmarkCardProps {
  brand: {
    id: string;
    name: string;
    description: string;
    logo: string;
  };
}

export default function BrandBookmarkCard(props: BrandBookmarkCardProps) {
  const { brand } = props;
  let router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid item xs={12} sm={6} xl={4}>
      <Box>
        <StyledCard>
          <div>
            <IconContainer
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <FunctionIcon />
            </IconContainer>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              style={{ borderRadius: "20px" }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  router.push(`/brand/${brand.id}`);
                }}
              >
                Edit
              </MenuItem>
            </Menu>
          </div>

          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5" color="#5C5C5C">
              {brand.name}
            </Typography>
            <Typography variant="subtitle1" paragraph color="#979797">
              {brand.description}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: "5vw",
              height: "5vw",
              borderRadius: "50%",
              padding: "2vw",
            }}
            image={brand.logo}
          />
        </StyledCard>
      </Box>
    </Grid>
  );
  function handleDeleteBrand() {}
}

const StyledCard = styled(Card)({
  backgroundColor: "#FFFFFF",
  border: "1px solid #EDFDFF",
  flex: 1,
  alignItems: "center",
  textAlign: "right",
  display: "flex",
  borderRadius: "20px",
  position: "relative",
  "&:hover": {
    borderRadius: "20px",
  },
});

const IconContainer = styled(Button)({
  position: "absolute",
  top: "10px",
  left: "10px",
});
