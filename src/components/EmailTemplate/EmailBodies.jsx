// components/templates/EmailBodies.jsx
import { useEffect, useState } from "react";
import useStore from "../../useStore";
import { Trash2, CheckCircle } from "lucide-react";

const EmailBodies = () => {
  const {
    emailBodies,
    fetchEmailBodies,
    activeEmailBody,
    setActiveEmailBody,
    deleteTemplate,
    userId,
  } = useStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (userId) fetchEmailBodies();
  }, [userId]);

  const confirmDelete = () => {
    deleteTemplate(selectedId, "EmailBody");
    setShowDeleteModal(false);
    setSelectedId(null);
  };

  return (
    <div className="template-container">
      <h2>Email Templates</h2>
      {emailBodies.length === 0 ? (
        <p>No email templates found.</p>
      ) : (
        <ul className="template-list">
          {emailBodies.map((body) => (
            <li
              key={body.id}
              className={`template-item ${
                activeEmailBody === emailBodies.template ? "active-template" : ""
              }`}
            >
              <p>
                {body.template}
                {activeEmailBody === body.template && (
                  <span className="active-badge">Active</span>
                )}
              </p>
              <div className="template-actions">
                <button
                  onClick={() => setActiveEmailBody(body.template)}
                  disabled={activeEmailBody === body.template}
                >
                  <CheckCircle size={16} />
                  {activeEmailBody === body.template ? "Active" : "Set Active"}
                </button>
                <button
                  onClick={() => {
                    setSelectedId(body.id);
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
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this template?</p>
            <div className="modal-actions">
              <button onClick={confirmDelete} className="button-danger">
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="button-secondary"
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

export default EmailBodies;
