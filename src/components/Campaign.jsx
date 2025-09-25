import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Loader2, CheckCircle } from "lucide-react";
import useStore from "../useStore";
import "../styles/Campaigns.css";

const Campaign = () => {
  const {
    campaigns,
    fetchCampaigns,
    createCampaign,
    deleteCampaign,
    userId,
    loading,
    activeCampaign,
    setActiveCampaign,
  } = useStore()

  const [newCampaign, setNewCampaign] = useState("");
  const [creating, setCreating] = useState(false);

  // Fetch campaigns when userId changes
  useEffect(() => {
    if (userId) {
      fetchCampaigns();
    }
  }, [userId, fetchCampaigns]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCampaign.trim()) return;

    setCreating(true);
    try {
      await createCampaign(newCampaign.trim());
      setNewCampaign("");
    } catch (err) {
      console.error("Error creating campaign:", err.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="campaigns-container">
      <h2 className="title">📊 Campaigns</h2>

      {/* Create Campaign */}
      <form onSubmit={handleCreate} className="campaign-form">
        <input
          type="text"
          value={newCampaign}
          onChange={(e) => setNewCampaign(e.target.value)}
          placeholder="Enter campaign name..."
          className="campaign-input"
        />
        <button type="submit" className="create-btn" disabled={creating}>
          {creating ? <Loader2 className="spin" size={16} /> : <FontAwesomeIcon icon={faPlus} />}
          {creating ? "Creating..." : "Create"}
        </button>
      </form>

      {/* Campaign List */}
      {loading ? (
        <p className="loading-msg">Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p className="empty-msg">No campaigns yet. Create one above 👆</p>
      ) : (
        <ul className="campaign-list">
          {campaigns.map((c) => (
            <li key={c.id} className="campaign-item">
              <span className="campaign-name">{c.name}</span>
              <button onClick={() => setActiveCampaign(c)}>
                <CheckCircle
                className={activeCampaign?.id === c.id ? "active" : ""}
                />
                Set Active
                </button>
              <button
                className="delete-btn"
                onClick={() => deleteCampaign(c.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Campaign;
