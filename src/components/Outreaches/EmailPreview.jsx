// components/EmailPreview.jsx
import { useState } from "react";
import { Send } from "lucide-react";
import "../../styles/Outreach.css";
import useStore from "../../useStore";

const EmailPreview = ({ lead }) => {
  const { activeEmailSubject, activeEmailBody, userId} = useStore();
  const [status, setStatus] = useState(null);

  if (!lead) {
    return (
      <div className="email-preview empty">
        <p>Select a lead to preview the email</p>
      </div>
    );
  }

  const subjectLine = activeEmailSubject?.trim();
  const bodyContent = activeEmailBody?.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("📤 Sending...");

    // Build the payload that n8n will receive
    const formData = {
        user_id: userId,
        to: lead.email,
        name: lead.name,
        subject: subjectLine || "No subject",
        body: bodyContent || "No body content",
    };

    try {
      const res = await fetch("http://localhost:5678/webhook-test/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let message = "✅ Sent to webhook!";
      try {
        /* const data = await res.json(); */
        message = `✅ Sent!`;
      } catch {
        message = "✅ Sent! (No JSON response)";
      }

      setStatus(message);
    } catch (err) {
      console.error(err);
      setStatus("❌ Error: " + err.message);
    }
  };

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
        <button className="send-btn" onClick={handleSubmit}>
          <Send size={16} />
          Send
        </button>
        {status && <p className="status-msg">{status}</p>}
      </div>
    </div>
  );
};

export default EmailPreview;
