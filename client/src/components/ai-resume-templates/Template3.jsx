import React, { useRef, useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useResume } from "../../context/ResumeContext";

const Template3 = () => {
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

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to right, #e1bee7, #fce4ec)" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar onEnhance={handleEnhance} resumeRef={resumeRef} />
        <div
          style={{
            flexGrow: 1,
            padding: "2.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <div
            ref={resumeRef}
            style={{
              backgroundColor: "#ffffff",
              color: "#2c3e50",
              width: "100%",
              maxWidth: "65rem",
              padding: "3rem",
              borderRadius: "16px",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
              backgroundImage: "linear-gradient(to bottom right, #f8bbd0, #e1bee7)",
            }}
          >
            {/* Header */}
            <div style={{ borderBottom: "3px dashed #8e24aa", paddingBottom: "1rem" }}>
              {editMode ? (
                <>
                  <input
                    type="text"
                    value={localData.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    style={{ fontSize: "2.5rem", fontWeight: "bold", border: "none", backgroundColor: "#fce4ec", padding: "0.75rem", borderRadius: "8px", width: "100%" }}
                  />
                  <input
                    type="text"
                    value={localData.role}
                    onChange={(e) => handleFieldChange("role", e.target.value)}
                    style={{ fontSize: "1.2rem", color: "#6a1b9a", border: "none", backgroundColor: "#fce4ec", padding: "0.75rem", borderRadius: "8px", width: "100%", marginTop: "0.5rem" }}
                  />
                </>
              ) : (
                <>
                  <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#4a148c" }}>{resumeData.name}</h1>
                  <p style={{ fontSize: "1.2rem", color: "#6a1b9a" }}>{resumeData.role}</p>
                </>
              )}
              <div style={{ fontSize: "1rem", marginTop: "1rem", lineHeight: 1.8 }}>
                {[
                  { field: "phone", icon: "📞" },
                  { field: "email", icon: "✉️" },
                  { field: "linkedin", icon: "🔗" },
                  { field: "location", icon: "📍" },
                ].map(({ field, icon }) => (
                  editMode ? (
                    <input
                      key={field}
                      type="text"
                      value={localData[field]}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      style={{ display: "block", marginBottom: "0.5rem", padding: "0.5rem", backgroundColor: "#fce4ec", border: "1px solid #ce93d8", borderRadius: "8px", width: "100%" }}
                    />
                  ) : (
                    <p key={field}>{icon} {resumeData[field]}</p>
                  )
                ))}
              </div>
            </div>

            {/* Summary */}
            <Section title="📝 Summary" color="#8e24aa">
              {editMode ? (
                <textarea
                  value={localData.summary}
                  onChange={(e) => handleFieldChange("summary", e.target.value)}
                  rows={4}
                  style={{ width: "100%", marginTop: "0.5rem", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ba68c8", backgroundColor: "#fce4ec" }}
                />
              ) : (
                <p>{resumeData.summary}</p>
              )}
            </Section>

            {/* Skills */}
            <Section title="🚀 Skills" color="#8e24aa">
              {editMode ? (
                <textarea
                  value={localData.skills?.join(", ") || ""}
                  onChange={(e) => handleFieldChange("skills", e.target.value.split(",").map(s => s.trim()))}
                  style={{ width: "100%", marginTop: "0.5rem", padding: "0.75rem", borderRadius: "8px", border: "1px solid #ba68c8", backgroundColor: "#fce4ec" }}
                />
              ) : (
                <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                  {resumeData.skills?.map((skill, idx) => <li key={idx}>{skill}</li>)}
                </ul>
              )}
            </Section>

            {/* Education */}
            <Section title="🎓 Education" color="#8e24aa">
              {resumeData.education.map((edu, idx) => (
                <div key={idx} style={{ marginTop: "1rem" }}>
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={localData.education[idx].degree}
                        onChange={(e) => {
                          const updated = [...localData.education];
                          updated[idx].degree = e.target.value;
                          handleFieldChange("education", updated);
                        }}
                        style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem", border: "1px solid #ce93d8", borderRadius: "8px", backgroundColor: "#fce4ec" }}
                      />
                      <input
                        type="text"
                        value={localData.education[idx].institution}
                        onChange={(e) => {
                          const updated = [...localData.education];
                          updated[idx].institution = e.target.value;
                          handleFieldChange("education", updated);
                        }}
                        style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem", border: "1px solid #ce93d8", borderRadius: "8px", backgroundColor: "#fce4ec" }}
                      />
                      <input
                        type="text"
                        value={localData.education[idx].duration}
                        onChange={(e) => {
                          const updated = [...localData.education];
                          updated[idx].duration = e.target.value;
                          handleFieldChange("education", updated);
                        }}
                        style={{ width: "100%", padding: "0.5rem", border: "1px solid #ce93d8", borderRadius: "8px", backgroundColor: "#fce4ec" }}
                      />
                    </>
                  ) : (
                    <>
                      <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{edu.degree}</p>
                      <p>{edu.institution} ({edu.duration})</p>
                    </>
                  )}
                </div>
              ))}
            </Section>
          </div>

          {/* Buttons */}
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  style={{ backgroundColor: "#43a047", color: "white", padding: "0.75rem 1.5rem", borderRadius: "8px", marginRight: "1rem", border: "none", fontWeight: "bold" }}
                >
                  ✅ Save
                </button>
                <button
                  onClick={handleCancel}
                  style={{ backgroundColor: "#757575", color: "white", padding: "0.75rem 1.5rem", borderRadius: "8px", border: "none", fontWeight: "bold" }}
                >
                  ❌ Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                style={{ backgroundColor: "#1e88e5", color: "white", padding: "0.75rem 1.5rem", borderRadius: "8px", border: "none", fontWeight: "bold" }}
              >
                ✏️ Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children, color }) => (
  <div style={{ marginTop: "2rem" }}>
    <h2 style={{ fontSize: "1.6rem", fontWeight: "bold", color, borderBottom: `2px solid ${color}`, paddingBottom: "0.5rem" }}>{title}</h2>
    <div style={{ marginTop: "0.5rem", color: "#333" }}>{children}</div>
  </div>
);

export default Template3;
