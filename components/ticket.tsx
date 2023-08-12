import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

let steps = [
  { title: "Project submitted", value: "project_submit" },
  { title: "In progress", value: "in_progress" },
  { title: "Closed", value: "closed" },
  { title: "Archived", value: "archived" },
];
function Ticket({
  item,
  step,
  handleClickUpload,
  handleStepChange,
  hadleClickShow,
}: {
  item: any;
  step: any;
  handleClickUpload: any;
  handleStepChange: any;
  hadleClickShow: any;
}) {
  return (
    <Card
      key={item.id}
      sx={{
        width: "95%",
        minHeight: "150px",
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardHeader
        action={
          <>
            <Button
              style={{ cursor: "pointer" }}
              onClick={() => hadleClickShow(item.id)}
            >
              Show
            </Button>
            <Button
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleClickUpload(item.id);
              }}
            >
              Upload
            </Button>
          </>
        }
        title={<Typography color="text.secondary">{item.title}</Typography>}
      />

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item.step}
          label="Age"
          style={{ padding: 0 }}
          onChange={(e) => handleStepChange(item.id, e.target.value)}
        >
          {steps.map((item) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.title}
              </MenuItem>
            );
          })}
        </Select>
      </CardActions>
    </Card>
  );
}

export default Ticket;
