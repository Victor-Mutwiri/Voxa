// components/templates/EmailSubjects.jsx
import { useEffect, useState } from "react";
import useStore from "../../useStore";
import '../../styles/EmailTemplate.css';
import { Trash2, CheckCircle } from "lucide-react";

const EmailSubjects = () => {
  const { 
    emailSubjects,
    fetchEmailSubjects,
    activeEmailSubject,
    setActiveEmailSubject,
    deleteTemplate,
    userId } =
    useStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (userId) fetchEmailSubjects();
  }, [userId]);

  const confirmDelete = () => {
    deleteTemplate(selectedId, "EmailSubject");
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  return (
    <div className="template-container">
      <h2>Email Subjects</h2>
      {emailSubjects.length === 0 ? (
        <p>No email subjects found.</p>
      ) : (
        <ul className="template-list">
          {emailSubjects.map((subject) => (
            <li
              key={subject.id}
              className={`template-item ${
                activeEmailSubject === subject.template ? "active-template" : ""
              }`}
            >
              <p>
                {subject.template}
                {activeEmailSubject === subject.template && (
                  <span className="active-badge">Active</span>
                )}
              </p>
              <div className="template-actions">
                <button
                  onClick={() => setActiveEmailSubject(subject.template)}
                  disabled={activeEmailSubject === subject.template}
                >
                  <CheckCircle size={16} />
                  {activeEmailSubject === subject.template ? "Active" : "Set Active"}
                </button>
                <button
                  onClick={() => {
                    setSelectedId(subject.id);
                    setShowDeleteModal(true);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 style={{ color: '#ef4444', marginBottom: '16px' }}>Confirm Delete</h3>
            <p style={{ marginBottom: '16px', color: '#fff' }}>Are you sure you want to delete this subject?</p>
            <div className="modal-actions">
              <button 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '60px',
                  padding: '8px 12px',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              onClick={confirmDelete} className="button-danger">
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="button-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '60px',
                  padding: '8px 12px',
                  backgroundColor: '#6b7280',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
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

export default EmailSubjects;
