import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import ContactPage from "./pages/ContactPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

import ProfilePage from "./pages/ProfilePage";
import CreatorDashboard from "./pages/CreatorDashboard";
import BackerDashboard from "./pages/BackerDashboard";
import Footer from "./components/Footer";
import EditProfilePage from "./pages/EditProfilePage";
import CalendarPage from "./pages/CalendarPage";
import DashboardPage from "./pages/DashboardPage";
import EventDetailPage from "./pages/EventDetailPage";

import SuccessPage from "./pages/SuccessPage";
import CancelPage from "./pages/CancelPage";
// other imports

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailsPage />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/creator" element={<CreatorDashboard />} />
            <Route path="/dashboard/backer" element={<BackerDashboard />} />

            <Route path="/events" element={<CalendarPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />

            <Route path="/success" element={<SuccessPage />} />
            <Route path="/cancel" element={<CancelPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
