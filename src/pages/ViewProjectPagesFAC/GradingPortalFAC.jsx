// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query"; // Import useMutation
// import {
//   Box,
//   Card,
//   Container,
//   Typography,
//   Button,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Stack,
//   FormControl,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Snackbar,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import BackButton from "./../../components/BackButton.jsx";
// import ProjectTag from "../../components/ProjectTag.jsx";
// import { BorderTop } from "@mui/icons-material";

// // Assuming you have an 'api' object configured for your API calls
// // import api from '../../api'; // Uncomment and adjust the path as needed

// function GradingPortalFAC() {
//   const param = useParams();
//   const [groupInfo] = useState({
//     id: "G123",
//     title: "Echo: a seamless university ecosystem app",
//     type: "Research Project",
//     course: "B.Tech CSE",
//     isMidSemLocked: false,
//     isEndSemLocked: false,
//     students: [
//       { id: 1, name: "Dev Nirmal Bagga", enrollment: "22000737" },
//       { id: 2, name: "Dhvanika Ketankumar Naik", enrollment: "22000740" },
//       { id: 3, name: "Vidit Mitesh Shah", enrollment: "22000741" },
//       { id: 4, name: "Ishita Rakeshbhai Amin", enrollment: "22000777" },
//     ],
//   });
//   const [fetchedGroupInfo, setFetchedGroupInfo] = useState(null); // State to hold fetched group info
//   const [midSemesterOpen, setMidSemesterOpen] = useState(
//     !groupInfo.isMidSemLocked
//   );
//   const [endSemesterOpen, setEndSemesterOpen] = useState(
//     !groupInfo.isEndSemLocked
//   );
//   const [midSemesterGrades, setMidSemesterGrades] = useState([]);
//   const [endSemesterGrades, setEndSemesterGrades] = useState([]);
//   const [midSemesterStatus, setMidSemesterStatus] = useState("open");
//   const [endSemesterStatus, setEndSemesterStatus] = useState("open");
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [password, setPassword] = useState("");
//   const [currentSubmitType, setCurrentSubmitType] = useState(null);
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const [confirmMessage, setConfirmMessage] = useState("");
//   const [currentConfirmType, setCurrentConfirmType] = useState(null);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertSeverity, setAlertSeverity] = useState("error");

//   const fetchGroupInfoMutation = useMutation({
//     mutationFn: async (id) => {
//       // Replace this with your actual API call to fetch group info by ID
//       // Example using a POST request (as per your log example):
//       const response = await api.post(`/groups/`, { id }); // Adjust the endpoint as needed
//       return response.data;
//     },
//     onSuccess: (data) => {
//       setFetchedGroupInfo(data.Data); // Assuming your API response has 'Data' property
//       setMidSemesterOpen(!data.Data.isMidSemLocked);
//       setEndSemesterOpen(!data.Data.isEndSemLocked);
//       setMidSemesterStatus(data.Data.isMidSemLocked ? "locked" : "open");
//       setEndSemesterStatus(data.Data.isEndSemLocked ? "locked" : "open");
//       const initialGrades = data.Data.students.map((student) => ({
//         ...student,
//         guide: "",
//         external: "",
//         total: "",
//         status: "Absent",
//       }));
//       setMidSemesterGrades(initialGrades);
//       setEndSemesterGrades(initialGrades);
//     },
//     onError: (error) => {
//       console.error("Error fetching group info:", error);
//       setAlertMessage("Failed to load group information.");
//       setAlertSeverity("error");
//       setShowAlert(true);
//     },
//   });

//   useEffect(() => {
//     if (param.id) {
//       fetchGroupInfoMutation.mutate(param.id);
//     }
//     return () => {};
//   }, [param.id, fetchGroupInfoMutation.mutate]);

//   useEffect(() => {
//     const currentGroupInfo = fetchedGroupInfo || groupInfo;
//     const initialGrades = currentGroupInfo.students.map((student) => ({
//       ...student,
//       guide: "",
//       external: "",
//       total: "",
//       status: "Absent",
//     }));
//     setMidSemesterGrades(initialGrades);
//     setEndSemesterGrades(initialGrades);
//     setMidSemesterStatus(currentGroupInfo.isMidSemLocked ? "locked" : "open");
//     setEndSemesterStatus(currentGroupInfo.isEndSemLocked ? "locked" : "open");
//     setMidSemesterOpen(!currentGroupInfo.isMidSemLocked);
//     setEndSemesterOpen(!currentGroupInfo.isEndSemLocked);
//   }, [fetchedGroupInfo, groupInfo]);

//   const handleCloseAlert = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setShowAlert(false);
//   };

//   const handleCloseConfirmDialog = () => {
//     setShowConfirmDialog(false);
//     setCurrentConfirmType(null);
//   };

//   const validateGrades = (grades, isMidSemester) => {
//     const guideMax = isMidSemester ? 30 : 20;
//     const externalMax = isMidSemester ? 30 : 20;
//     const semesterName = isMidSemester ? "Mid" : "End";

//     for (const student of grades) {
//       // Only validate marks if the student DOES NOT have a status selected
//       if (!student.status) {
//         // Checks for empty string, null, or undefined status

//         if (student.guide === "" || student.external === "") {
//           setAlertMessage(
//             `For ${student.name} (${semesterName} semester): Please enter both Guide and External marks, or select a status (Absent/Incomplete/Withheld).`
//           );
//           setAlertSeverity("warning");
//           setShowAlert(true);
//           return false; // Validation fails: Status is empty AND marks are missing.
//         }
//         // --- END OF NEW CHECK ---

//         // If marks are present (not empty strings), proceed to validate numeric value and range.
//         // We parse directly now, knowing they are not empty strings.
//         const guide = parseInt(student.guide, 10);
//         const external = parseInt(student.external, 10);

//         // Validate Guide marks (numeric and range)
//         if (isNaN(guide) || guide < 0 || guide > guideMax) {
//           setAlertMessage(
//             // More specific error message
//             `Invalid Guide marks for ${student.name} (${semesterName} semester). Must be a number between 0 and ${guideMax}.`
//           );
//           setAlertSeverity("warning");
//           setShowAlert(true);
//           return false;
//         }

//         if (isNaN(external) || external < 0 || external > externalMax) {
//           setAlertMessage(
//             // More specific error message
//             `Invalid External marks for ${student.name} (${semesterName} semester). Must be a number between 0 and ${externalMax}.`
//           );
//           setAlertSeverity("warning");
//           setShowAlert(true);
//           return false;
//         }
//       }
//     }
//     return true;
//   };

//   const calculateTotal = (grades) => {
//     return grades.map((student) => ({
//       ...student,
//       total: !student.status
//         ? parseInt(student.guide || 0) + parseInt(student.external || 0)
//         : "",
//     }));
//   };

//   const handleLockAndCalculateMidSemester = () => {
//     setConfirmMessage(
//       "Are you sure you want to lock and calculate Mid semester totals?"
//     );
//     setCurrentConfirmType("lockMidSemester");
//     setShowConfirmDialog(true);
//   };

//   const handleLockAndCalculateEndSemester = () => {
//     setConfirmMessage(
//       "Are you sure you want to lock and calculate End semester totals?"
//     );
//     setCurrentConfirmType("lockEndSemester");
//     setShowConfirmDialog(true);
//   };

//   const handleConfirmAction = () => {
//     console.log("Current Confirm Type:", currentConfirmType); // Debugging line

//     if (currentConfirmType === "lockMidSemester") {
//       if (validateGrades(midSemesterGrades, true)) {
//         const updatedGrades = calculateTotal(midSemesterGrades);
//         setMidSemesterGrades(updatedGrades);
//         setMidSemesterStatus("locked");
//       }
//     } else if (currentConfirmType === "lockEndSemester") {
//       if (validateGrades(endSemesterGrades, false)) {
//         const updatedGrades = calculateTotal(endSemesterGrades);
//         setEndSemesterGrades(updatedGrades);
//         setEndSemesterStatus("locked");
//       }
//     } else if (currentConfirmType === "resetMidSemester") {
//       const currentGroupInfo = fetchedGroupInfo || groupInfo;
//       const resetGrades = currentGroupInfo.students.map((student) => ({
//         ...student,
//         guide: "",
//         external: "",
//         total: "",
//         status: "Absent",
//       }));
//       setMidSemesterGrades(resetGrades);
//       setMidSemesterStatus("open");
//       console.log(midSemesterStatus); // Debugging line
//     } else if (currentConfirmType === "resetEndSemester") {
//       console.log("End Semester Grades Before Reset:", endSemesterGrades); // Debugging line
//       const currentGroupInfo = fetchedGroupInfo || groupInfo;
//       const resetGrades = currentGroupInfo.students.map((student) => ({
//         ...student,
//         guide: "",
//         external: "",
//         total: "",
//         status: "Absent",
//       }));
//       setEndSemesterGrades(resetGrades);
//       setEndSemesterStatus("open");
//       console.log(endSemesterStatus); // Debugging line
//     }
//     setShowConfirmDialog(false);
//     setCurrentConfirmType(null);
//   };

//   const handleInputChange = (event, studentId, isMidSemester, field) => {
//     const { value } = event.target;
//     const updateGrades = isMidSemester
//       ? setMidSemesterGrades
//       : setEndSemesterGrades;
//     updateGrades((prevGrades) =>
//       prevGrades.map((student) =>
//         student.id === studentId
//           ? { ...student, [field]: value, status: "" }
//           : student
//       )
//     );
//   };

//   const handleRadioChange = (event, studentId, isMidSemester) => {
//     const { value } = event.target;
//     const updateGrades = isMidSemester
//       ? setMidSemesterGrades
//       : setEndSemesterGrades;
//     updateGrades((prevGrades) =>
//       prevGrades.map((student) =>
//         student.id === studentId
//           ? { ...student, status: value, guide: "", external: "", total: "" }
//           : student
//       )
//     );
//   };

//   const handleShowConfirmation = (type) => {
//     setCurrentSubmitType(type);
//     setShowConfirmation(true);
//   };

//   const handlePasswordChange = (event) => setPassword(event.target.value);

//   const handleSubmit = async () => {
//     if (password === "your_secret_password") {
//       let apiEndpoint = "";
//       let formData = {};

//       if (currentSubmitType === "Mid") {
//         apiEndpoint = "/api/submit/mid-semester-grades"; // Replace with your actual API URL
//         formData = {
//           semester: "Mid",
//           grades: midSemesterGrades,
//           password: password,
//           groupId: param.id, // Assuming you need to send the group ID
//         };
//       } else if (currentSubmitType === "End") {
//         apiEndpoint = "/api/submit/end-semester-grades"; // Replace with your actual API URL
//         formData = {
//           semester: "End",
//           grades: endSemesterGrades,
//           password: password,
//           groupId: param.id, // Assuming you need to send the group ID
//         };
//       }

//       if (apiEndpoint) {
//         try {
//           const response = await api.post(apiEndpoint, formData);
//           // Handle successful response (e.g., show success message)
//           if (response.data.Status === "SUCCESS") {
//             setAlertMessage(
//               `Grades submitted successfully for ${currentSubmitType} semester!`
//             );
//             setAlertSeverity("success");
//             setShowAlert(true);
//             setShowConfirmation(false);
//             setCurrentSubmitType(null);
//             fetchGroupInfoMutation.mutate(param.id);
//           }
//         } catch (error) {
//           console.error("Error submitting grades:", error);
//           setAlertMessage(
//             `Failed to submit grades for ${currentSubmitType} semester. Please try again.`
//           );
//           setAlertSeverity("error");
//           setShowAlert(true);
//         }
//       }
//     } else {
//       setAlertMessage("Incorrect password.");
//       setAlertSeverity("error");
//       setShowAlert(true);
//     }
//     setPassword("");
//   };

//   const handleCloseConfirmation = () => {
//     setShowConfirmation(false);
//     setPassword("");
//     setCurrentSubmitType(null);
//   };

//   const resetGrades = (isMid) => {
//     setConfirmMessage(
//       `Are you sure you want to reset ${
//         isMid ? "Mid" : "End"
//       } semester grades to default?`
//     );
//     setCurrentConfirmType(isMid ? "resetMidSemester" : "resetEndSemester");
//     setShowConfirmDialog(true);
//   };

//   const cellStyles = {
//     borderRight: "1px solid rgba(224, 224, 224, 1)",
//     "&:last-child": {
//       borderRight: "none",
//     },
//   };

//   const headerStyles = {
//     backgroundColor: "#EEEEEE",
//   };

//   const renderAccordion = (
//     isOpen,
//     setOpen,
//     title,
//     grades,
//     isMid,
//     isAccordionDisabled,
//     onLockAndCalculate,
//     onInputChange,
//     onReset,
//     onRadioChange,
//     semesterStatus
//   ) => (
//     <Accordion
//       variant="outlined"
//       expanded={isOpen}
//       onChange={() => setOpen(!isOpen)}
//       disabled={isAccordionDisabled}
//     >
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls={`${title}-content`}
//         id={`${title}-header`}
//       >
//         <Typography variant="h6">
//           {title} semester grading{" "}
//           {isAccordionDisabled ? (
//             <Typography variant="body2">
//               Grades have already been submitted
//             </Typography>
//           ) : (
//             ""
//           )}{" "}
//         </Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         <TableContainer>
//           <Table sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
//             <TableHead>
//               <TableRow sx={headerStyles}>
//                 <TableCell sx={{ maxWidth: "100px", ...cellStyles }}>
//                   Name and enrollment
//                 </TableCell>
//                 <TableCell sx={{ width: "120px", ...cellStyles }}>
//                   Guide <br />
//                   (out of {isMid ? 30 : 20})
//                 </TableCell>
//                 <TableCell sx={{ width: "120px", ...cellStyles }}>
//                   External <br />
//                   (out of {isMid ? 30 : 20})
//                 </TableCell>
//                 <TableCell sx={{ width: "120px", ...cellStyles }}>
//                   Total <br />
//                   (out of {isMid ? 60 : 40})
//                 </TableCell>
//                 <TableCell sx={cellStyles}>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {grades.map((student) => (
//                 <TableRow key={student.id}>
//                   <TableCell
//                     component="th"
//                     scope="row"
//                     sx={{ maxWidth: "200px", ...cellStyles }}
//                   >
//                     <>
//                       {student.name}
//                       <br />
//                       {<ProjectTag label={student.enrollment} />}
//                     </>
//                   </TableCell>
//                   <TableCell sx={cellStyles}>
//                     <TextField
//                       type="number"
//                       value={student.guide}
//                       onChange={(e) =>
//                         onInputChange(e, student.id, isMid, "guide")
//                       }
//                       size="small"
//                       disabled={semesterStatus === "locked"}
//                     />
//                   </TableCell>
//                   <TableCell sx={cellStyles}>
//                     <TextField
//                       type="number"
//                       value={student.external}
//                       onChange={(e) =>
//                         onInputChange(e, student.id, isMid, "external")
//                       }
//                       size="small"
//                       disabled={semesterStatus === "locked"}
//                     />
//                   </TableCell>
//                   <TableCell sx={cellStyles}>
//                     <TextField value={student.total} disabled size="small" />
//                   </TableCell>
//                   <TableCell sx={cellStyles}>
//                     <FormControl component="fieldset">
//                       <RadioGroup
//                         row
//                         aria-label="grade-status"
//                         name={`grade-status-${student.id}`}
//                         value={student.status}
//                         onChange={(e) => onRadioChange(e, student.id, isMid)}
//                       >
//                         <Stack direction={"row"}>
//                           <FormControlLabel
//                             value="Absent"
//                             control={
//                               <Radio disabled={semesterStatus === "locked"} />
//                             }
//                             label="Absent"
//                           />
//                           <FormControlLabel
//                             value="Incomplete"
//                             control={
//                               <Radio disabled={semesterStatus === "locked"} />
//                             }
//                             label="Incomplete"
//                           />
//                           <FormControlLabel
//                             value="Withheld"
//                             control={
//                               <Radio disabled={semesterStatus === "locked"} />
//                             }
//                             label="Withheld"
//                           />
//                         </Stack>
//                       </RadioGroup>
//                     </FormControl>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Stack direction="row" spacing={2} mt={2}>
//           {semesterStatus !== "locked" ? (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={onLockAndCalculate}
//               disabled={isAccordionDisabled || semesterStatus === "locked"}
//             >
//               Lock and Calculate
//             </Button>
//           ) : (
//             <>
//               <Button
//                 variant="contained"
//                 color="success"
//                 onClick={() => handleShowConfirmation(title)}
//                 disabled={semesterStatus !== "locked"}
//               >
//                 Submit
//               </Button>
//               <Button variant="outlined" onClick={onReset}>
//                 Reset Grades
//               </Button>
//             </>
//           )}
//         </Stack>
//       </AccordionDetails>
//     </Accordion>
//   );

//   return (
//     <Box sx={{ p: 2 }}>
//       <Stack direction="row" alignItems="center" pt={2} mb={2}>
//         <BackButton />
//         <Typography variant="h5" ml={2}>
//           Grading Portal
//         </Typography>
//       </Stack>
//       {(fetchedGroupInfo || groupInfo) && (
//         <>
//           <Stack
//             direction={{ lg: "row", md: "column" }}
//             gap={1}
//             alignItems={"start"}
//           >
//             <Card
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 p: 2,
//                 gap: 1,
//                 maxWidth: "400px",
//               }}
//               variant="outlined"
//             >
//               <InfoRow
//                 label="Group Number"
//                 value={(fetchedGroupInfo || groupInfo).id}
//               />
//               <InfoRow
//                 label="Project Title"
//                 value={(fetchedGroupInfo || groupInfo).title}
//               />
//               <InfoRow
//                 label="Project Type"
//                 value={(fetchedGroupInfo || groupInfo).type}
//               />
//               <InfoRow
//                 label="Course Name"
//                 value={(fetchedGroupInfo || groupInfo).course}
//               />
//             </Card>
//             <Stack direction={"column"} gap={2}>
//               {" "}
//               {renderAccordion(
//                 midSemesterOpen,
//                 setMidSemesterOpen,
//                 "Mid",
//                 midSemesterGrades,
//                 true,
//                 (fetchedGroupInfo || groupInfo).isMidSemLocked,
//                 handleLockAndCalculateMidSemester,
//                 handleInputChange,
//                 () => resetGrades(true),
//                 handleRadioChange,
//                 midSemesterStatus
//               )}
//               {renderAccordion(
//                 endSemesterOpen,
//                 setEndSemesterOpen,
//                 "End",
//                 endSemesterGrades,
//                 false,
//                 (fetchedGroupInfo || groupInfo).isEndSemLocked,
//                 handleLockAndCalculateEndSemester,
//                 handleInputChange,
//                 () => resetGrades(false),
//                 handleRadioChange,
//                 endSemesterStatus
//               )}
//             </Stack>
//           </Stack>

//           <Dialog
//             open={showConfirmation}
//             onClose={handleCloseConfirmation}
//             aria-labelledby="form-dialog-title"
//           >
//             <DialogTitle id="form-dialog-title">Confirm Submission</DialogTitle>
//             <DialogContent>
//               <DialogContentText>
//                 Please enter your password to submit the grades for{" "}
//                 {currentSubmitType} semester.
//               </DialogContentText>
//               <TextField
//                 autoFocus
//                 margin="dense"
//                 id="password"
//                 label="Password"
//                 type="password"
//                 fullWidth
//                 value={password}
//                 onChange={handlePasswordChange}
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseConfirmation} color="primary">
//                 Cancel
//               </Button>
//               <Button onClick={handleSubmit} color="primary">
//                 Submit
//               </Button>
//             </DialogActions>
//           </Dialog>

//           {/* Custom Confirm Dialog */}
//           <Dialog
//             open={showConfirmDialog}
//             onClose={handleCloseConfirmDialog}
//             aria-labelledby="alert-dialog-title"
//             aria-describedby="alert-dialog-description"
//           >
//             <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
//             <DialogContent>
//               <DialogContentText id="alert-dialog-description">
//                 {confirmMessage}
//               </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseConfirmDialog} color="primary">
//                 Cancel
//               </Button>
//               <Button onClick={handleConfirmAction} color="primary" autoFocus>
//                 Confirm
//               </Button>
//             </DialogActions>
//           </Dialog>

//           {/* Custom Alert Snackbar */}
//           <Snackbar
//             open={showAlert}
//             autoHideDuration={3000}
//             onClose={handleCloseAlert}
//             anchorOrigin={{ vertical: "top", horizontal: "center" }}
//           >
//             <Alert
//               onClose={handleCloseAlert}
//               severity={alertSeverity}
//               sx={{ width: "100%" }}
//               variant="filled"
//             >
//               {alertMessage}
//             </Alert>
//           </Snackbar>
//         </>
//       )}
//       {!fetchedGroupInfo && <CircularProgress />}
//     </Box>
//   );
// }

// export default GradingPortalFAC;

// const InfoRow = ({ label, value }) => {
//   return (
//     <Stack direction="row" spacing={2} alignItems="center">
//       <Typography variant="body2" sx={{ minWidth: "120px", flexShrink: 0 }}>
//         {label}:
//       </Typography>
//       <ProjectTag label={value} />
//     </Stack>
//   );
// };

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Card,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BackButton from "./../../components/BackButton.jsx";
import ProjectTag from "../../components/ProjectTag.jsx";
import api from "../../components/api.jsx";


function GradingPortalFAC() {
  const param = useParams();
  const [fetchedGroupInfo, setFetchedGroupInfo] = useState(null);
  const [grades, setGrades] = useState({});
  const [semesterStatuses, setSemesterStatuses] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [password, setPassword] = useState("");
  const [currentSubmitType, setCurrentSubmitType] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [currentConfirmType, setCurrentConfirmType] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  const dummy_response = {
    Status: "Success",
    Data: {
      group_id: "GRP001",
      components: [
        {
          component_id: "COMP1",
          title: "Semester 1",
          locked: false,
          sub_components: [
            {
              component_id: "SUB1",
              title: "Guide_30",
              max_marks: 30,
            },
            {
              component_id: "SUB2",
              title: "Presentation_20",
              max_marks: 20,
            },
            {
              component_id: "SUB3",
              title: "Report_50",
              max_marks: 50,
            },
          ],
        },
        {
          component_id: "COMP2",
          title: "Semester 2",
          locked: false,
          sub_components: [
            {
              component_id: "SUB4",
              title: "Guide_40",
              max_marks: 40,
            },
            {
              component_id: "SUB5",
              title: "Presentation_30",
              max_marks: 30,
            },
            {
              component_id: "SUB6",
              title: "Viva_30",
              max_marks: 30,
            },
          ],
        },
      ],
      grades: [
        {
          id: "STU001",
          name: "John Doe",
          enrollment: "ENR001",
          "Semester 1": {
            Guide_30: { marks: "25", status: "Present" },
            Presentation_20: { marks: "18", status: "Present" },
            Report_50: { marks: "45", status: "Present" },
          },
          "Semester 2": {
            Guide_40: { marks: "", status: "yet to enter marks" },
            Presentation_30: { marks: "", status: "yet to enter marks" },
            Viva_30: { marks: "", status: "yet to enter marks" },
          },
        },
        {
          id: "STU002",
          name: "Jane Smith",
          enrollment: "ENR002",
          "Semester 1": {
            Guide_30: { marks: "28", status: "Present" },
            Presentation_20: { marks: "15", status: "Present" },
            Report_50: { marks: "40", status: "Present" },
          },
          "Semester 2": {
            Guide_40: { marks: "35", status: "Present" },
            Presentation_30: { marks: "25", status: "Present" },
            Viva_30: { marks: "28", status: "Present" },
          },
        },
        {
          id: "STU003",
          name: "Alice Johnson",
          enrollment: "ENR003",
          "Semester 1": {
            Guide_30: { marks: "", status: "Absent" },
            Presentation_20: { marks: "", status: "Absent" },
            Report_50: { marks: "", status: "Absent" },
          },
          "Semester 2": {
            Guide_40: { marks: "", status: "Incomplete" },
            Presentation_30: { marks: "", status: "Incomplete" },
            Viva_30: { marks: "", status: "Incomplete" },
          },
        },
      ],
    },
  };

  const fetchGroupInfoMutation = useMutation({
    mutationFn: async (id) => {
      // try {
      //   const response = await api.post("/api/faculty/getGroupInfo", {
      //     groupId: id,
      //   });
      //   if (response.data.Status === "Success") {
      //     return response.data;
      //   } else {
      //     throw new Error("API returned non-success status");
      //   }
      // } catch (error) {
      //   throw new Error(`Failed to fetch group info: ${error.message}`);
      // }
      
      return dummy_response;
    },
    onSuccess: (response) => {
      if (response.Status === "Success") {
        setFetchedGroupInfo(response.Data);
        const initialGrades = {};
        const initialStatuses = {};
        response.Data.components.forEach((component) => {
          initialGrades[component.title] = response.Data.grades.map(
            (student) => {
              const subComponents = component.sub_components.map((sub) => ({
                title: sub.title,
                max_marks: sub.max_marks,
                marks: student[component.title][sub.title]?.marks || "",
                status:
                  student[component.title][sub.title]?.status ===
                  "yet to enter marks"
                    ? "Absent"
                    : student[component.title][sub.title]?.status,
              }));

              // Calculate total from existing marks during initialization
              const total = subComponents.reduce(
                (sum, sub) => sum + (parseInt(sub.marks) || 0),
                0
              );
              const hasMarks = subComponents.some((sub) => sub.marks !== "");

              return {
                id: student.id,
                name: student.name,
                enrollment: student.enrollment,
                subComponents: subComponents,
                total: hasMarks ? total : "",
                status:
                  student[component.title]?.Guide_30?.status ===
                  "yet to enter marks"
                    ? "Absent"
                    : student[component.title]?.Guide_30?.status || "Absent",
              };
            }
          );
          initialStatuses[component.title] = component.locked
            ? "locked"
            : "open";
        });
        setGrades(initialGrades);
        setSemesterStatuses(initialStatuses);
      } else {
        throw new Error("API returned non-success status");
      }
    },
    onError: (error) => {
      console.error("Error fetching group info:", error);
      setAlertMessage("Failed to load group information.");
      setAlertSeverity("error");
      setShowAlert(true);
    },
  });
  useEffect(() => {
    if (param.id) {
      fetchGroupInfoMutation.mutate(param.id);
    }
  }, [param.id]);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;
    setShowAlert(false);
  };

  const handleCloseConfirmDialog = () => {
    setShowConfirmDialog(false);
    setCurrentConfirmType(null);
  };

  const validateGrades = (componentGrades, component) => {
    const subComponents = component.sub_components;
    for (const student of componentGrades) {
      // Check if the student has at least one mark or a valid status
      const hasMarks = student.subComponents.some((sub) => sub.marks !== "");
      const hasStatus = ["Absent", "Incomplete", "Withheld"].includes(
        student.status
      );

      if (!hasMarks && !hasStatus) {
        setAlertMessage(
          `For ${student.name} (${component.title}): Please enter at least one mark or select a status (Absent/Incomplete/Withheld).`
        );
        setAlertSeverity("warning");
        setShowAlert(true);
        return false;
      }
      // If there are any marks, validate all subComponents
      if (hasMarks) {
        for (const sub of student.subComponents) {
          console.log(
            `Validating ${student.name}, ${sub.title}: marks=${sub.marks}, max_marks=${sub.max_marks}`
          ); // Debug log
          if (sub.marks === "") {
            // Allow empty fields only if no other marks exist for this student
            if (
              student.subComponents.some(
                (s) => s.marks !== "" && s.title !== sub.title
              )
            ) {
              setAlertMessage(
                `For ${student.name} (${component.title}, ${sub.title}): All fields must be filled when entering partial marks.`
              );
              setAlertSeverity("warning");
              setShowAlert(true);
              return false;
            }
          } else {
            // Validate non-empty marks
            const marks = parseInt(sub.marks, 10);
            if (isNaN(marks)) {
              setAlertMessage(
                `Invalid marks for ${student.name} (${component.title}, ${sub.title}). Must be a number.`
              );
              setAlertSeverity("warning");
              setShowAlert(true);
              return false;
            }
            if (marks < 0 || marks > sub.max_marks) {
              setAlertMessage(
                `Invalid marks for ${student.name} (${component.title}, ${sub.title}). Must be between 0 and ${sub.max_marks}.`
              );
              setAlertSeverity("warning");
              setShowAlert(true);
              return false;
            }
          }
        }
      }
    }
    return true;
  };

  const calculateTotal = (grades) => {
    return grades.map((student) => {
      const total = student.subComponents.reduce(
        (sum, sub) => sum + (parseInt(sub.marks) || 0),
        0
      );
      const hasMarks = student.subComponents.some((sub) => sub.marks !== "");
      return {
        ...student,
        total: hasMarks ? total : "",
        // Preserve existing status unless marks change the intent
        status: hasMarks ? "Present" : student.status,
      };
    });
  };

  const handleLockAndCalculate = (componentTitle) => {
    setConfirmMessage(
      `Are you sure you want to lock and calculate ${componentTitle} totals?`
    );
    setCurrentConfirmType(`lock-${componentTitle}`);
    setShowConfirmDialog(true);
  };

  const handleConfirmAction = () => {
    const componentTitle = currentConfirmType?.split("lock-")[1];
    if (componentTitle && grades[componentTitle]) {
      const component = fetchedGroupInfo.components.find(
        (c) => c.title === componentTitle
      );
      if (validateGrades(grades[componentTitle], component)) {
        const updatedGrades = calculateTotal(grades[componentTitle]);
        setGrades((prev) => ({ ...prev, [componentTitle]: updatedGrades }));
        setSemesterStatuses((prev) => ({
          ...prev,
          [componentTitle]: "locked",
        }));
      }
    } else if (currentConfirmType?.startsWith("reset-")) {
      const resetComponentTitle = currentConfirmType.split("reset-")[1];
      const component = fetchedGroupInfo.components.find(
        (c) => c.title === resetComponentTitle
      );
      const resetGrades = fetchedGroupInfo.grades.map((student) => ({
        id: student.id,
        name: student.name,
        enrollment: student.enrollment,
        subComponents: component.sub_components.map((sub) => ({
          title: sub.title,
          max_marks: sub.max_marks,
          marks: "",
          status: "Absent",
        })),
        total: "",
      }));
      setGrades((prev) => ({ ...prev, [resetComponentTitle]: resetGrades }));
      setSemesterStatuses((prev) => ({
        ...prev,
        [resetComponentTitle]: "open",
      }));
    }
    setShowConfirmDialog(false);
    setCurrentConfirmType(null);
  };

  // const handleInputChange = (event, studentId, subTitle, componentTitle) => {
  //   const { value } = event.target;
  //   setGrades((prev) => ({
  //     ...prev,
  //     [componentTitle]: prev[componentTitle].map((student) =>
  //       student.id === studentId
  //         ? {
  //             ...student,
  //             subComponents: student.subComponents.map((sub) =>
  //               sub.title === subTitle
  //                 ? { ...sub, marks: value, status: "" }
  //                 : sub
  //             ),
  //           }
  //         : student
  //     ),
  //   }));
  // };
  const handleInputChange = (event, studentId, subTitle, componentTitle) => {
    const { value } = event.target;
    setGrades((prev) => ({
      ...prev,
      [componentTitle]: prev[componentTitle].map((student) =>
        student.id === studentId
          ? {
              ...student,
              subComponents: student.subComponents.map(
                (sub) =>
                  sub.title === subTitle
                    ? { ...sub, marks: value }
                    : { ...sub, marks: sub.marks } // Preserve other marks
              ),
              // Set status to empty if any marks exist in the row
              status: student.subComponents.some((sub) => sub.marks !== "")
                ? ""
                : "Absent",
            }
          : student
      ),
    }));
  };
  // const handleRadioChange = (event, studentId, componentTitle) => {
  //   const { value } = event.target;
  //   setGrades((prev) => ({
  //     ...prev,
  //     [componentTitle]: prev[componentTitle].map((student) =>
  //       student.id === studentId
  //         ? {
  //             ...student,
  //             subComponents: student.subComponents.map((sub) => ({
  //               ...sub,
  //               status: value,
  //               marks: value ? "" : sub.marks,
  //             })),
  //           }
  //         : student
  //     ),
  //   }));
  // };
  const handleRadioChange = (event, studentId, componentTitle) => {
    const { value } = event.target;
    setGrades((prev) => ({
      ...prev,
      [componentTitle]: prev[componentTitle].map((student) =>
        student.id === studentId
          ? {
              ...student,
              subComponents: student.subComponents.map((sub) => ({
                ...sub,
                marks: student.subComponents.some((s) => s.marks !== "")
                  ? ""
                  : sub.marks,
              })),
              status: value,
            }
          : student
      ),
    }));
  };

  const handleShowConfirmation = (type) => {
    setCurrentSubmitType(type);
    setShowConfirmation(true);
  };

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async () => {
    if (password === "your_secret_password") {
      const apiEndpoint = `/api/submit/${currentSubmitType.toLowerCase()}-semester-grades`;
      const formData = {
        semester: currentSubmitType,
        grades: grades[currentSubmitType],
        password: password,
        groupId: param.id,
      };
      try {
        console.log("Submitting to", apiEndpoint, formData);
        setAlertMessage(
          `Grades submitted successfully for ${currentSubmitType} semester!`
        );
        setAlertSeverity("success");
        setShowAlert(true);
        setShowConfirmation(false);
        setCurrentSubmitType(null);
        setSemesterStatuses((prev) => ({
          ...prev,
          [currentSubmitType]: "locked",
        }));
      } catch (error) {
        console.error("Error submitting grades:", error);
        setAlertMessage(
          `Failed to submit grades for ${currentSubmitType} semester.`
        );
        setAlertSeverity("error");
        setShowAlert(true);
      }
    } else {
      setAlertMessage("Incorrect password.");
      setAlertSeverity("error");
      setShowAlert(true);
    }
    setPassword("");
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setPassword("");
    setCurrentSubmitType(null);
  };

  const resetGrades = (componentTitle) => {
    setConfirmMessage(
      `Are you sure you want to reset ${componentTitle} grades to default?`
    );
    setCurrentConfirmType(`reset-${componentTitle}`);
    setShowConfirmDialog(true);
  };

  const cellStyles = { borderRight: "1px solid rgba(224, 224, 224, 1)" };
  const headerStyles = { backgroundColor: "#EEEEEE" };

  // const renderAccordion = (component) => {
  //   const componentGrades = grades[component.title] || [];
  //   const semesterStatus = semesterStatuses[component.title] || "open";
  //   return (
  //     <Accordion key={component.component_id} variant="outlined" disabled={component.locked} defaultExpanded={true}>
  //       <AccordionSummary expandIcon={<ExpandMoreIcon />}>
  //         <Stack direction="row" justifyContent="space-between" width="100%">
  //           <Typography variant="h6">{component.title} semester grading</Typography>
  //           {component.locked && <Typography variant="caption" color="text.secondary">Grades have already been submitted</Typography>}
  //         </Stack>
  //       </AccordionSummary>
  //       <AccordionDetails>
  //         <TableContainer>
  //           <Table sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
  //             <TableHead>
  //               <TableRow sx={headerStyles}>
  //                 <TableCell sx={cellStyles}>Name and enrollment</TableCell>
  //                 {component.sub_components.map((sub) => (
  //                   <TableCell key={sub.component_id} sx={cellStyles}>
  //                     {sub.title} <br /> (out of {sub.max_marks})
  //                   </TableCell>
  //                 ))}
  //                 <TableCell sx={cellStyles}>Total</TableCell>
  //                 <TableCell sx={cellStyles}>Status</TableCell>
  //               </TableRow>
  //             </TableHead>
  //             <TableBody>
  //               {componentGrades.map((student) => (
  //                 <TableRow key={student.id}>
  //                   <TableCell sx={cellStyles}>
  //                     {student.name} <br /> <ProjectTag label={student.enrollment} />
  //                   </TableCell>
  //                   {student.subComponents.map((sub) => (
  //                     <TableCell key={sub.title} sx={cellStyles}>
  //                       <TextField
  //                         type="number"
  //                         value={sub.marks}
  //                         onChange={(e) =>
  //                           handleInputChange(e, student.id, sub.title, component.title)
  //                         }
  //                         size="small"
  //                         disabled={semesterStatus === "locked"}
  //                         sx={{ width: "80px" }}
  //                       />
  //                     </TableCell>
  //                   ))}
  //                   <TableCell sx={cellStyles}>
  //                     <TextField
  //                       value={student.total}
  //                       disabled
  //                       size="small"
  //                       sx={{ width: "80px" }}
  //                     />
  //                   </TableCell>
  //                   <TableCell sx={cellStyles}>
  //                     <FormControl>
  //                       <RadioGroup
  //                         row
  //                         value={
  //                           student.subComponents[0].status === "Present"
  //                             ? ""
  //                             : student.subComponents[0].status
  //                         }
  //                         onChange={(e) =>
  //                           handleRadioChange(e, student.id, component.title)
  //                         }
  //                       >
  //                         <FormControlLabel
  //                           value="Absent"
  //                           control={<Radio disabled={semesterStatus === "locked"} size="small" />}
  //                           label="Absent"
  //                         />
  //                         <FormControlLabel
  //                           value="Incomplete"
  //                           control={<Radio disabled={semesterStatus === "locked"} size="small" />}
  //                           label="Incomplete"
  //                         />
  //                         <FormControlLabel
  //                           value="Withheld"
  //                           control={<Radio disabled={semesterStatus === "locked"} size="small" />}
  //                           label="Withheld"
  //                         />
  //                       </RadioGroup>
  //                     </FormControl>
  //                   </TableCell>
  //                 </TableRow>
  //               ))}
  //             </TableBody>
  //           </Table>
  //         </TableContainer>
  //         <Stack direction="row" spacing={2} mt={2} justifyContent="flex-start">
  //           {semesterStatus !== "locked" ? (
  //             <Button
  //               variant="contained"
  //               color="primary"
  //               disabled = {component.locked}
  //               onClick={() => handleLockAndCalculate(component.title)}
  //               size="medium"
  //             >
  //               Lock and Calculate
  //             </Button>
  //           ) : (
  //             <>
  //               <Button
  //                 variant="contained"
  //                 color="success"
  //                 disabled = {component.locked}
  //                 onClick={() => handleShowConfirmation(component.title)}
  //                 size="medium"
  //               >
  //                 Submit
  //               </Button>
  //               <Button
  //                 variant="outlined"
  //                 disabled = {component.locked}
  //                 onClick={() => resetGrades(component.title)}
  //                 size="medium"
  //               >
  //                 Reset Grades
  //               </Button>
  //             </>
  //           )}
  //         </Stack>
  //       </AccordionDetails>
  //     </Accordion>
  //   );
  // };
  const renderAccordion = (component) => {
    const componentGrades = grades[component.title] || [];
    const semesterStatus = semesterStatuses[component.title] || "open";
    return (
      <Accordion
        key={component.component_id}
        variant="outlined"
        disabled={component.locked}
        defaultExpanded={true}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" justifyContent="space-between" width="100%">
            <Typography variant="h6">
              {component.title} semester grading
            </Typography>
            {component.locked && (
              <Typography variant="caption" color="text.secondary">
                Grades have already been submitted
              </Typography>
            )}
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer>
            <Table sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
              <TableHead>
                <TableRow sx={headerStyles}>
                  <TableCell sx={cellStyles}>Name and enrollment</TableCell>
                  {component.sub_components.map((sub) => (
                    <TableCell key={sub.component_id} sx={cellStyles}>
                      {sub.title} <br /> (out of {sub.max_marks})
                    </TableCell>
                  ))}
                  <TableCell sx={cellStyles}>Total</TableCell>
                  <TableCell sx={cellStyles}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {componentGrades.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell sx={cellStyles}>
                      {student.name} <br />{" "}
                      <ProjectTag label={student.enrollment} />
                    </TableCell>
                    {student.subComponents.map((sub) => (
                      <TableCell key={sub.title} sx={cellStyles}>
                        <TextField
                          type="number"
                          value={sub.marks}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              student.id,
                              sub.title,
                              component.title
                            )
                          }
                          size="small"
                          disabled={semesterStatus === "locked"}
                          sx={{ width: "80px" }}
                        />
                      </TableCell>
                    ))}
                    <TableCell sx={cellStyles}>
                      <TextField
                        value={student.total}
                        disabled
                        size="small"
                        sx={{ width: "80px" }}
                      />
                    </TableCell>
                    <TableCell sx={cellStyles}>
                      <FormControl>
                        <RadioGroup
                          row
                          value={
                            student.status === "Present" ? "" : student.status
                          }
                          onChange={(e) =>
                            handleRadioChange(e, student.id, component.title)
                          }
                        >
                          <FormControlLabel
                            value="Absent"
                            control={
                              <Radio
                                disabled={semesterStatus === "locked"}
                                size="small"
                              />
                            }
                            label="Absent"
                          />
                          <FormControlLabel
                            value="Incomplete"
                            control={
                              <Radio
                                disabled={semesterStatus === "locked"}
                                size="small"
                              />
                            }
                            label="Incomplete"
                          />
                          <FormControlLabel
                            value="Withheld"
                            control={
                              <Radio
                                disabled={semesterStatus === "locked"}
                                size="small"
                              />
                            }
                            label="Withheld"
                          />
                        </RadioGroup>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" spacing={2} mt={2} justifyContent="flex-start">
            {semesterStatus !== "locked" ? (
              <Button
                variant="contained"
                color="primary"
                disabled={component.locked}
                onClick={() => handleLockAndCalculate(component.title)}
                size="medium"
              >
                Lock and Calculate
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="success"
                  disabled={component.locked}
                  onClick={() => handleShowConfirmation(component.title)}
                  size="medium"
                >
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  disabled={component.locked}
                  onClick={() => resetGrades(component.title)}
                  size="medium"
                >
                  Reset Grades
                </Button>
              </>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  };
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" ml={2}>
        Grading Portal
      </Typography>
      {fetchedGroupInfo && (
        <>
          <Stack
            direction={{ lg: "row", md: "column" }}
            gap={1}
            alignItems="start"
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 2,
                gap: 1,
                width: "300px",
              }}
              variant="outlined"
            >
              <InfoRow label="Group Number" value={fetchedGroupInfo.group_id} />
              <InfoRow
                label="Project Title"
                value="ECHO: a university ecosystem application"
              />
            </Card>
            <Stack direction="column" gap={2}>
              {fetchedGroupInfo.components.map((component) =>
                renderAccordion(component)
              )}
            </Stack>
          </Stack>

          <Dialog open={showConfirmation} onClose={handleCloseConfirmation}>
            <DialogTitle>Confirm Submission</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter your password to submit the grades for{" "}
                {currentSubmitType} semester.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmation}>Cancel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={showConfirmDialog} onClose={handleCloseConfirmDialog}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
              <DialogContentText>{confirmMessage}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
              <Button onClick={handleConfirmAction} autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={showAlert}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseAlert}
              severity={alertSeverity}
              sx={{ width: "100%" }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </>
      )}
      {!fetchedGroupInfo && <CircularProgress />}
    </Box>
  );
}

const InfoRow = ({ label, value }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="body2" sx={{ minWidth: "120px", flexShrink: 0 }}>
        {label}:
      </Typography>
      <ProjectTag label={value} />
    </Stack>
  );
};

export default GradingPortalFAC;
