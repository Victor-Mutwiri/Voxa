import { useState } from "react";
import "../../styles/Message.css";
import useStore from "../../useStore";
import { supabase } from "../../supabaseClient";
import { Loader2, Save, Wand2, Edit3,Check, X, FileText } from "lucide-react"; // lucide icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";

const Message = () => {
  const [prompt, setPrompt] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // New: manual input mode
  const [mode, setMode] = useState("ai"); // "ai" | "manual"

  // Edit state
    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState("");

  // Call your n8n AI agent webhook
  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.MODE === 'development' 
            ? import.meta.env.VITE_DEV_TEMPLATE_URL 
            : import.meta.env.VITE_PROD_TEMPLATE_URL;
      
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"},
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to generate email body`);
      }

      // Get response text first for debugging
      const responseText = await res.text();
      console.log("Raw response:", responseText);

      // Try parsing JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error("Invalid JSON response from server");
      }

      // Handle different response formats
      let generatedEmailBody;
      if (Array.isArray(data) && data.length > 0) {
        generatedEmailBody = data[0].subject || data[0].output;
      } else if (data.subject) {
        generatedEmailBody = data.subject;
      } else if (data.output) {
        generatedEmailBody = data.output;
      } else {
        throw new Error("No subject found in response");
      }

      setEmailBody(generatedEmailBody || "No subject generated");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditedMessage(emailBody);
    setIsEditing(true);
  };

  const confirmEdit = () => {
    setEmailBody(editedMessage);
    setIsEditing(false);
  };

  // Open modal before saving
  const handleSave = () => {
    setShowModal(true);
  };

  // Confirm save (you’ll add Supabase logic here)
  const confirmSave = async () => {
    setShowModal(false);
    const userId = useStore.getState().userId; // grab from zustand

    if (!userId) {
        console.error("No userId found in store. Cannot save template.");
        setError("Unable to save: No user found.");
        return;
    }

    try {
        const { data, error } = await supabase
        .from("templates")
        .insert([
            {
            user_id: userId,
            type: "EmailBody",
            template: emailBody,
            },
        ])
        .select();

        if (error) throw error;

        console.log("Saved successfully:", data);
        alert("✅ Template saved successfully!");
    } catch (err) {
        console.error("Error saving template:", err.message);
        setError(err.message);
    }
    };


  return (
    <div className="message-container">
      <h2 className="message-title">
        <FontAwesomeIcon icon={faEnvelopeOpenText} /> Email Message
      </h2>

      {/* Mode Toggle */}
      <div className="mode-toggle">
        <button
          className={`toggle-btn ${mode === "ai" ? "active" : ""}`}
          onClick={() => setMode("ai")}
        >
          <Wand2 size={16} /> Use AI
        </button>
        <button
          className={`toggle-btn ${mode === "manual" ? "active" : ""}`}
          onClick={() => setMode("manual")}
        >
          <FileText size={16} /> My Own Template
        </button>
      </div>

      {mode === "ai" && (
        <>
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
            disabled={loading || !prompt.trim()}
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
        </>
      )}

      {mode === "manual" && (
        <>
          <textarea
            className="message-textarea"
            rows={4}
            placeholder="Paste or type your own email body here..."
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
          />
        </>
      )}

      {/* Error message */}
      {error && <p className="message-error">{error}</p>}

      {/* Display generated email body */}
      {emailBody && (
        <div className="message-output">
          <h3>Generated Email Body:</h3>
          {isEditing ? (
            <div className="edit-container">
              <textarea
                type="text"
                rows={4}
                className="edit-input"
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
              />
              <button onClick={confirmEdit} className="button button-confirm">
                <Check size={18} /> Confirm Edit
              </button>
            </div>
          ) : (
            <>
              <p>{emailBody}</p>
              <button onClick={handleEdit} className="button button-edit">
                <Edit3 size={18} /> Edit
              </button>
            </>
          )}
          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={!emailBody}
            className="button button-save"
          >
            <Save size={18} /> Save
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="save-modal-overlay">
          <div className="save-modal">
            <div className="save-modal-header">
              <h3>Confirm Save</h3>
              <button
                onClick={() => setShowModal(false)}
                className="save-modal-close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="save-modal-body">
              <h4>Here’s the email body you are about to save:</h4>
              <div className="modal-preview">
                <p>{emailBody}</p>
              </div>
              <p className="modal-disclaimer">
                <i>
                ⚠️ Please review and edit this template to ensure accuracy before
                saving. Saved templates will be reusable in future emails.
                </i>
              </p>
            </div>
            <div className="save-modal-footer">
              <button
                onClick={() => setShowModal(false)}
                className="button modal-button-cancel"
              >
                Cancel
              </button>
              <button onClick={confirmSave} className="button button-save">
                <Save size={18} /> Confirm Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
