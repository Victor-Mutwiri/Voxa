// Dashboard.jsx
import { useEffect, useState } from "react";
import useStore from "../useStore";
import { supabase } from "../supabaseClient";
import '../styles/Dashboard.css'
import {
  Mail,
  Users,
  Layers,
  Activity,
  TrendingUp,
  Clock,
  Filter,
} from "lucide-react";

const stepLabels = {
  0: "Awaiting Cold Outreach",
  1: "Cold Email Sent",
  2: "Follow-up 1 Sent",
  3: "Follow-up 2 Sent",
  4: "Breakup Email Sent",
};

const Dashboard = () => {
  const { userId, leads, campaigns, fetchLeads, fetchCampaigns } = useStore();
  const [outreachLogs, setOutreachLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState('all');

  // Fetch outreach logs
  useEffect(() => {
    const fetchLogs = async () => {
      if (!userId) return;
      setLoading(true);
      
      const query = supabase
        .from("outreach_logs")
        .select("*")
        .eq("user_id", userId);

      // Add campaign filter if specific campaign selected
      if (selectedCampaign !== 'all') {
        query.eq("campaign_id", selectedCampaign);
      }

      const { data, error } = await query.order("sent_at", { ascending: false });
      if (!error) setOutreachLogs(data || []);
      setLoading(false);
    };

    fetchLogs();
    fetchLeads();
    fetchCampaigns();
  }, [userId, fetchLeads, fetchCampaigns, selectedCampaign]);

  // Stats
  const calculateStats = () => {
    const stats = {
      totalLeads: leads.length,
      totalCampaigns: campaigns.length,
      stepCounts: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0
      },
      emailsSent: 0
    };

    // Get all outreach logs for the user
    const getAllEmailsSent = () => {
      return leads.reduce((total, lead) => {
        return total + (lead.outreach_logs?.length || 0);
      }, 0);
    };

    // Get emails sent for specific campaign
    const getCampaignEmailsSent = () => {
      return outreachLogs.length;
    };

    // Initialize step 0 count with total leads not in the current campaign
    const leadsInCurrentCampaign = new Set(outreachLogs.map(log => log.lead_id));
    
    if (selectedCampaign !== 'all') {
      // For specific campaign
      stats.stepCounts[0] = leads.filter(lead => !leadsInCurrentCampaign.has(lead.id)).length;
      stats.emailsSent = getCampaignEmailsSent();
    } else {
      // For all campaigns
      stats.stepCounts[0] = leads.filter(lead => !lead.outreach_logs?.length).length;
      stats.emailsSent = getAllEmailsSent();
    }

    // Count emails by step for the filtered campaign(s)
    outreachLogs.forEach(log => {
      stats.stepCounts[log.step_number] = (stats.stepCounts[log.step_number] || 0) + 1;
    });

    return stats;
  };

  const stats = calculateStats();

  return (
    <div className="dashboard">
      {/* <h1 className="dashboard-title">📊 Outreach Dashboard</h1> */}
      {loading && <p>⏳ Loading insights...</p>}

      {/* Campaign Filter */}
      <div className="filter-section">
        <div className="filter-group">
          <label htmlFor="campaign-filter">
            <Filter size={16} /> Filter by Campaign
          </label>
          <select
            id="campaign-filter"
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="campaign-select"
          >
            <option value="all">All Campaigns</option>
            {campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>
                {campaign.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card leads">
          <Users size={28} />
          <div>
            <h3>{stats.totalLeads}</h3>
            <p>Total Leads</p>
          </div>
        </div>

        <div className="metric-card campaigns">
          <Layers size={28} />
          <div>
            <h3>{stats.totalCampaigns}</h3>
            <p>Campaigns</p>
          </div>
        </div>

        <div className="metric-card emails">
          <Mail size={28} />
          <div>
            <h3>{stats.emailsSent}</h3>
            <p>Emails Sent</p>
          </div>
        </div>
      </div>

      {/* Funnel */}
      <div className="funnel card">
        <h2>
          <TrendingUp size={20} /> 
          {selectedCampaign !== 'all' 
            ? `${campaigns.find(c => c.id === selectedCampaign)?.name} Funnel` 
            : 'Overall Lead Funnel'}
        </h2>
        <ul>
          {Object.entries(stepLabels).map(([step, label]) => (
            <li key={step} className="funnel-step">
              <div className="step-info">
                <span className="step-label">{label}</span>
                <span className="step-count">{stats.stepCounts[step] || 0}</span>
              </div>
              <div className="step-progress">
                <div 
                  className="progress-bar"
                  style={{
                    width: `${stats.totalLeads ? (stats.stepCounts[step] / stats.totalLeads) * 100 : 0}%`
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Activity */}
      <div className="activity card">
        <h2>
          <Activity size={20} /> Recent Outreach
        </h2>
        {outreachLogs.slice(0, 5).map((log) => (
          <div key={log.id} className="activity-item">
            <Clock size={14} className="clock" />
            <span>
              Lead <strong>#{log.lead_id}</strong> →{" "}
              <span className="step-label">{stepLabels[log.step_number]}</span>
              <span className="campaign-tag">
                {campaigns.find(c => c.id === log.campaign_id)?.name || 'Unknown Campaign'}
              </span>
              <span className="activity-time">
                {new Date(log.sent_at).toLocaleString()}
              </span>
            </span>
          </div>
        ))}
        {outreachLogs.length === 0 && (
          <p className="empty-state">No outreach activity {selectedCampaign !== 'all' ? 'for this campaign' : ''} yet 🚀</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
