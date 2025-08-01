import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";

// Assuming these functions and context exist elsewhere, as they are called in the original code
const enhanceResumeSection = async (section, data) => {
  console.log(`AI enhancing section: ${section} with data:`, data);
  // Simulating an AI response
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (section === "profile") {
    return `Enhanced profile text based on ${data.content}`;
  } else if (section === "experience") {
    return data.content.map(item => ({
      ...item,
      bullets: ["Enhanced bullet point 1", "Enhanced bullet point 2"]
    }));
  } else if (section === "projects") {
    return data.content.map(item => ({
      ...item,
      description: `Enhanced project description for ${item.name}`
    }));
  }
  return null;
};
const saveResume = async (data) => {
  console.log("Saving resume data to backend:", data);
  return new Promise((resolve) => setTimeout(resolve, 500));
};
const fetchResume = async () => {
  console.log("Fetching resume data...");
  return new Promise((resolve) => setTimeout(() => resolve(null), 500));
};
const downloadResumePDF = async (url) => {
  console.log("Generating PDF for:", url);
  return new Promise((resolve) => setTimeout(() => resolve("fake-pdf-url"), 1000));
};


const Sidebar = ({ onSave, onEnhance, onDownload, editMode, onToggleEditMode, loadingSection }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="lg:w-64 lg:flex-shrink-0 no-print">
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md lg:hidden no-print"
        onClick={toggleSidebar}
      >
        ≡
      </button>

      {showSidebar && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden no-print"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 transition-transform duration-300 ease-in-out z-50 no-print ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:h-auto lg:overflow-y-visible`}
      >
        <button
          className="absolute top-3 right-3 text-white lg:hidden"
          onClick={toggleSidebar}
        >
          ✕
        </button>
        
        {/* The scrollable area starts here */}
        <div className="flex flex-col h-full space-y-3 mt-14 overflow-y-auto lg:overflow-y-visible lg:h-auto">
          <h2 className="text-lg font-bold hidden lg:block" style={{color: '#cbd5e1' }}>Resume Tools</h2>
          <NavItem label="Save Resume" onClick={onSave} />
          <NavItem label="Enhance Profile" onClick={() => onEnhance("profile")} loading={loadingSection === "profile"} />
          <NavItem label="Enhance Experience" onClick={() => onEnhance("experience")} loading={loadingSection === "experience"} />
          <NavItem label="Enhance Projects" onClick={() => onEnhance("projects")} loading={loadingSection === "projects"} />
          <NavItem label="Download PDF" onClick={onDownload} />
        </div>
        {/* The scrollable area ends here */}
      </div>
    </div>
  );
};

const NavItem = ({ label, onClick, loading }) => (
  <div
    className="flex items-center p-3 rounded-lg cursor-pointer transition duration-200 hover:bg-gray-700"
    onClick={!loading ? onClick : null}
  >
    <span className="ml-2 whitespace-normal">{loading ? "Enhancing..." : label}</span>
  </div>
);

export default function ResumeTemplate3() {
  const resumeRef = useRef(null);

  const initialResumeData = {
    name: "ISABELLE TODD",
    contact:
      "91+ 6369411212 | ✉ isabelle@gmail.com | 📍 New York City, NY | 🔗 LinkedIn",
    headerProfile: "I solve problems and help people overcome obstacles.",
    profileSectionText:
      "Result-oriented project team leader with 5 years of experience in project and product management, developing and managing fast-growing startups.",
    experiences: [
      {
        id: "1",
        title: "Software Engineer",
        company: "Google",
        duration: "2020 - Present",
        bullets: ["Developed scalable web applications", "Optimized backend performance"],
      },
      {
        id: "2",
        title: "Frontend Developer",
        company: "Facebook",
        duration: "2018 - 2020",
        bullets: ["Built reusable UI components", "Improved website performance by 40%"],
      },
    ],
    education: [
      {
        id: "1",
        degree: "Bachelor of Science in Computer Science",
        institution: "Harvard University",
        duration: "2016 - 2020",
      },
      {
        id: "2",
        degree: "Master of Science in AI",
        institution: "MIT",
        duration: "2020 - 2022",
      },
    ],
    projects: [
      {
        id: "1",
        title: "E-commerce Website",
        description:
          "Developed a full-stack e-commerce platform with React and Node.js.",
      },
      {
        id: "2",
        title: "AI Chatbot",
        description: "Built an AI-powered chatbot for customer service automation.",
      },
    ],
    certifications: [
      {
        id: "1",
        name: "AWS Certified Solutions Architect",
        organization: "Amazon Web Services",
        issuedDate: "2023",
      },
      {
        id: "2",
        name: "Google Cloud Professional Architect",
        organization: "Google",
        issuedDate: "2022",
      },
    ],
    skills: ["JavaScript", "React.js", "Tailwind CSS", "Node.js"],
  };

  const [resumeData, setResumeData] = useState(initialResumeData);
  const [localData, setLocalData] = useState(initialResumeData);
  const [editMode, setEditMode] = useState(false);
  const [loadingSection, setLoadingSection] = useState(null);

  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    duration: "",
    bullets: "",
  });

  const [showEducationForm, setShowEducationForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    duration: "",
  });

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({ title: "", description: "" });

  const [showCertificationForm, setShowCertificationForm] = useState(false);
  const [editingCertification, setEditingCertification] = useState(null);
  const [newCertification, setNewCertification] = useState({
    title: "",
    issuer: "",
    year: "",
  });

  const [showSkillForm, setShowSkillForm] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const handleFieldChange = (section, field, value, id = null) => {
    setLocalData((prev) => {
      const updatedData = { ...prev };
      if (id) {
        const itemIndex = updatedData[section].findIndex(item => item.id === id);
        if (itemIndex > -1) {
          updatedData[section][itemIndex] = { ...updatedData[section][itemIndex], [field]: value };
        }
      } else {
        updatedData[field] = value;
      }
      return updatedData;
    });
  };

  const handleSave = async () => {
    setResumeData(localData);
    setEditMode(false);
    await saveResume(localData);
    alert("Resume saved successfully!");
  };

  const handleCancel = () => {
    setLocalData(resumeData);
    setEditMode(false);
  };

  const handleEnhance = async (section) => {
    console.log(`handleEnhance called for: ${section}`);
    setLoadingSection(section);

    let requestData;

    if (section === "profile") {
      const experienceTitle =
        localData.experiences.length > 0 ? localData.experiences[0].title : "Professional";
      const experienceYears =
        new Date().getFullYear() -
        parseInt(localData.experiences[0]?.duration.split(" - ")[0] || "2020");
      const formattedSkills = localData.skills.join(", ");
      const educationDetails = localData.education
        .map((edu) => `${edu.degree} from ${edu.institution}`)
        .join("; ");

      requestData = {
        section: "profile",
        content: localData.profileSectionText,
        experienceTitle,
        experienceYears,
        skills: formattedSkills,
        education: educationDetails,
      };
    } else if (section === "experience") {
      requestData = {
        section: "experience",
        content: localData.experiences.map((exp) => ({
          id: exp.id,
          bullets: exp.bullets.join("\n").replace(/\n\s*\n/g, "\n"),
        })),
      };
    } else if (section === "projects") {
      requestData = {
        section: "projects",
        content: localData.projects.map((proj) => ({
          id: proj.id,
          name: proj.title,
          description: proj.description,
        })),
      };
    } else {
      console.log("No section selected");
    }

    console.log("Sending request to AI:", requestData);

    try {
      const enhancedData = await enhanceResumeSection(
        requestData.section,
        requestData
      );

      console.log("AI Response:", enhancedData);

      if (section === "profile") {
        setLocalData({ ...localData, profileSectionText: enhancedData });
      } else if (section === "experience" && Array.isArray(enhancedData)) {
        const updatedExperiences = localData.experiences.map((exp) => {
          const enhancedExp = enhancedData.find((e) => e.id === exp.id);
          return enhancedExp && enhancedExp.bullets
            ? {
                ...exp,
                bullets: Array.isArray(enhancedExp.bullets)
                  ? enhancedExp.bullets
                  : enhancedExp.bullets.split("\n"),
              }
            : exp;
        });
        setLocalData({ ...localData, experiences: updatedExperiences });
      } else if (section === "projects" && Array.isArray(enhancedData)) {
        const updatedProjects = localData.projects.map((proj) => {
          const enhancedProj = enhancedData.find((e) => e.id === proj.id);
          return enhancedProj
            ? { ...proj, description: enhancedProj.description.trim() }
            : proj;
        });
        setLocalData({ ...localData, projects: updatedProjects });
      } else {
        console.error("Unexpected AI response:", enhancedData);
      }
    } catch (error) {
      console.error("Error enhancing:", error);
    }

    setLoadingSection(null);
  };

  const handleDownloadPDF = async () => {
    console.log("📤 Updating content before PDF download...");
    window.print();
  };

  const addOrUpdateExperience = (e) => {
    e.preventDefault();
    if (!newExperience.title || !newExperience.company || !newExperience.duration) return;
    if (editingExperience) {
      setLocalData(prev => ({
        ...prev,
        experiences: prev.experiences.map((exp) =>
          exp.id === editingExperience.id
            ? {
                ...newExperience,
                id: String(exp.id),
                bullets: newExperience.bullets.split("\n"),
              }
            : exp
        )
      }));
      setEditingExperience(null);
    } else {
      setLocalData(prev => ({
        ...prev,
        experiences: [
          ...prev.experiences,
          {
            id: String(Date.now()),
            ...newExperience,
            bullets: newExperience.bullets.split("\n"),
          },
        ]
      }));
    }
    setShowExperienceForm(false);
    setNewExperience({ title: "", company: "", duration: "", bullets: "" });
  };
  const removeExperience = (id) =>
    setLocalData(prev => ({ ...prev, experiences: prev.experiences.filter((exp) => exp.id !== id)}));

  const addOrUpdateEducation = (e) => {
    e.preventDefault();
    if (!newEducation.degree || !newEducation.institution || !newEducation.duration) return;
    if (editingEducation) {
      setLocalData(prev => ({
        ...prev,
        education: prev.education.map((edu) =>
          edu.id === editingEducation.id ? { ...newEducation, id: String(edu.id) } : edu
        )
      }));
      setEditingEducation(null);
    } else {
      setLocalData(prev => ({ ...prev, education: [...prev.education, { id: String(Date.now()), ...newEducation }]}));
    }
    setShowEducationForm(false);
    setNewEducation({ degree: "", institution: "", duration: "" });
  };
  const removeEducation = (id) =>
    setLocalData(prev => ({ ...prev, education: prev.education.filter((edu) => edu.id !== id)}));

  const addOrUpdateProject = (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) return;
    if (editingProject) {
      setLocalData(prev => ({
        ...prev,
        projects: prev.projects.map((proj) =>
          proj.id === editingProject.id ? { ...newProject, id: String(proj.id) } : proj
        )
      }));
      setEditingProject(null);
    } else {
      setLocalData(prev => ({ ...prev, projects: [...prev.projects, { id: String(Date.now()), ...newProject }]}));
    }
    setShowProjectForm(false);
    setNewProject({ title: "", description: "" });
  };
  const removeProject = (id) =>
    setLocalData(prev => ({ ...prev, projects: prev.projects.filter((proj) => proj.id !== id)}));

  const addOrUpdateCertification = (e) => {
    e.preventDefault();
    if (!newCertification.title || !newCertification.issuer || !newCertification.year) return;
    const formattedCert = {
      id: String(editingCertification ? editingCertification.id : Date.now()),
      name: newCertification.title,
      organization: newCertification.issuer,
      issuedDate: newCertification.year,
    };
    if (editingCertification) {
      setLocalData(prev => ({
        ...prev,
        certifications: prev.certifications.map((cert) =>
          cert.id === editingCertification.id ? formattedCert : cert
        )
      }));
      setEditingCertification(null);
    } else {
      setLocalData(prev => ({ ...prev, certifications: [...prev.certifications, formattedCert] }));
    }
    setShowCertificationForm(false);
    setNewCertification({ title: "", issuer: "", year: "" });
  };
  const removeCertification = (id) =>
    setLocalData(prev => ({ ...prev, certifications: prev.certifications.filter((cert) => String(cert.id) !== String(id)) }));

  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    setLocalData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    setNewSkill("");
    setShowSkillForm(false);
  };
  const removeSkill = (skill) =>
    setLocalData(prev => ({ ...prev, skills: prev.skills.filter((s) => s !== skill)}));

  useEffect(() => {
    const getResumeData = async () => {
      const data = await fetchResume();
      if (data) {
        const mergedData = {
          ...initialResumeData,
          name: data.name || initialResumeData.name,
          contact: data.contact || initialResumeData.contact,
          headerProfile: data.headerProfile || initialResumeData.headerProfile,
          profileSectionText: data.profile || initialResumeData.profileSectionText,
          experiences: data.experiences || initialResumeData.experiences,
          projects: data.projects || initialResumeData.projects,
          education: data.education || initialResumeData.education,
          certifications: data.certifications || initialResumeData.certifications,
          skills: data.skills || initialResumeData.skills,
        };
        setResumeData(mergedData);
        setLocalData(mergedData);
      }
    };
    getResumeData();
  }, []);

  const dataToDisplay = editMode ? localData : resumeData;

  return (
    <div id="resume-container" className="min-h-screen flex flex-col bg-gray-50">
      <Navbar className="no-print" />
      <div className="flex w-full">
        <div className="no-print">
          <Sidebar
            onSave={handleSave}
            onEnhance={handleEnhance}
            onDownload={handleDownloadPDF}
            loadingSection={loadingSection}
          />
        </div>

        <div
          ref={resumeRef}
          style={{
            flex: 1,
            transition: 'margin-left 0.3s ease-in-out',
            backgroundColor: '#ffffff',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
            padding: '2rem',
            marginLeft: '0',
            maxWidth: '1000px',
            margin: '2rem auto',
          }}
          className="main-content"
        >
          <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
            {editMode ? (
              <input
                type="text"
                value={localData.name}
                onChange={(e) => setLocalData({ ...localData, name: e.target.value })}
                style={{ fontSize: '2.25rem', fontWeight: 'bold', width: '100%', outline: 'none', textAlign: 'center' }}
              />
            ) : (
              <div style={{ fontSize: '2.25rem', fontWeight: 'bold', width: '100%', outline: 'none', textAlign: 'center' }}>
                {resumeData.name}
              </div>
            )}
            {editMode ? (
              <input
                type="text"
                value={localData.headerProfile}
                onChange={(e) => setLocalData({ ...localData, headerProfile: e.target.value })}
                style={{ fontSize: '1.25rem', color: '#6b7280', width: '100%', outline: 'none', textAlign: 'center' }}
              />
            ) : (
              <div style={{ fontSize: '1.25rem', color: '#6b7280', width: '100%', outline: 'none', textAlign: 'center' }}>
                {resumeData.headerProfile}
              </div>
            )}
            {editMode ? (
              <input
                type="text"
                value={localData.contact}
                onChange={(e) => setLocalData({ ...localData, contact: e.target.value })}
                style={{ fontSize: '1rem', color: '#9ca3af', width: '100%', outline: 'none', textAlign: 'center' }}
              />
            ) : (
              <div style={{ fontSize: '1rem', color: '#9ca3af', width: '100%', outline: 'none', textAlign: 'center' }}>
                {resumeData.contact}
              </div>
            )}
          </header>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', borderBottom: '4px solid #000000', paddingBottom: '0.5rem' }}>
              PROFILE
            </h2>
            {loadingSection === "profile" ? (
              <p>Enhancing...</p>
            ) : editMode ? (
              <textarea
                value={localData.profileSectionText}
                onChange={(e) => setLocalData({ ...localData, profileSectionText: e.target.value })}
                style={{ color: '#4b5563', marginTop: '0.5rem', outline: 'none', width: '100%', resize: 'vertical' }}
              />
            ) : (
              <div style={{ color: '#4b5563', marginTop: '0.5rem', outline: 'none' }}>
                {resumeData.profileSectionText}
              </div>
            )}
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '4px solid #000000', paddingBottom: '0.5rem' }}>
              EXPERIENCE
            </h2>
            {dataToDisplay.experiences.map((exp, index) => (
              <div key={exp.id || `exp-${index}`} style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', '@media(min-width: 1024px)': { flexDirection: 'row' }, justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ outline: 'none', width: '100%' }}>
                    {editMode ? (
                      <>
                        <input
                          type="text"
                          value={localData.experiences.find(e => e.id === exp.id)?.title || ""}
                          onChange={(e) => handleFieldChange("experiences", "title", e.target.value, exp.id)}
                          style={{ fontSize: '1.125rem', fontWeight: 'semibold' }}
                        />
                        <input
                          type="text"
                          value={`${localData.experiences.find(e => e.id === exp.id)?.company || ""} | ${localData.experiences.find(e => e.id === exp.id)?.duration || ""}`}
                          onChange={(e) => {
                            const [company, duration] = e.target.value.split(" | ");
                            handleFieldChange("experiences", "company", company.trim(), exp.id);
                            handleFieldChange("experiences", "duration", duration.trim(), exp.id);
                          }}
                          style={{ color: '#6b7280' }}
                        />
                        <textarea
                          value={localData.experiences.find(e => e.id === exp.id)?.bullets.join("\n") || ""}
                          onChange={(e) => handleFieldChange("experiences", "bullets", e.target.value.split("\n"), exp.id)}
                          placeholder="Bullet points (separate by new line)"
                          style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', width: '100%', marginBottom: '0.5rem' }}
                        />
                      </>
                    ) : (
                      <>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 'semibold' }}>{exp.title}</h3>
                        <p style={{ color: '#6b7280' }}>{exp.company} | {exp.duration}</p>
                        <ul style={{ listStyleType: 'disc', listStylePosition: 'inside', color: '#4b5563', marginTop: '0.5rem', marginLeft: '1rem' }}>
                          {loadingSection === "experience" ? (
                            <p>Enhancing...</p>
                          ) : (
                            exp.bullets.map((point, i) => (
                              <li key={`bullet-${exp.id || index}-${i}`}>{point}</li>
                            ))
                          )}
                        </ul>
                      </>
                    )}
                  </div>
                  {editMode && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', '@media(min-width: 1024px)': { marginTop: '0' } }} className="no-print">
                      <button
                        onClick={() => removeExperience(exp.id)}
                        style={{ backgroundColor: '#ef4444', color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem' }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {editMode && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }} className="no-print">
                <button
                  onClick={() => {
                    setEditingExperience(null);
                    setNewExperience({ title: "", company: "", duration: "", bullets: "" });
                    setShowExperienceForm(true);
                  }}
                  style={{ backgroundColor: '#059669', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem', marginTop: '1rem' }}
                >
                  Add Experience
                </button>
              </div>
            )}
          </section>

          {showExperienceForm && (
            <div style={{ position: 'fixed', inset: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '50' }} className="no-print">
              <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.375rem', width: '91.666667%', maxWidth: '28rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  {"Add New Experience"}
                </h2>
                <form onSubmit={addOrUpdateExperience} style={{ display: 'grid', gap: '1rem' }}>
                  <input
                    type="text"
                    name="title"
                    value={newExperience.title}
                    onChange={(e) =>
                      setNewExperience({ ...newExperience, title: e.target.value })
                    }
                    placeholder="Title"
                    style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', width: '100%', marginBottom: '0.5rem' }}
                  />
                  <input
                    type="text"
                    name="company"
                    value={newExperience.company}
                    onChange={(e) =>
                      setNewExperience({ ...newExperience, company: e.target.value })
                    }
                    placeholder="Company"
                    style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', width: '100%', marginBottom: '0.5rem' }}
                  />
                  <input
                    type="text"
                    name="duration"
                    value={newExperience.duration}
                    onChange={(e) =>
                      setNewExperience({ ...newExperience, duration: e.target.value })
                    }
                    placeholder="Duration"
                    style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', width: '100%', marginBottom: '0.5rem' }}
                  />
                  <textarea
                    name="bullets"
                    value={newExperience.bullets}
                    onChange={(e) =>
                      setNewExperience({ ...newExperience, bullets: e.target.value })
                    }
                    placeholder="Bullet points (separate by new line)"
                    style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', width: '100%', marginBottom: '0.5rem' }}
                  ></textarea>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowExperienceForm(false)}
                      style={{ backgroundColor: '#9ca3af', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ backgroundColor: '#059669', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '4px solid #000000', paddingBottom: '0.5rem' }}>
              EDUCATION
            </h2>
            {dataToDisplay.education.map((edu, index) => (
              <div key={edu.id || `edu-${index}`} style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', '@media(min-width: 1024px)': { flexDirection: 'row' }, justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ outline: 'none', width: '100%' }}>
                    {editMode ? (
                      <>
                        <input
                          type="text"
                          value={localData.education.find(e => e.id === edu.id)?.degree || ""}
                          onChange={(e) => handleFieldChange("education", "degree", e.target.value, edu.id)}
                          style={{ fontWeight: 'semibold' }}
                        />
                        <input
                          type="text"
                          value={`${localData.education.find(e => e.id === edu.id)?.institution || ""} | ${localData.education.find(e => e.id === edu.id)?.duration || ""}`}
                          onChange={(e) => {
                            const [institution, duration] = e.target.value.split(" | ");
                            handleFieldChange("education", "institution", institution.trim(), edu.id);
                            handleFieldChange("education", "duration", duration.trim(), edu.id);
                          }}
                          style={{ color: '#6b7280' }}
                        />
                      </>
                    ) : (
                      <>
                        <p style={{ fontWeight: 'semibold' }}>{edu.degree}</p>
                        <p style={{ color: '#6b7280' }}>{edu.institution} | {edu.duration}</p>
                      </>
                    )}
                  </div>
                  {editMode && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', '@media(min-width: 1024px)': { marginTop: '0' } }} className="no-print">
                      <button
                        onClick={() => removeEducation(edu.id)}
                        style={{ backgroundColor: '#ef4444', color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem' }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {editMode && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }} className="no-print">
                <button
                  onClick={() => setShowEducationForm(true)}
                  style={{ backgroundColor: '#059669', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem', marginTop: '1rem' }}
                >
                  Add Education
                </button>
              </div>
            )}
          </section>

          {showEducationForm && (
            <div style={{ position: 'fixed', inset: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '50' }} className="no-print">
              <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.375rem', width: '91.666667%', maxWidth: '28rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  {"Add New Education"}
                </h2>
                <form onSubmit={addOrUpdateEducation} style={{ display: 'grid', gap: '1rem' }}>
                  <input
                    type="text"
                    name="degree"
                    value={newEducation.degree}
                    onChange={(e) =>
                      setNewEducation({ ...newEducation, degree: e.target.value })
                    }
                    placeholder="Degree"
                    style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', width: '100%', marginBottom: '0.5rem' }}
                  />
                  <input
                    type="text"
                    name="institution"
                    value={newEducation.institution}
                    onChange={(e) =>
                      setNewEducation({ ...newEducation, institution: e.target.value })
                    }
                    placeholder="Institution"
                    style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', width: '100%', marginBottom: '0.5rem' }}
                  />
                  <input
                    type="text"
                    name="duration"
                    value={newEducation.duration}
                    onChange={(e) =>
                      setNewEducation({ ...newEducation, duration: e.target.value })
                    }
                    placeholder="Duration"
                    style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', width: '100%', marginBottom: '0.5rem' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowEducationForm(false)}
                      style={{ backgroundColor: '#9ca3af', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ backgroundColor: '#059669', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '4px solid #000000', paddingBottom: '0.5rem' }}>
              PROJECTS
            </h2>
            {dataToDisplay.projects.map((proj, index) => (
              <div key={proj.id || `proj-${index}`} style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', '@media(min-width: 1024px)': { flexDirection: 'row' }, justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ outline: 'none', width: '100%' }}>
                    {editMode ? (
                      <>
                        <input
                          type="text"
                          value={localData.projects.find(p => p.id === proj.id)?.title || ""}
                          onChange={(e) => handleFieldChange("projects", "title", e.target.value, proj.id)}
                          style={{ fontWeight: 'semibold' }}
                        />
                        <textarea
                          value={localData.projects.find(p => p.id === proj.id)?.description || ""}
                          onChange={(e) => handleFieldChange("projects", "description", e.target.value, proj.id)}
                          style={{ color: '#6b7280', width: '100%' }}
                        />
                      </>
                    ) : (
                      <>
                        <p style={{ fontWeight: 'semibold' }}>{proj.title}</p>
                        {loadingSection === "projects" ? (
                          <p>Enhancing...</p>
                        ) : (
                          <p style={{ color: '#6b7280' }}>{proj.description}</p>
                        )}
                      </>
                    )}
                  </div>
                  {editMode && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', '@media(min-width: 1024px)': { marginTop: '0' } }} className="no-print">
                      <button
                        onClick={() => removeProject(proj.id)}
                        style={{ backgroundColor: '#ef4444', color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem' }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {editMode && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }} className="no-print">
                <button
                  onClick={() => setShowProjectForm(true)}
                  style={{ backgroundColor: '#059669', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem', marginTop: '1rem' }}
                >
                  Add Project
                </button>
              </div>
            )}
          </section>

          {showProjectForm && (
            <div style={{ position: 'fixed', inset: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '50' }} className="no-print">
              <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.375rem', width: '91.666667%', maxWidth: '28rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  {"Add New Project"}
                </h2>
                <form onSubmit={addOrUpdateProject} style={{ display: 'grid', gap: '1rem' }}>
                  <input
                    type="text"
                    name="title"
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject({ ...newProject, title: e.target.value })
                    }
                    placeholder="Project Title"
                    style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', width: '100%', marginBottom: '0.5rem' }}
                  />
                  <textarea
                    name="description"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({ ...newProject, description: e.target.value })
                    }
                    placeholder="Project Description"
                    style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', width: '100%', marginBottom: '0.5rem' }}
                  ></textarea>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowProjectForm(false)}
                      style={{ backgroundColor: '#9ca3af', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ backgroundColor: '#059669', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '4px solid #000000', paddingBottom: '0.5rem' }}>
              CERTIFICATIONS
            </h2>
            {dataToDisplay.certifications.map((cert, index) => (
              <div key={cert.id || `cert-${index}`} style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', '@media(min-width: 1024px)': { flexDirection: 'row' }, justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ outline: 'none', width: '100%' }}>
                    {editMode ? (
                      <>
                        <input
                          type="text"
                          value={localData.certifications.find(c => c.id === cert.id)?.name || ""}
                          onChange={(e) => handleFieldChange("certifications", "name", e.target.value, cert.id)}
                          style={{ fontWeight: 'semibold' }}
                        />
                        <input
                          type="text"
                          value={`${localData.certifications.find(c => c.id === cert.id)?.organization || ""} | ${localData.certifications.find(c => c.id === cert.id)?.issuedDate || ""}`}
                          onChange={(e) => {
                            const [organization, issuedDate] = e.target.value.split(" | ");
                            handleFieldChange("certifications", "organization", organization.trim(), cert.id);
                            handleFieldChange("certifications", "issuedDate", issuedDate.trim(), cert.id);
                          }}
                          style={{ color: '#6b7280' }}
                        />
                      </>
                    ) : (
                      <>
                        <p style={{ fontWeight: 'semibold' }}>{cert.name}</p>
                        <p style={{ color: '#6b7280' }}>
                          {cert.organization} | {cert.issuedDate}
                        </p>
                      </>
                    )}
                  </div>
                  {editMode && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', '@media(min-width: 1024px)': { marginTop: '0' } }} className="no-print">
                      <button
                        onClick={() => removeCertification(cert.id)}
                        style={{ backgroundColor: '#ef4444', color: '#ffffff', padding: '0.25rem 0.75rem', borderRadius: '0.25rem' }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {editMode && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }} className="no-print">
                <button
                  onClick={() => setShowCertificationForm(true)}
                  style={{ backgroundColor: '#059669', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem', hover: { backgroundColor: '#047857' }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  Add New Certification
                </button>
              </div>
            )}
          </section>

          {showCertificationForm && (
            <div style={{ position: 'fixed', inset: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '50' }} className="no-print">
              <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.375rem', width: '91.666667%', maxWidth: '28rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  {"Add New Certification"}
                </h2>
                <form onSubmit={addOrUpdateCertification} style={{ display: 'grid', gap: '1rem' }}>
                  <input
                    type="text"
                    name="title"
                    value={newCertification.title}
                    onChange={(e) =>
                      setNewCertification({ ...newCertification, title: e.target.value })
                    }
                    placeholder="Certification Title"
                    style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', width: '100%', marginBottom: '0.5rem' }}
                  />
                  <input
                    type="text"
                    name="issuer"
                    value={newCertification.issuer}
                    onChange={(e) =>
                      setNewCertification({ ...newCertification, issuer: e.target.value })
                    }
                    placeholder="Issuing Organization"
                    style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', width: '100%', marginBottom: '0.5rem' }}
                  />
                  <input
                    type="text"
                    name="year"
                    value={newCertification.year}
                    onChange={(e) =>
                      setNewCertification({ ...newCertification, year: e.target.value })
                    }
                    placeholder="Year of Certification"
                    style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', width: '100%', marginBottom: '0.5rem' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowCertificationForm(false)}
                      style={{ backgroundColor: '#9ca3af', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ backgroundColor: '#059669', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', borderBottom: '4px solid #000000', paddingBottom: '0.5rem' }}>
              SKILLS
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
              {dataToDisplay.skills.map((skill) => (
                <div
                  key={skill}
                  style={{ display: 'flex', alignItems: 'center', backgroundColor: '#e0f2fe', color: '#000000', padding: '0.25rem 0.75rem', borderRadius: '0.5rem' }}
                >
                  {editMode ? (
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => {
                        const updatedSkills = localData.skills.map(s => s === skill ? e.target.value : s);
                        setLocalData({ ...localData, skills: updatedSkills });
                      }}
                      style={{ backgroundColor: 'transparent', borderBottom: '1px solid #9ca3af', outline: 'none' }}
                    />
                  ) : (
                    <span>
                      {skill}
                    </span>
                  )}
                  {editMode && (
                    <button
                      onClick={() => removeSkill(skill)}
                      style={{ marginLeft: '0.5rem', color: '#000000', width: '1.25rem', height: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}
                      className="no-print"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            {editMode && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }} className="no-print">
                <button
                  onClick={() => setShowSkillForm(true)}
                  style={{ backgroundColor: '#059669', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem', hover: { backgroundColor: '#047857' }, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  Add Skill
                </button>
              </div>
            )}
          </section>

          {showSkillForm && (
            <div style={{ position: 'fixed', inset: '0', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '50' }} className="no-print">
              <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '0.375rem', width: '91.666667%', maxWidth: '28rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Add New Skill</h2>
                <form onSubmit={addSkill} style={{ display: 'grid', gap: '1rem' }}>
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Skill Name"
                    style={{ border: '1px solid #d1d5db', padding: '0.5rem 0.75rem', borderRadius: '0.25rem', width: '100%', marginBottom: '0.5rem' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowSkillForm(false)}
                      style={{ backgroundColor: '#9ca3af', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{ backgroundColor: '#059669', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.25rem' }}
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          <div style={{ marginTop: '2rem', textAlign: 'center' }} className="no-print">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  style={{ backgroundColor: '#16a34a', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.375rem', margin: '0 0.5rem' }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  style={{ backgroundColor: '#6b7280', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.375rem', margin: '0 0.5rem' }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '0.5rem 1rem', borderRadius: '0.375rem', hover: { backgroundColor: '#1d4ed8' } }}
              >
                Edit
              </button>
            )}
          </div>

        </div>
      </div>

      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .main-content {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 0.5rem !important;
            width: 100% !important;
            max-width: none !important;
          }
          #resume-container > div:first-child { /* Navbar */
            display: none !important;
          }
          #resume-container > div > div.no-print { /* Sidebar */
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}