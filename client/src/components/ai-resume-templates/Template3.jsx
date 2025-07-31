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
    <div style={{ minHeight: "100vh", background: "linear-gradient(to right, #E0F7FA, #FFFFFF)" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar onEnhance={handleEnhance} resumeRef={resumeRef} />
        <div style={{ flexGrow: 1, padding: "3rem", display: "flex", justifyContent: "center" }}>
          <div
            ref={resumeRef}
            style={{
              background: "#fff",
              width: "100%",
              maxWidth: "850px",
              padding: "3rem",
              borderRadius: "20px",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              color: "#263238",
            }}
          >
            {/* Header */}
            <div style={{ borderBottom: "2px solid #26a69a", paddingBottom: "1rem", marginBottom: "1rem" }}>
              {editMode ? (
                <>
                  <input
                    type="text"
                    value={localData.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    style={{ fontSize: "2.5rem", fontWeight: "600", border: "none", backgroundColor: "#E0F2F1", padding: "0.75rem", borderRadius: "10px", width: "100%" }}
                  />
                  <input
                    type="text"
                    value={localData.role}
                    onChange={(e) => handleFieldChange("role", e.target.value)}
                    style={{ fontSize: "1.4rem", color: "#00695c", border: "none", backgroundColor: "#E0F2F1", padding: "0.5rem", borderRadius: "10px", width: "100%", marginTop: "0.5rem" }}
                  />
                </>
              ) : (
                <>
                  <h1 style={{ fontSize: "2.5rem", fontWeight: "600", color: "#004d40", marginBottom: "0.3rem" }}>{resumeData.name}</h1>
                  <h3 style={{ fontSize: "1.3rem", color: "#00695c" }}>{resumeData.role}</h3>
                </>
              )}
              <div style={{ marginTop: "0.8rem", fontSize: "1rem" }}>
                {[
                  { field: "phone", icon: "📞" },
                  { field: "email", icon: "📧" },
                  { field: "linkedin", icon: "🔗" },
                  { field: "location", icon: "📍" },
                ].map(({ field, icon }) => (
                  editMode ? (
                    <input
                      key={field}
                      type="text"
                      value={localData[field]}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      style={{ display: "block", marginBottom: "0.6rem", padding: "0.6rem", backgroundColor: "#E0F2F1", border: "1px solid #80cbc4", borderRadius: "8px", width: "100%" }}
                    />
                  ) : (
                    <p key={field} style={{ margin: "4px 0" }}>{icon} {resumeData[field]}</p>
                  )
                ))}
              </div>
            </div>

            {/* Section Block */}
            <ResumeSection
              title="📝 Summary"
              value={localData.summary}
              onChange={(val) => handleFieldChange("summary", val)}
              editMode={editMode}
            />

            <ResumeSection
              title="💡 Skills"
              value={(localData.skills || []).join(", ")}
              onChange={(val) => handleFieldChange("skills", val.split(",").map((s) => s.trim()))}
              editMode={editMode}
              listItems={resumeData.skills}
            />

            <div style={{ marginTop: "2rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#00897b", borderBottom: "2px solid #4db6ac", paddingBottom: "0.3rem" }}>🎓 Education</h2>
              {resumeData.education.map((edu, idx) => (
                <div key={idx} style={{ marginTop: "1rem", backgroundColor: "#E0F2F1", padding: "1rem", borderRadius: "10px" }}>
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
                        placeholder="Degree"
                        style={{ width: "100%", marginBottom: "0.5rem", padding: "0.6rem", borderRadius: "6px", border: "1px solid #4db6ac" }}
                      />
                      <input
                        type="text"
                        value={localData.education[idx].institution}
                        onChange={(e) => {
                          const updated = [...localData.education];
                          updated[idx].institution = e.target.value;
                          handleFieldChange("education", updated);
                        }}
                        placeholder="Institution"
                        style={{ width: "100%", marginBottom: "0.5rem", padding: "0.6rem", borderRadius: "6px", border: "1px solid #4db6ac" }}
                      />
                      <input
                        type="text"
                        value={localData.education[idx].duration}
                        onChange={(e) => {
                          const updated = [...localData.education];
                          updated[idx].duration = e.target.value;
                          handleFieldChange("education", updated);
                        }}
                        placeholder="Duration"
                        style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #4db6ac" }}
                      />
                    </>
                  ) : (
                    <>
                      <p style={{ fontWeight: "600" }}>{edu.degree}</p>
                      <p style={{ marginBottom: "0.3rem" }}>{edu.institution}</p>
                      <p style={{ fontSize: "0.9rem", color: "#616161" }}>{edu.duration}</p>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              {editMode ? (
                <>
                  <button onClick={handleSave} style={buttonStyle("#00796b")}>✅ Save</button>
                  <button onClick={handleCancel} style={buttonStyle("#d32f2f")}>❌ Cancel</button>
                </>
              ) : (
                <button onClick={() => setEditMode(true)} style={buttonStyle("#0288d1")}>✏️ Edit</button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const ResumeSection = ({ title, value, onChange, editMode, listItems }) => (
  <div style={{ marginTop: "2rem" }}>
    <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#00897b", borderBottom: "2px solid #4db6ac", paddingBottom: "0.3rem" }}>{title}</h2>
    {editMode ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        style={{ width: "100%", marginTop: "0.5rem", padding: "0.75rem", borderRadius: "8px", border: "1px solid #4db6ac", backgroundColor: "#f1f8e9" }}
      />
    ) : listItems ? (
      <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
        {listItems.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    ) : (
      <p style={{ marginTop: "0.5rem" }}>{value}</p>
    )}
  </div>
);

const buttonStyle = (bg) => ({
  backgroundColor: bg,
  color: "#fff",
  padding: "0.6rem 1.2rem",
  borderRadius: "8px",
  border: "none",
  margin: "0.5rem",
  fontWeight: "bold",
  cursor: "pointer"
});

export default Template3;
