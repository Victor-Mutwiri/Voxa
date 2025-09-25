import { useEffect, useState } from "react";
import useStore from "../../useStore";
import "../../styles/Outreach.css";
import { Briefcase, Building2, Globe, Mail } from "lucide-react";
import EmailPreview from "./EmailPreview";

const EmailOutreach = () => {
  const { leads, fetchLeads, loading, error, userId, activeCampaign } = useStore();
  const [selectedLead, setSelectedLead] = useState(null);

  const Campaign = activeCampaign ? activeCampaign.name : "No campaign selected";

  useEffect(() => {
    if (userId) {
      fetchLeads();
    }
  }, [userId, fetchLeads]);

  const validLeads = leads.filter((lead) => lead.name && lead.email);

  return (
    <div className="email-outreach">
      <div className="email-panels">
        {/* Left Panel → Leads Table */}
        <div className="lead-table-panel">
          <h4>Current Campaign: {Campaign}</h4>

          {/* {loading && <p className="status-msg">⏳</p>} */}
          {error && <p className="status-msg error">❌ {error}</p>}

          {!loading && validLeads.length === 0 && (
            <p className="status-msg">
              No valid leads found. Extract some to get started!
            </p>
          )}

          {validLeads.length > 0 && (
            <div className="table-wrapper">
              <table className="lead-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th><Briefcase size={14} /> Title</th>
                    <th><Building2 size={14} /> Organization</th>
                    <th><Globe size={14} /> Industry</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {validLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>{lead.name}</td>
                      <td>{lead.title || "—"}</td>
                      <td>{lead.organization_name || "—"}</td>
                      <td>{lead.industry || "—"}</td>
                      <td>
                        <button
                          className="connect-btn"
                          onClick={() => setSelectedLead(lead)}
                        >
                          Preview Email
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Panel → Email Preview */}
        <div className="preview-panel">
          <EmailPreview lead={selectedLead} />
        </div>
      </div>
    </div>
  );
};

export default EmailOutreach;
