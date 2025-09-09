import { useEffect, useState } from 'react';
import useStore from '../useStore';
import Modal from '../components/Modal';
import LeadSearchForm from './LeadsForm';
import '../styles/Leads.css';

const Leads = () => {
    const { leads, loading, error, fetchLeads } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (leads.length === 0) {
        fetchLeads(); // fetch only if no cached leads
        }
    }, [leads.length, fetchLeads]);

    const handleFormSubmit = async (formData) => {
        setIsFetching(true);
        setIsModalOpen(false);

        // Send data to n8n
        await fetch("http://localhost:5678/webhook-test/14c17b5d-bc40-4e37-962f-ff593521aff2", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        // Then refresh leads
        await fetchLeads();

        setIsFetching(false);
    };

    if (loading) return <div className="leads-loading">Loading leads...</div>;
    if (error) return <div className="leads-error">Error: {error}</div>;

    return (
        <div className="leads-container">
            <div>
                <button
                onClick={() => setIsModalOpen(true)}
                disabled={isFetching}
                className={`px-4 py-2 rounded ${
                    isFetching ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"
                }`}
                >
                {isFetching ? "Fetching leads, please wait…" : "Get Leads"}
                </button>
            </div>
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-semibold mb-4">Search Leads</h2>
                <LeadSearchForm onSubmit={handleFormSubmit} />
            </Modal>
            <div className="leads-header">
                <h2>Your Leads</h2>
                <p>{leads.length} leads found</p>
            </div>

            <div className="leads-table-container">
                <table className="leads-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Organization</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Industry</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead) => (
                            <tr key={lead.id}>
                                <td>{lead.name}</td>
                                <td>
                                    <div className="lead-title">
                                        <span>{lead.title}</span>
                                        <span className="lead-seniority">{lead.seniority}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="lead-organization">
                                        <span>{lead.organization_name}</span>
                                        <span className="lead-employees">
                                            Est. {lead.estimated_num_employees} employees
                                        </span>
                                    </div>
                                </td>
                                <td>{lead.email}</td>
                                <td>
                                    {[lead.city, lead.state, lead.country]
                                        .filter(Boolean)
                                        .join(', ')}
                                </td>
                                <td>{lead.industry}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leads;