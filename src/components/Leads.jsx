import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../styles/Leads.css';

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            // Get the current user
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) throw new Error('No user found');

            // Fetch leads for the current user
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            setLeads(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="leads-loading">Loading leads...</div>;
    if (error) return <div className="leads-error">Error: {error}</div>;

    return (
        <div className="leads-container">
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
                                            {lead.estimated_num_employees} employees
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