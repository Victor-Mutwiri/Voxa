// components/templates/EmailPreview.jsx
import useStore from "../../useStore";
import "../../styles/EmailTemplate.css"; // reuse styles

const TemplatesPreview = () => {
  const { activeEmailSubject, activeEmailBody } = useStore();

  return (
    <div className="email-preview">
      {/* Subject Section */}
      <div className="email-header">
        <p>
          <strong>Subject:</strong>{" "}
          {activeEmailSubject ? (
            activeEmailSubject
          ) : (
            <span className="placeholder">⚠️ No active subject selected</span>
          )}
        </p>
      </div>

      {/* Body Section */}
      <div className="email-body">
        {activeEmailBody ? (
          <p>{activeEmailBody}</p>
        ) : (
          <p className="placeholder">⚠️ No active email body selected</p>
        )}
      </div>
    </div>
  );
};

export default TemplatesPreview;