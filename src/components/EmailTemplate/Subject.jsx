import { useState } from "react";
import "../../styles/Message.css";
import useStore from "../../useStore";
import { supabase } from "../../supabaseClient";
import { Loader2, Save, Wand2, Edit3,Check, X, FileText } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeading } from "@fortawesome/free-solid-svg-icons";

const Subject = () => {
  const [prompt, setPrompt] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { isExecuting, executionsToday, startExecution, endExecution } = useStore();

  const DAILY_LIMIT = 5;

  // New: manual input mode
  const [mode, setMode] = useState("ai"); // "ai" | "manual"

  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editedSubject, setEditedSubject] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    // ✅ Block if execution in progress
    if (isExecuting) {
      setError("Another generation is already running. Please wait.");
      return;
    }

    // ✅ Block if daily limit exceeded
    if (executionsToday.Subject >= DAILY_LIMIT) {
      setError("Daily limit reached (10). Try again tomorrow.");
      return;
    }

    setError(null);
    startExecution("Subject");

    try {
      const apiUrl = import.meta.env.MODE === 'development' 
            ? import.meta.env.VITE_DEV_TEMPLATE_URL 
            : import.meta.env.VITE_PROD_TEMPLATE_URL;

      /* console.log('Using API URL:', apiUrl);
      console.log('Environment mode:', import.meta.env.MODE); */

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"},
        body: JSON.stringify({ prompt }),
      });

      /* console.log('Response status:', res.status); */

      if (!res.ok) {
          const errorText = await res.text();
          console.error('Server error response:', errorText);
          throw new Error(`HTTP ${res.status}: ${res.statusText || 'Failed to generate subject line'}`);
      }

      // Get response text first to debug
      const responseText = await res.text();
      console.log("Raw response:", responseText);

      // Try to parse JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error("Invalid JSON response from server");
      }

      // Handle different response formats
      let generatedSubject;
      if (Array.isArray(data) && data.length > 0) {
        // Handle array response: [{"subject": "..."}] or [{"output": "..."}]
        generatedSubject = data[0].subject || data[0].output;
      } else if (data.subject) {
        // Handle object response: {"subject": "..."}
        generatedSubject = data.subject;
      } else if (data.output) {
        // Handle object response: {"output": "..."}
        generatedSubject = data.output;
      } else {
        throw new Error("No subject found in response");
      }

      setSubject(generatedSubject || "No subject generated");
    } catch (err) {
      console.error("Generation error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      endExecution();
    }
  };

  const handleEdit = () => {
    setEditedSubject(subject);
    setIsEditing(true);
  };

  const confirmEdit = () => {
    setSubject(editedSubject);
    setIsEditing(false);
  };

  const handleSave = () => {
    /* console.log("Save clicked", subject); */
    setShowModal(true);
    // Add Supabase save logic here
  };


  const resetStates = () => {
      setPrompt("");
      setSubject("");
      setIsEditing(false);
      setEditedSubject("");
      setError(null);
      setShowModal(false);
    };
  
  
  // Confirm save (you’ll add Supabase logic here)
  const confirmSave = async () => {
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
            type: "Subject",
            template: subject,
            },
        ])
        .select();

        if (error) throw error;

        /* console.log("Saved successfully:", data); */
        alert("✅ Template saved successfully!");
        resetStates();
    } catch (err) {
        console.error("Error saving template:", err.message);
        setError(err.message);
    }
    };


  return (
    <div className="message-container">
      <h2 className="message-title">
        <FontAwesomeIcon icon={faHeading} /> Email Subject Line
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
          <textarea
            className="message-textarea"
            rows={3}
            placeholder="Write your prompt for the subject line..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

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
                <Wand2 size={18} /> Generate Subject
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
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </>
      )}

      {error && <p className="message-error">{error}</p>}

      {subject && (
        <div className="message-output">
          <h3>Generated Subject Line:</h3>
          {isEditing ? (
            <div className="edit-container">
              <textarea
                type="text"
                rows={4}
                className="edit-input"
                value={editedSubject}
                onChange={(e) => setEditedSubject(e.target.value)}
              />
              <button onClick={confirmEdit} className="button button-confirm">
                <Check size={18} /> Confirm Edit
              </button>
            </div>
          ) : (
            <>
              <p>{subject}</p>
              <button onClick={handleEdit} className="button button-edit">
                <Edit3 size={18} /> Edit
              </button>
            </>
          )}
          <button
            onClick={handleSave}
            disabled={!subject}
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
                <h4>Here’s the Subject you are about to save:</h4>
                <div className="modal-preview">
                    <p>{subject}</p>
                </div>
                <p className="modal-disclaimer">
                    ⚠️ Please review and edit this template to ensure accuracy before
                    saving. Saved templates will be reusable in future emails.
                </p>
                </div>
                <div className="save-modal-footer">
                <button
                    onClick={() => setShowModal(false)}
                    className="button button-cancel"
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

export default Subject;