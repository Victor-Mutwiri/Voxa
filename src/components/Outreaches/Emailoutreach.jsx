import { useEffect, useState } from "react";
import useStore from "../../useStore";
import "../../styles/Outreach.css";
import { Briefcase, Building2, Globe } from "lucide-react";
import EmailPreview from "./EmailPreview";

const EmailOutreach = () => {
  const {
    leads,
    fetchLeads,
    loading,
    error,
    userId,
    activeCampaign,
    campaigns,
    filters,
    setFilter,
  } = useStore();

  const [selectedLead, setSelectedLead] = useState(null);

  const stepLabels = {
    0: "Awaiting Cold Outreach",
    1: "Cold Email Sent",
    2: "Follow-up 1 Sent",
    3: "Follow-up 2 Sent",
    4: "Breakup Email Sent",
  };

  const getStepLabel = (step) => stepLabels[step] || `Step ${step}`;

  const Campaign = activeCampaign ? activeCampaign.name : "No campaign selected";

  // Fetch leads when userId changes
  useEffect(() => {
    if (userId) {
      fetchLeads();
    }
  }, [userId, fetchLeads]);

  // ✅ Apply filtering
  let displayedLeads = leads;

  if (filters.campaignId) {
    displayedLeads = displayedLeads.filter(
      (l) => String(l.current_campaign_id) === String(filters.campaignId)
    );
  }

  if (filters.stepNumber !== null) {
    displayedLeads = displayedLeads.filter(
      (l) => String(l.current_step) === String(filters.stepNumber)
    );
  }

  // Only show leads with name + email
  const validLeads = displayedLeads.filter(
    (lead) => lead.name && lead.email
  );

  return (
    <div className="email-outreach">
      <div className="email-panels">
        {/* Left Panel → Leads Table */}
        <div className="lead-table-panel">
          <h4>Current Campaign: {Campaign}</h4>

          {/* {loading && <p className="status-msg">⏳ Loading leads...</p>} */}
          {error && <p className="status-msg error">❌ {error}</p>}

          {!loading && validLeads.length === 0 && (
            <p className="status-msg">
              No leads found for the selected filters.
            </p>
          )}

          {/* ✅ Filters UI */}
          <div className="filters">
            <div className="filter-group">
              <label>Campaign</label>
              <select
                value={filters.campaignId || ""}
                onChange={(e) =>
                  setFilter("campaignId", e.target.value || null)
                }
              >
                <option value="">All Leads</option>
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Step</label>
              <select
                value={filters.stepNumber ?? ""}
                onChange={(e) =>
                  setFilter(
                    "stepNumber",
                    e.target.value ? Number(e.target.value) : null
                  )
                }
              >
                <option value="">All Steps</option>
                {Object.entries(stepLabels).map(([num, label]) => (
                  <option key={num} value={num}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>


          {/* Leads Table */}
          {validLeads.length > 0 && (
            <div className="table-wrapper">
              <table className="lead-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>
                      <Briefcase size={14} /> Title
                    </th>
                    <th>
                      <Building2 size={14} /> Organization
                    </th>
                    <th>
                      <Globe size={14} /> Industry
                    </th>
                    <th>Step</th>
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
                      <td>{getStepLabel(lead.current_step ?? 0)}</td>
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
