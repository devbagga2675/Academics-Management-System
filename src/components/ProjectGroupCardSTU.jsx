import React from "react";
import {
  Card,
  Typography,
  Box,
  IconButton,
  Divider,
  Stack,
  CardActionArea,
  Button,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircle from "@mui/icons-material/CheckCircle";
import ProjectTag from "./ProjectTag";
import ProjectHeading from "./ProjectHeading";
import { useNavigate } from "react-router-dom";
import { Checklist } from "@mui/icons-material";

function ProjectGroupCardSTU(props) {
  const { id, type, course, title, status, guide, components } = props;
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    event.stopPropagation();
  };

  const handleMenuClick = (id) => {
    console.log(id);
    event.stopPropagation();
  };

  const handleCardClick = (project_id) => {
    navigate(`ProjectDetails/${project_id}`);
  };

  const setStatusColor = (status) => {
    switch (status) {
      case "ongoing":
        return "info";
        break;
      case "completed":
        return "success";
        break;

      default:
        break;
    }
  };

  const statusColor = setStatusColor(status);
  return (
    <Card
      variant="elevation"
      elevation={2}
      sx={{
        width: 380,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 1,
      }}
      onClick={() => handleCardClick(project_id)}
    >
      <CardActionArea sx={{ p: 2 }} onClick={() => handleCardClick(id)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <ProjectTag label={type} />
              <ProjectTag label={id} />
              <ProjectTag label={course} />
            </Box>
          </Box>
          <ProjectHeading title={title} />
          <Typography variant="body2">Guide: {guide}</Typography>
          <Typography variant="body2" color={statusColor}>
            {status}
          </Typography>
        </Box>
      </CardActionArea>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
          pt: 0,
        }}
      >
        <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="start"
          gap={1}
        >
          {/* <Button
            variant="outlined"
            size="small"
            // sx={{ width: "fit-content" }}
            // onClick={(e) => {
            //   e.preventDefault();
            //   window.open(
            //     `/gradingportal/${id}`,
            //     "_blank",
            //     "noopener,noreferrer"
            //   );
            // }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <Checklist />
              Grading
                {components.map((component, index) => (
                  <Tooltip
                    key={index}
                    title={`${component.title}: ${
                      component.evaluation_done ? "Completed" : "Pending"
                    }`}
                    arrow
                  >
                    <CheckCircle
                      sx={{
                        fontSize: 16,
                        color: component.evaluation_done
                          ? "primary.main"
                          : "grey.400",
                      }}
                    />
                  </Tooltip>
                ))}
            </Stack>
          </Button> */}

          <Stack direction="row" spacing={1}>
            {components.map((component, index) => (
              <Tooltip
                key={index}
                title={`${component.title}: ${
                  component.evaluation_done ? "Completed" : "Pending"
                }`}
                arrow
              >
                <CheckCircle
                  sx={{
                    fontSize: 16,
                    color: component.evaluation_done
                      ? "primary.main"
                      : "grey.400",
                  }}
                />
              </Tooltip>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}

export default ProjectGroupCardSTU;

{
  /* <IconButton aria-label="settings" onClick={handleClick}>
<MoreVertIcon />
</IconButton>
<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
<MenuItem onClick={(e) => handleMenuClick(id)}>Edit</MenuItem>
<MenuItem onClick={handleClose}>Delete</MenuItem>
</Menu> */
}
