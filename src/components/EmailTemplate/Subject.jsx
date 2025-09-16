import { useState } from "react";
import "../../styles/Message.css";
import { Loader2, Save, Wand2 } from "lucide-react"; // lucide icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeading } from "@fortawesome/free-solid-svg-icons";

const Subject = () => {
  const [prompt, setPrompt] = useState("");
  const [subject, setSubject] = useState("");
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

      if (!res.ok) throw new Error("Failed to generate subject line");

      const data = await res.json();
      setSubject(data.subject || data.message || "No subject generated");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Placeholder for Supabase save logic
  const handleSave = () => {
    console.log("Save clicked", subject);
    // Add Supabase save logic here
  };

  return (
    <div className="message-container">
      <h2 className="message-title">
        <FontAwesomeIcon icon={faHeading} /> Email Subject Line
      </h2>

      {/* Prompt input */}
      <textarea
        className="message-textarea"
        rows={3}
        placeholder="Write your prompt for the subject line..."
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
            <Wand2 size={18} /> Generate Subject
          </>
        )}
      </button>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={!subject}
        className="button button-save"
      >
        <Save size={18} /> Save
      </button>

      {/* Error message */}
      {error && <p className="message-error">{error}</p>}

      {/* Display generated subject line */}
      {subject && (
        <div className="message-output">
          <h3>Generated Subject Line:</h3>
          <p>{subject}</p>
        </div>
      )}
    </div>
  );
};

export default Subject;
