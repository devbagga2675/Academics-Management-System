import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectTag from "./../../components/ProjectTag.jsx";
import TitleBar from "../../components/TitleBar.jsx";
import { useMutation } from "@tanstack/react-query";
import api from "../../components/api";

function Dashboard() {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  // Define the mutation for fetching data
  const fetchDashboardData = useMutation({
    mutationFn: async () => {
      //Change the API endpoint to your actual endpoint
      const response = await api.post("/dashboard-data", {
        // Add any required payload here
        userId: "12345", // Example payload, replace with actual data if needed
      });
      return response.data;
    },
    onSuccess: (jsonResponse) => {
      if (jsonResponse.Status === "Success") {
        // Add "Total" column for each professor
        const dataWithTotals = jsonResponse.Data.map((row) => {
          const total = Object.keys(row)
            .filter((key) => key !== "Guide name")
            .reduce((sum, key) => sum + parseInt(row[key], 10), 0);
          return { ...row, Total: total };
        });

        // Calculate totals for each column
        const columnTotals = dataWithTotals.reduce(
          (totals, row) => {
            Object.keys(row).forEach((key) => {
              if (key !== "Guide name") {
                totals[key] = (totals[key] || 0) + parseInt(row[key], 10);
              }
            });
            return totals;
          },
          { "Guide name": "Total" }
        );

        // Update table data
        setTableData([...dataWithTotals, columnTotals]);

        // Dynamically extract column headers from the first object
        if (dataWithTotals.length > 0) {
          setColumns(
            Object.keys(dataWithTotals[0])
              .filter((key) => key !== "id") // Exclude the "id" field
              .map((column) => ({
                field: column,
                headerName: column,
                width: 150,
                renderCell: (params) =>
                  column === "Guide name" && params.value !== "Total" ? (
                    <Link
                      to=""
                      sx={{
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      <ProjectTag label={params.value} />
                    </Link>
                  ) : (
                    params.value
                  ),
                sortable: column !== "Total", // Disable sorting for "Total" column
              }))
          );
        }
      }
    },
    onError: (error) => {
      console.error("Error fetching dashboard data:", error);
      // Optionally, show an error message to the user
    },
  });

  // Trigger the mutation when the component mounts
  useEffect(() => {
    fetchDashboardData.mutate();
  }, [fetchDashboardData]);

  // Show loading spinner while data is being fetched
  if (fetchDashboardData.isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  //Previous logic of static data
  // useEffect(() => {
  //   // Simulated JSON response (replace with actual API call)
  //   const jsonResponse = {
  //     Status: "Success",
  //     Data: [
  //       {
  //         "Guide name": "Dr. Asha Mehta",
  //         "Major projects": "5",
  //         "Minor projects": "5",
  //         "Industry Internships": "5",
  //         Dissertation: "5",
  //       },
  //       {
  //         "Guide name": "Prof. Rajeev Nair",
  //         "Major projects": "5",
  //         "Minor projects": "5",
  //         "Industry Internships": "5",
  //         Dissertation: "5",
  //       },
  //       {
  //         "Guide name": "Dr. Neha Sharma",
  //         "Major projects": "5",
  //         "Minor projects": "5",
  //         "Industry Internships": "5",
  //         Dissertation: "5",
  //       },
  //       {
  //         "Guide name": "Mr. Anil Kumar",
  //         "Major projects": "5",
  //         "Minor projects": "5",
  //         "Industry Internships": "5",
  //         Dissertation: "5",
  //       },
  //       {
  //         "Guide name": "Ms. Kavita Iyer",
  //         "Major projects": "5",
  //         "Minor projects": "5",
  //         "Industry Internships": "5",
  //         Dissertation: "5",
  //       },
  //       {
  //         "Guide name": "Dr. Vikram Joshi",
  //         "Major projects": "5",
  //         "Minor projects": "5",
  //         "Industry Internships": "5",
  //         Dissertation: "5",
  //       },
  //     ],
  //   };

  //   // if (jsonResponse.Status === "Success") {
  //   //   setTableData(jsonResponse.Data.map((row, index) => ({ id: index, ...row })));
  //   //   // Dynamically extract column headers from the first object
  //   //   if (jsonResponse.Data.length > 0) {
  //   //     setColumns(
  //   //       Object.keys(jsonResponse.Data[0]).map((column) => ({
  //   //         field: column,
  //   //         headerName: column,
  //   //         width: 150,
  //   //         renderCell: (params) =>
  //   //           column === "Guide name" ? (
  //   //             <Link
  //   //               to=""
  //   //               sx={{
  //   //                 textDecoration: 'none',
  //   //                 '&:hover': { textDecoration: 'underline' },
  //   //               }}
  //   //             >
  //   //               <ProjectTag label={params.value} />
  //   //             </Link>
  //   //           ) : (
  //   //             params.value
  //   //           ),
  //   //         sortable: true,
  //   //       }))
  //   //     );
  //   //   }
  //   // }

  //   //New loigic to add "Total" column and calculate totals
  //   if (jsonResponse.Status === "Success") {
  //     // Add "Total" column for each professor
  //     const dataWithTotals = jsonResponse.Data.map((row, index) => {
  //       const total = Object.keys(row)
  //         .filter((key) => key !== "Guide name")
  //         .reduce((sum, key) => sum + parseInt(row[key], 10), 0);
  //       return { id: index, ...row, Total: total };
  //     });

  //     // Calculate totals for each column
  //     const columnTotals = dataWithTotals.reduce(
  //       (totals, row) => {
  //         Object.keys(row).forEach((key) => {
  //           if (key !== "Guide name" && key !== "id") {
  //             totals[key] = (totals[key] || 0) + parseInt(row[key], 10);
  //           }
  //         });
  //         return totals;
  //       },
  //       { "Guide name": "Total", id: "total" }
  //     );

  //     setTableData([...dataWithTotals, columnTotals]);

  //     // Dynamically extract column headers from the first object
  //     if (dataWithTotals.length > 0) {
  //       setColumns(
  //         Object.keys(dataWithTotals[0])
  //           .filter((key) => key !== "id") // Exclude the "id" field
  //           .map((column) => ({
  //             field: column,
  //             headerName: column,
  //             width: 150,
  //             renderCell: (params) =>
  //               column === "Guide name" && params.value !== "Total" ? (
  //                 <Link
  //                   to=""
  //                   sx={{
  //                     textDecoration: "none",
  //                     "&:hover": { textDecoration: "underline" },
  //                   }}
  //                 >
  //                   <ProjectTag label={params.value} />
  //                 </Link>
  //               ) : (
  //                 params.value
  //               ),
  //             sortable: column !== "Total", // Disable sorting for "Total" column
  //           }))
  //       );
  //     }
  //   }
  // }, []);

  const getRowId = (row) => row.id;

  return (
    <Box sx={{ p: 2, paddingLeft: "208px", width: "100%" }}>
      <TitleBar title={"Dashboard"} />
      <Box width={"fit-content"}>
        <DataGrid
          rows={tableData}
          columns={columns}
          getRowId={getRowId}
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#EEEEEE",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell": {
              borderRight: "1px solid rgba(224, 224, 224, 1)",
              "&:last-child": {
                borderRight: "none",
              },
            },
          }}
          pageSize={5}
          rowsPerPageOptions={[5]}
          pagination
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
}

export default Dashboard;
