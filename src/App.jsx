import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import FacultyRoute from "./components/FacultyRoute";
import SignIn from "./pages/SignIn";
import DashboardSTU from "./pages/DashboardSTU";
import DashboardFAC from "./pages/DashboardFAC";
import ViewGroupsList from "./pages/ViewProjectPagesSTU/ViewGroupsList";
import ViewProject from "./pages/ViewProjectPagesSTU/ViewProject";
import LogBookSTU from "./pages/ViewProjectPagesSTU/LogBookSTU";
import EvaluationSTU from "./pages/ViewProjectPagesSTU/EvaluationSTU";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ViewGroupsListFAC from "./pages/ViewProjectPagesFAC/ViewGroupsListFAC";
import ViewProjectFAC from "./pages/ViewProjectPagesFAC/ViewProjectFAC";
import LogBookFAC from "./pages/ViewProjectPagesFAC/LogBookFAC";
import EvaluationFAC from "./pages/ViewProjectPagesFAC/EvaluationFAC";
import GradingPortalFAC from "./pages/ViewProjectPagesFAC/GradingPortalFAC";
import ProjectTimelineFAC from "./pages/ViewProjectPagesFAC/ProjectTimelineFAC";
import PeopleFAC from "./pages/ViewProjectPagesFAC/PeopleFAC";
import ProjectTimeline from "./pages/ViewProjectPagesSTU/ProjectTimeline";
import PeopleSTU from "./pages/ViewProjectPagesSTU/PeopleSTU";
import ResetPassword from "./pages/ResetPassword";
import DashboardSuperUser from "./pages/DashboardSuperUser";
import Dashboard from "./pages/DashboardSuperUserComponents/Dashboard";
import ActivityLogs from "./pages/DashboardSuperUserComponents/ActivityLogs";
import Reports from "./pages/DashboardSuperUserComponents/Reports";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/signin" element={<Navigate to={"/"} />} />

            <Route element={<PrivateRoute />}>
              {/* faculty side routes */}
              <Route element={<FacultyRoute />}>
                <Route
                  path="/gradingportal/:id"
                  element={<GradingPortalFAC />}
                />
                <Route path="/facultydashboard" element={<DashboardFAC />}>
                  <Route index element={<ViewGroupsListFAC />} />
                  <Route path="ProjectDetails/:id" element={<ViewProjectFAC />}>
                    <Route index element={<LogBookFAC />} />
                    <Route path="logbook" element={<LogBookFAC />} />
                    <Route path="evaluation" element={<EvaluationFAC />} />
                    <Route path="people" element={<PeopleFAC />} />
                    <Route
                      path="projecttimeline"
                      element={<ProjectTimelineFAC />}
                    />
                  </Route>
                </Route>
              </Route>

              {/* student side routes */}
              <Route path="/studentdashboard" element={<DashboardSTU />}>
                <Route index element={<ViewGroupsList />} />
                <Route path="ProjectDetails/:id" element={<ViewProject />}>
                  <Route index element={<LogBookSTU />} />
                  <Route path="logbook" element={<LogBookSTU />} />
                  <Route path="evaluation" element={<EvaluationSTU />} />
                  <Route path="people" element={<PeopleSTU />} />
                  <Route path="projecttimeline" element={<ProjectTimeline />} />
                </Route>
              </Route>
              <Route path="/admindashboard" element={<DashboardSuperUser />}>
                <Route index element={<Dashboard />} />
                <Route path="reports" element={<Reports />} />
                <Route path="activitylogs" element={<ActivityLogs />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
