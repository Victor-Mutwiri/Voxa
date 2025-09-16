import { useState } from "react";
import '../../styles/Message.css'
import { Loader2, Save, Wand2 } from "lucide-react"; // lucide icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";

const Message = () => {
  const [prompt, setPrompt] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Call your n8n AI agent webhook
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://your-n8n-webhook-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("Failed to generate email body");

      const data = await res.json();
      setEmailBody(data.emailBody || data.message || "No response found");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Placeholder for Supabase save logic
  const handleSave = () => {
    console.log("Save clicked", emailBody);
    // Add Supabase save logic here
  };

  return (
    <div className="message-container">
      <h2 className="message-title">
        <FontAwesomeIcon icon={faEnvelopeOpenText} /> Email Message
      </h2>

      {/* Prompt input */}
      <textarea
        className="message-textarea"
        rows={4}
        placeholder="Write your prompt for the AI..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="button button-generate"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} /> Generating...
          </>
        ) : (
          <>
            <Wand2 size={18} /> Generate Email
          </>
        )}
      </button>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={!emailBody}
        className="button button-save"
      >
        <Save size={18} /> Save
      </button>

      {/* Error message */}
      {error && <p className="message-error">{error}</p>}

      {/* Display generated email body */}
      {emailBody && (
        <div className="message-output">
          <h3>Generated Email Body:</h3>
          <p>{emailBody}</p>
        </div>
      )}
    </div>
  );
};

export default Message;
