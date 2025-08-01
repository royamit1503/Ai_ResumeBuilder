// 📁 src/api/resumeTemplate3Api.js

import axios from "axios";

// Save the resume to backend
export const saveResume = async (resumeData) => {
  try {
    const response = await axios.post("/api/resume/save", resumeData);
    return response.data;
  } catch (error) {
    console.error("❌ Error saving resume:", error);
    throw error;
  }
};

// Enhance a specific section of the resume using AI (e.g., profile, experience, etc.)
export const enhanceResumeSection = async (section, resumeData) => {
  try {
    const response = await axios.post(`/api/resume/enhance`, {
      section,
      data: resumeData,
    });
    return response.data;
  } catch (error) {
    console.error(`❌ Error enhancing ${section} section:`, error);
    return resumeData; // fallback: return unmodified data
  }
};
