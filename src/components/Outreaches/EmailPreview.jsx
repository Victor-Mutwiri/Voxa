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
        .select("*")
        .eq("lead_id", lead.id)
        .eq("campaign_id", activeCampaignId)
        .eq("user_id", userId)
        .single();

      if (logsError && logsError.code !== 'PGRST116') { // PGRST116 is "not found" error
        throw logsError;
      }

      const currentStep = logs?.step_number || 0;
      const nextStep = currentStep + 1;

      // 2️⃣ Rule checks with labels
      if (nextStep > 4) {
        setStatus("⚠️ All steps have been completed for this lead.");
        return;
      }

      /* if (logs.some(log => log.step_number === nextStep)) {
        setStatus(`⚠️ ${stepLabels[nextStep]} has already been sent to this lead.`);
        return;
      } */

      setStatus("📤 Sending...");

      // 3️⃣ Send email via webhook
      const formData = {
        user_id: userId,
        to: lead.email,
        icebreaker: lead.icebreaker || "",
        name: lead.first_name,
        subject: subjectLine || "No subject",
        body: bodyContent || "No body content",
        step: nextStep,
      };

      const apiUrl = import.meta.env.MODE === 'development' 
            ? import.meta.env.VITE_DEV_SENDEMAIL_URL 
            : import.meta.env.VITE_PROD_SENDEMAIL_URL;
      
      
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send email");

      // 4️⃣ Log to outreach_logs ONLY if success
      if (logs){
        const { error: updateError } = await supabase
          .from("outreach_logs")
          .update(
            {
              step_number: nextStep,
              sent_at: new Date().toISOString(),
            })
          .eq("id", logs.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("outreach_logs")
          .insert([{
            user_id: userId,
            lead_id: lead.id,
            campaign_id: activeCampaignId,
            step_number: nextStep,
            sent_at: new Date().toISOString(),
          }]);
        if (insertError) throw insertError;
      }

      setStatus(`✅ ${stepLabels[nextStep]} Sent!`);
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
        <h5> Hi {lead.first_name},</h5>
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
          className={`email-send-btn ${!activeCampaignId ? "disabled" : ""}`}
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
