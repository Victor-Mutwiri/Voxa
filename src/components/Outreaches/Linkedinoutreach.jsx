import { useEffect } from "react";
import useStore from "../../useStore";
import "../../styles/Outreach.css";
import { Linkedin, Briefcase, Building2, Globe } from "lucide-react";

const LinkedinOutreach = () => {
  const { leads, fetchLeads, loading, error, userId } = useStore();

  useEffect(() => {
    if (userId) {
      fetchLeads();
    }
  }, [userId, fetchLeads]);

  const validLeads = leads.filter(
    (lead) => lead.name && lead.leads_linkedin_url
  );

  return (
    <div className="linkedin-outreach">
      {/* <h3 className="linkedin-title">
        <Linkedin size={22} color="#0a66c2" /> LinkedIn Outreach
      </h3> */}

      {/* {loading && <p className="status-msg">⏳</p>} */}
      {error && <p className="status-msg error">❌ {error}</p>}

      {!loading && validLeads.length === 0 && (
        <p className="status-msg">No valid leads found. Extract some to get started!</p>
      )}

      {validLeads.length > 0 && (
        <div className="table-wrapper">
          <table className="lead-table">
            <thead>
              <tr>
                <th>Name</th>
                <th><Briefcase size={16} /> Title</th>
                <th><Building2 size={16} /> Organization</th>
                <th><Globe size={16} /> Industry</th>
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
                  <td>
                    <a
                      href={lead.leads_linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="connect-btn"
                    >
                      <Linkedin size={16} />
                      Connect
                    </a>
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

export default LinkedinOutreach;
