import { Stack, Button, CircularProgress, Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TitleBar from "../../components/TitleBar";
import AddIcon from "@mui/icons-material/Add";
import LogCard from "../../components/LogCard";
import AddLogDrawer from "../../components/AddLogDrawer";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../../components/api";
import { ProjectContext } from "./../ViewProjectPagesFAC/ViewProjectFAC";
import ViewLogDrawer from "../../components/ViewLogDrawer";

const LogBookFAC = () => {
  const projectData = useContext(ProjectContext);
  console.log(projectData);

  const param = useParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isViewLogOpen, setisViewLogOpen] = useState(false);
  const [currentOpenLog, setCurrentOpenLog] = useState(null);

  const [logs, setlogs] = useState([
    {
      date: "12/08/2005",

      submitted: {
        status: true,

        date: "12/08/2005",

        by: "John Doe",
      },

      firstSign: {
        status: true,

        date: "13/08/2005",

        by: "Jane Smith",
      },

      secondSign: {
        status: false,

        date: null,

        by: null,
      },
    },

    {
      date: "15/08/2005",

      submitted: {
        status: true,

        date: "15/08/2005",

        by: "Alice Johnson",
      },

      firstSign: {
        status: false,

        date: null,

        by: null,
      },

      secondSign: {
        status: false,

        date: null,

        by: null,
      },
    },

    {
      date: "18/08/2005",

      submitted: {
        status: true,

        date: "18/08/2005",

        by: "Bob Williams",
      },

      firstSign: {
        status: true,

        date: "19/08/2005",

        by: "Eva Garcia",
      },

      secondSign: {
        status: true,

        date: "20/08/2005",

        by: "Michael Brown",
      },
    },

    {
      date: "22/08/2005",

      submitted: {
        status: false,

        date: null,

        by: null,
      },

      firstSign: {
        status: false,

        date: null,

        by: null,
      },

      secondSign: {
        status: false,

        date: null,

        by: null,
      },
    },

    {
      date: "25/08/2005",

      submitted: {
        status: true,

        date: "25/08/2005",

        by: "Sarah Davis",
      },

      firstSign: {
        status: true,

        date: "26/08/2005",

        by: "David Rodriguez",
      },

      secondSign: {
        status: false,

        date: null,

        by: null,
      },
    },
  ]);

  useEffect(() => {
    console.log(logs);

    return () => {};
  }, [logs]);

  const fetchLogs = useMutation({
    mutationFn: async (id) => {
      const response = await api.post(`/logs/`, { id });
      return response.data;
    },
    onSuccess: (data) => {
      setlogs(data.Data);
    },
    onError: () => {},
  });

  useEffect(() => {
    fetchLogs.mutate(param.id);
    return () => {};
  }, [param.id, fetchLogs.mutate]);

  const toggleDrawer = (open) => (event) => {
    setIsDrawerOpen(open);
  };

  const handleOpenViewLog = (log) => {
    setCurrentOpenLog(log);
    setisViewLogOpen(true);
  };

  const toggleViewDrawer = (open) => (event) => {
    setisViewLogOpen(open);
    if (!open) {
      setCurrentOpenLog(null);
    }
  };

  if (fetchLogs.isPending) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Stack
        direction={"column"}
        spacing={2}
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        width="100%"
      >
        <TitleBar title={"Log Book"}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={toggleDrawer(true)}
          >
            Add Log
          </Button>
        </TitleBar>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          gap={2}
          sx={{
            width: "fit-content",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {logs?.map((log) => (
            <LogCard
              key={log.date}
              date={log.date}
              submitted={log.submitted}
              firstSign={log.firstSign}
              secondSign={log.secondSign}
              onClick={() => handleOpenViewLog(log)}
            />
          ))}
        </Stack>
      </Stack>
      <AddLogDrawer
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        setlogs={setlogs}
      />
      <ViewLogDrawer
        open={isViewLogOpen}
        onClose={toggleViewDrawer(false)}
        logData={currentOpenLog}
      />
    </>
  );
};

export default LogBookFAC;
