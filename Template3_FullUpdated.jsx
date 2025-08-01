import React, { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import { useResume } from "../../context/ResumeContext";

// Sidebar component
const Sidebar = ({ onSave, onEnhance, onDownload }) => {
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

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="flex">
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-md lg:hidden"
        onClick={toggleSidebar}
      >
        ≡
      </button>

      {showSidebar && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 transition-transform duration-300 ease-in-out z-50 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <button
          className="absolute top-3 right-3 text-white lg:hidden"
          onClick={toggleSidebar}
        >
          ✕
        </button>

        <div className="flex flex-col h-full space-y-3">
          <h2 className="text-lg font-bold hidden lg:block">Resume Tools</h2>
          <NavItem label="Save Resume" onClick={onSave} />
          <NavItem label="Enhance Profile" onClick={() => onEnhance("profile")} />
          <NavItem label="Enhance Experience" onClick={() => onEnhance("experience")} />
          <NavItem label="Enhance Projects" onClick={() => onEnhance("projects")} />
          <NavItem label="Download PDF" onClick={onDownload} />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ label, onClick }) => (
  <div
    className="flex items-center p-3 rounded-lg cursor-pointer transition duration-200 hover:bg-gray-700"
    onClick={onClick}
  >
    <span className="ml-2 whitespace-normal">{label}</span>
  </div>
);

const downloadResumePDF = async (resumeRef) => {
  const element = resumeRef.current;

  const opt = {
    margin: 0.3,
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  await html2pdf().set(opt).from(element).save();
};

export default function ResumeTemplate3() {
  const resumeRef = useRef(null);
  const { resumeData, setResumeData } = useResume();
  const [editMode, setEditMode] = useState(false);
  const [localData, setLocalData] = useState(resumeData);

  useEffect(() => {
    setLocalData(resumeData);
  }, [resumeData]);

  const handleFieldChange = (field, value) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setResumeData(localData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setLocalData(resumeData);
    setEditMode(false);
  };

  const handleEnhance = (section) => {
    console.log("Enhance requested for:", section);
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) {
      alert("Resume content is not ready.");
      return;
    }

    await downloadResumePDF(resumeRef);
  };

  return (
    <div className="min-h-screen flex bg-white no-print">
      <Sidebar
        onSave={handleSave}
        onEnhance={handleEnhance}
        onDownload={handleDownloadPDF}
      />

      <div
        ref={resumeRef}
        className="main-content flex-1 transition-all duration-300 ease-in-out p-4 lg:p-8 bg-white shadow-lg border border-gray-200 max-w-4xl mx-auto lg:ml-64"
      >
        <header className="text-center mb-8">
          {editMode ? (
            <>
              <input
                type="text"
                value={localData.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                className="text-4xl font-bold w-full outline-none text-left lg:text-center mb-2"
              />
              <input
                type="text"
                value={localData.role}
                onChange={(e) => handleFieldChange("role", e.target.value)}
                className="text-xl text-gray-600 w-full outline-none text-left lg:text-center"
              />
            </>
          ) : (
            <>
              <div className="text-4xl font-bold">{resumeData.name}</div>
              <div className="text-xl text-gray-600">{resumeData.role}</div>
            </>
          )}
        </header>

        {/* Add your full resume content here (experience, skills, etc.) */}

        <div className="text-center mt-8">
          {editMode ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .main-content {
          width: 100%;
          transition: margin-left 0.3s ease-in-out;
          padding: 1rem;
          font-size: 12pt;
        }
        h1, h2, h3 {
          font-size: 14pt;
          font-weight: bold;
        }
        @media (max-width: 1023px) {
          .main-content {
            margin-left: 0 !important;
            padding: 1rem;
          }
          .max-w-4xl {
            max-width: 100%;
          }
          .text-center {
            text-align: left !important;
          }
          .flex {
            flex-direction: column !important;
          }
        }
        @media (min-width: 1024px) {
          .main-content {
            margin-left: 16rem !important;
            padding: 2rem;
          }
        }
        @media print {
          .no-print {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
