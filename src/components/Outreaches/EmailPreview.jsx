// components/EmailPreview.jsx
import { Send } from "lucide-react";
import "../../styles/Outreach.css";
import useStore from "../../useStore";

const EmailPreview = ({ lead }) => {
  const { activeEmailSubject, activeEmailBody } = useStore();

  if (!lead) {
    return (
      <div className="email-preview empty">
        <p>Select a lead to preview the email</p>
      </div>
    );
  }

  const subjectLine = activeEmailSubject?.trim();
  const bodyContent = activeEmailBody?.trim();
  /* const subjectLine = activeEmailSubject?.content?.trim();
  const bodyContent = activeEmailBody?.content?.trim(); */

  return (
    <div className="email-preview">
      <div className="email-header">
        <p><strong>To:</strong> {lead.email}</p>
        <p>
          <strong>Subject:</strong>{" "}
          {subjectLine ? subjectLine : "No subject selected"}
        </p>
      </div>

      <div className="email-body">
        <h5> Hi {lead.name},</h5>
        {bodyContent ? (
          <p>{bodyContent}</p>
        ) : (
          <p className="placeholder">No email body selected</p>
        )}
      </div>

      <div className="email-footer">
        <button className="send-btn">
          <Send size={16} />
          Send
        </button>
      </div>
    </div>
  );
};

export default EmailPreview;
