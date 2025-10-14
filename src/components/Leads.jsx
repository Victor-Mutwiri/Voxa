// Leads.jsx
import { useEffect, useState } from "react";
import useStore from "../useStore";
import Modal from "../components/Modal";
import LeadSearchForm from "./LeadsForm";
/* import '../styles/Outreach.css'; */
import '../styles/Leads.css';
import { Briefcase, MapPin, Globe, Link as LinkIcon } from "lucide-react";

const Leads = () => {
  const { leads, loading, error, fetchLeads } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (leads.length === 0) {
      fetchLeads();
    }
  }, [leads.length, fetchLeads]);

  const handleFormSubmit = async (formData) => {
    setIsFetching(true);
    setIsModalOpen(false);

    await fetch(`${import.meta.env.Dev? import.meta.VITE_DevSaveSearchUrl : import.meta.VITE_ProdSaveSearchUrl }`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    await fetchLeads();
    setIsFetching(false);
  };

  return (
    <div className="leads-container">
      <div>
        <button
            onClick={() => setIsModalOpen(true)}
            disabled={isFetching}
            className={`custom-btn ${isFetching ? "disabled" : ""}`}
            >
            {isFetching ? "Fetching leads, please wait…" : "Get Leads"}
        </button>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Search Leads</h2>
        <LeadSearchForm onSubmit={handleFormSubmit} />
      </Modal>

      {/* <div className="leads-header">
        <h2>Your Leads</h2>
        <p>{leads.length} leads found</p>
      </div> */}

      {loading && <p className="status-msg">⏳ Loading leads...</p>}
      {error && <p className="status-msg error">❌ {error}</p>}
      {!loading && leads.length === 0 && (
        <p className="status-msg">No leads found. Try fetching some!</p>
      )}

      {leads.length > 0 && (
        <div className="table-wrapper">
          <table className="lead-table">
            <thead>
              <tr>
                <th>Name</th>
                <th><Briefcase size={16} /> Title</th>
                {/* <th>Seniority</th> */}
                <th><MapPin size={16} /> Location</th>
                <th><Globe size={16} /> Industry</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="lead-name">{lead.name || "—"}</td>
                  <td>{lead.title || "—"}</td>
                  {/* <td>{lead.seniority || "—"}</td> */}
                  <td>
                    {[lead.city, lead.state, lead.country].filter(Boolean).join(", ") || "—"}
                  </td>
                  <td>{lead.industry || "—"}</td>
                  <td>
                    {lead.company_website ? (
                      <a
                        href={lead.company_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="connect-btn"
                      >
                        <LinkIcon size={14} />
                        Visit
                      </a>
                    ) : (
                      <span className="placeholder">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leads;
