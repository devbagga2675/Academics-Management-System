import React from "react";
import {
  Card,
  Typography,
  IconButton,
  Divider,
  Box,
  CardActionArea,
  Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProjectTag from "./ProjectTag";
import LogTag from "./LogTag";
import { Check } from "@mui/icons-material";
const LogCard = ({ date, submitted, firstSign, secondSign, onClick }) => {
  return (
    <Card
      variant="elevation"
      elevation={2}
      sx={{
        minWidth: 304,
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <CardActionArea onClick={onClick}>
        <Stack
          borderRadius={0}
          p={1}
          direction={"row"}
          gap={1}
          alignItems={"end"}
        >
          <Typography variant="h6" fontWeight="bold">
            {date}
          </Typography>
          <Typography
            variant="caption"
            color={submitted?.status ? "black" : "gray"}
            sx={{
              padding: "4px 8px",
              borderRadius: "4px",
            }}
            noWrap
          >
            {submitted?.status ? (
              <>
                <Check
                  sx={{
                    fontSize: "12px",
                    mr: 1,
                  }}
                />
                Submitted
              </>
            ) : (
              "Draft"
            )}
          </Typography>
        </Stack>
      </CardActionArea>
      <Divider />
      <Stack direction="column" p={1}>
        <Typography variant="caption">Approved By</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box
            component="div"
            flexDirection={"column"}
            display="flex"
            gap={1}
            alignItems="start"
            flexWrap={"wrap"}
          >
            <Box
              component="div"
              display="flex"
              gap={1}
              alignItems="center"
              flexWrap={"wrap"}
            >
              <LogTag
                label="Guide"
                status={submitted.status}
                date={submitted.date}
                by={submitted.by}
              />
              <LogTag
                label="Program Chair"
                status={firstSign.status}
                date={firstSign.date}
                by={firstSign.by}
              />
              <LogTag
                label="Dean"
                status={secondSign.status}
                date={secondSign.date}
                by={secondSign.by}
              />
            </Box>
          </Box>
          {/* <IconButton>
            <MoreVertIcon />
          </IconButton> */}
        </Box>
      </Stack>
    </Card>
  );
};

export default LogCard;
