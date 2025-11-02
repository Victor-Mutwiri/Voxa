import { useEffect } from "react";
import useStore from "../../useStore";
import "../../styles/Outreach.css";
import { Phone, Briefcase, Building2, Globe } from "lucide-react";

const PhoneOutreach = () => {
  const { leads, fetchLeads, loading, error, userId, filters, setFilter } = useStore();

  useEffect(() => {
    if (userId) {
      fetchLeads();
    }
  }, [userId, fetchLeads]);

  // ✅ Create a unique sorted list of industries
  const industries = [...new Set(leads.filter(l => l.industry).map(l => l.industry))].sort();

  // ✅ Apply filtering by industry
  let displayedLeads = leads;
  if (filters.industry) {
    displayedLeads = displayedLeads.filter(
      (l) => l.industry?.toLowerCase() === filters.industry.toLowerCase()
    );
  }

  // ✅ Only valid leads (with name and phone)
  const validLeads = displayedLeads.filter(
    (lead) => lead.name && lead.organization_phone
  );

  return (
    <div className="phone-outreach">
      <div className="lead-table-panel">
        {/* Optional Title */}
        {/* <h3 className="phone-title">
          <Phone size={22} color="#0a66c2" /> Phone Call Outreach
        </h3> */}

        {error && <p className="status-msg error">❌ {error}</p>}

        {!loading && validLeads.length === 0 && (
          <p className="status-msg">No valid leads found. Extract some to get started!</p>
        )}

        {/* ✅ Industry Filter */}
        <div className="filters">
          <div className="filter-group">
            <label>Industry</label>
            <select
              value={filters.industry || ""}
              onChange={(e) => setFilter("industry", e.target.value || null)}
            >
              <option value="">All Industries</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ✅ Leads Table */}
        {validLeads.length > 0 && (
          <div className="table-wrapper">
            <table className="lead-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th><Briefcase size={16} /> Title</th>
                  <th><Building2 size={16} /> Organization</th>
                  <th><Globe size={16} /> Industry</th>
                  <th><Phone size={16} /> Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {validLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="lead-name">{lead.name}</td>
                    <td>{lead.title || "—"}</td>
                    <td>{lead.organization_name || "—"}</td>
                    <td>{lead.industry || "—"}</td>
                    <td>{lead.organization_phone || "—"}</td>
                    <td>
                      <a
                        href={`tel:${lead.organization_phone}`}
                        className="connect-btn"
                      >
                        <Phone size={16} />
                        Call
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneOutreach;
