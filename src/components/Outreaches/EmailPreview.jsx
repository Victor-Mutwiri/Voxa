// components/EmailPreview.jsx
import { useState } from "react";
import { Send } from "lucide-react";
import "../../styles/Outreach.css";
import useStore from "../../useStore";
import { supabase } from "../../supabaseClient";


const stepLabels = {
  0: "Awaiting Cold Outreach",
  1: "Cold Email Sent",
  2: "Follow-up 1 Sent",
  3: "Follow-up 2 Sent",
  4: "Breakup Email Sent",
};

const EmailPreview = ({ lead }) => {
  const { activeEmailSubject, activeEmailBody, userId, activeCampaign} = useStore();
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
  const activeCampaignId = activeCampaign ? activeCampaign.id : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!activeCampaignId) {
      setStatus("❌ Please select a campaign before sending.");
      return;
    }

    setStatus("⏳ Checking outreach history...");

    try {
      // 1️⃣ Fetch existing logs for this lead + campaign
      const { data: logs, error: logsError } = await supabase
        .from("outreach_logs")
        .select("step_number")
        .eq("lead_id", lead.id)
        .eq("campaign_id", activeCampaignId)
        .eq("user_id", userId);

      if (logsError) throw logsError;

      const sentSteps = logs.map((l) => l.step_number);

      const nextStep = (lead.current_step ?? 0) + 1;

      // 2️⃣ Rule checks with labels
      if (sentSteps.includes(nextStep)) {
        setStatus(
          `⚠️ This step (${stepLabels[nextStep]}) has already been sent to this lead.`
        );
        return;
      }

      if (nextStep > 1 && !sentSteps.includes(nextStep - 1)) {
        setStatus(
          `⚠️ You must complete the previous step first: ${stepLabels[nextStep - 1]}.`
        );
        return;
      }

      setStatus("📤 Sending...");

      // 3️⃣ Send email via webhook
      const formData = {
        user_id: userId,
        to: lead.email,
        icebreaker: lead.icebreaker || "",
        name: lead.name,
        subject: subjectLine || "No subject",
        body: bodyContent || "No body content",
      };

      const res = await fetch("http://localhost:5678/webhook-test/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send email");

      // 4️⃣ Log to outreach_logs ONLY if success
      const { error: insertError } = await supabase
        .from("outreach_logs")
        .insert([
          {
            user_id: userId,
            lead_id: lead.id,
            campaign_id: activeCampaignId,
            step_number: nextStep,
          },
        ]);

      if (insertError) throw insertError;

      setStatus(`✅ ${stepLabels[nextStep]} logged and email sent!`);
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
          <>
            <p>{lead.icebreaker}</p>
            <p>{bodyContent}</p>
          </>
          
        ) : (
          <p className="placeholder">No email body selected</p>
        )}
      </div>

      <div className="email-footer">
        <button
          className={`send-btn ${!activeCampaignId ? "disabled" : ""}`}
          onClick={handleSubmit}
          disabled={!activeCampaignId}
        >
          <Send size={16} />
          Send
        </button>
        {status && <p className="status-msg">{status}</p>}
      </div>
    </div>
  );
};

export default EmailPreview;
