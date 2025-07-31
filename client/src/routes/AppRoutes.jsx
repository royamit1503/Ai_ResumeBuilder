// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Home 
import Home from "../pages/Home.jsx";

// Login 
import Login from "../pages/auth/Login.jsx";
import SignUp from "../pages/auth/Signup.jsx";

// Main TemplatePage
import TemplatePage from '../pages/TemplatePage.jsx';

// ResumeTemplates
import Template1 from "../components/ai-resume-templates/Template1.jsx";
import Template2 from '../components/ai-resume-templates/Template2.jsx';
import Template3 from '../components/ai-resume-templates/Template3.jsx';

// Not Found
import NotFound from "../pages/NotFound.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<Home />} />
      <Route path='/templatepage' element={<TemplatePage />} />
      <Route path='/template1' element={<Template1 />} />
      <Route path='/template2' element={<Template2 />} />
      <Route path='/template3' element={<Template3 />} />

      {/* Login and Signup */}
      <Route path='/Login' element={<Login />} />
      <Route path='/SignUp' element={<SignUp />} />

      {/* 404 Not Found Route */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
