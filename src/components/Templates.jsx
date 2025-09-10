import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faEye,
  faCheckCircle,
  faLink,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Templates.css";

const Templates = () => {
  // Templates state
  const [templates, setTemplates] = useState([]);
  const [activeTemplateId, setActiveTemplateId] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);

  // Subject lines state
  const [subjectLines, setSubjectLines] = useState([]);
  const [activeSubjectId, setActiveSubjectId] = useState(null);
  const [editingSubject, setEditingSubject] = useState(null);

  // Modal confirm
  const [showConfirmSave, setShowConfirmSave] = useState(false);

  // ===== TEMPLATE HANDLERS =====
  const handleCreateTemplate = () => {
    setEditingTemplate({
      id: Date.now(),
      title: "",
      type: "Cold Reach",
      body: "<p>Hello,</p><p>I’d like to connect with you…</p>",
      link: "",
    });
  };

  const handleEditTemplate = (tpl) => {
    setEditingTemplate({ ...tpl });
  };

  const handleSaveTemplate = () => setShowConfirmSave("template");

  const confirmSaveTemplate = () => {
    if (editingTemplate.id && templates.some((t) => t.id === editingTemplate.id)) {
      setTemplates(
        templates.map((t) =>
          t.id === editingTemplate.id ? editingTemplate : t
        )
      );
    } else {
      setTemplates([...templates, editingTemplate]);
    }
    setEditingTemplate(null);
    setShowConfirmSave(false);
  };

  const setActiveTemplate = (id) => setActiveTemplateId(id);

  // ===== SUBJECT HANDLERS =====
  const handleCreateSubject = () => {
    setEditingSubject({
      id: Date.now(),
      text: "New subject line...",
    });
  };

  const handleEditSubject = (subj) => {
    setEditingSubject({ ...subj });
  };

  const handleSaveSubject = () => setShowConfirmSave("subject");

  const confirmSaveSubject = () => {
    if (editingSubject.id && subjectLines.some((s) => s.id === editingSubject.id)) {
      setSubjectLines(
        subjectLines.map((s) =>
          s.id === editingSubject.id ? editingSubject : s
        )
      );
    } else {
      setSubjectLines([...subjectLines, editingSubject]);
    }
    setEditingSubject(null);
    setShowConfirmSave(false);
  };

  const setActiveSubject = (id) => setActiveSubjectId(id);

  return (
    <div className="templates-root">
      <h1>Templates</h1>

      {/* ========== TEMPLATE SECTION ========== */}
      <div className="section">
        <div className="section-header">
          <h2>Email Templates</h2>
          <button onClick={handleCreateTemplate} className="btn-primary">
            <FontAwesomeIcon icon={faPlus} /> New Template
          </button>
        </div>

        {/* Template List */}
        <div className="templates-list">
          {templates.length === 0 ? (
            <p className="empty">No templates yet. Create one to get started.</p>
          ) : (
            templates.map((tpl) => (
              <div
                key={tpl.id}
                className={`template-card ${
                  activeTemplateId === tpl.id ? "active" : ""
                }`}
              >
                <h3>{tpl.title || "(Untitled Template)"}</h3>
                <p className="type">{tpl.type}</p>
                <div className="actions">
                  <button onClick={() => handleEditTemplate(tpl)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button onClick={() => setActiveTemplate(tpl.id)}>
                    <FontAwesomeIcon icon={faCheckCircle} /> Set Active
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Editor for Template */}
      {editingTemplate && (
        <div className="editor-section">
          <h2>{editingTemplate.id ? "Edit Template" : "New Template"}</h2>
          <label>
            Title
            <input
              type="text"
              value={editingTemplate.title}
              onChange={(e) =>
                setEditingTemplate({ ...editingTemplate, title: e.target.value })
              }
            />
          </label>

          <label>
            Type
            <select
              value={editingTemplate.type}
              onChange={(e) =>
                setEditingTemplate({ ...editingTemplate, type: e.target.value })
              }
            >
              <option>Cold Reach</option>
              <option>Follow-up</option>
              <option>Response</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Link (optional)
            <div className="link-input">
              <FontAwesomeIcon icon={faLink} />
              <input
                type="text"
                value={editingTemplate.link}
                onChange={(e) =>
                  setEditingTemplate({ ...editingTemplate, link: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>
          </label>

          <label>
            HTML Body
            <textarea
              rows="10"
              value={editingTemplate.body}
              onChange={(e) =>
                setEditingTemplate({ ...editingTemplate, body: e.target.value })
              }
            />
          </label>

          <div className="editor-actions">
            <button className="btn-save" onClick={handleSaveTemplate}>
              <FontAwesomeIcon icon={faSave} /> Save
            </button>
          </div>

          {/* Preview */}
          <div className="preview">
            <h3>
              <FontAwesomeIcon icon={faEye} /> Preview
            </h3>
            <div
              className="preview-box"
              dangerouslySetInnerHTML={{ __html: editingTemplate.body }}
            />
          </div>
        </div>
      )}

      {/* ========== SUBJECT SECTION ========== */}
      <div className="section">
        <div className="section-header">
          <h2>Email Subject Lines</h2>
          <button onClick={handleCreateSubject} className="btn-primary">
            <FontAwesomeIcon icon={faPlus} /> New Subject
          </button>
        </div>

        {/* Subject List */}
        <div className="templates-list">
          {subjectLines.length === 0 ? (
            <p className="empty">No subject lines yet. Create one to get started.</p>
          ) : (
            subjectLines.map((subj) => (
              <div
                key={subj.id}
                className={`template-card ${
                  activeSubjectId === subj.id ? "active" : ""
                }`}
              >
                <h3>{subj.text}</h3>
                <div className="actions">
                  <button onClick={() => handleEditSubject(subj)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button onClick={() => setActiveSubject(subj.id)}>
                    <FontAwesomeIcon icon={faCheckCircle} /> Set Active
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Editor for Subject */}
      {editingSubject && (
        <div className="editor-section">
          <h2>{editingSubject.id ? "Edit Subject" : "New Subject"}</h2>
          <label>
            Subject Line
            <input
              type="text"
              value={editingSubject.text}
              onChange={(e) =>
                setEditingSubject({ ...editingSubject, text: e.target.value })
              }
            />
          </label>

          <div className="editor-actions">
            <button className="btn-save" onClick={handleSaveSubject}>
              <FontAwesomeIcon icon={faSave} /> Save
            </button>
          </div>
        </div>
      )}

      {/* Confirm Save Modal */}
      {showConfirmSave && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Save</h3>
            <p>
              Are you sure you want to save this{" "}
              {showConfirmSave === "template" ? "template" : "subject"}?
            </p>
            <div className="modal-actions">
              {showConfirmSave === "template" ? (
                <button onClick={confirmSaveTemplate} className="btn-primary">
                  Yes, Save
                </button>
              ) : (
                <button onClick={confirmSaveSubject} className="btn-primary">
                  Yes, Save
                </button>
              )}
              <button
                onClick={() => setShowConfirmSave(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Templates;
