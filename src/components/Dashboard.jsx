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

  // Fetch outreach logs
  useEffect(() => {
    const fetchLogs = async () => {
      if (!userId) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("outreach_logs")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (!error) setOutreachLogs(data || []);
      setLoading(false);
    };
    fetchLogs();
    fetchLeads();
    fetchCampaigns();
  }, [userId, fetchLeads, fetchCampaigns]);

  // Stats
  const totalLeads = leads.length;
  const totalCampaigns = campaigns.length;
  const totalEmailsSent = outreachLogs.length;

  // Leads by step
  const leadsByStep = leads.reduce((acc, lead) => {
    acc[lead.current_step] = (acc[lead.current_step] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="dashboard">
      {/* <h1 className="dashboard-title">📊 Outreach Dashboard</h1> */}
      {loading && <p>⏳ Loading insights...</p>}

      {/* Metrics Grid */}
      <div className="metrics-grid">
        <div className="metric-card leads">
          <Users size={28} />
          <div>
            <h3>{totalLeads}</h3>
            <p>Total Leads</p>
          </div>
        </div>

        <div className="metric-card campaigns">
          <Layers size={28} />
          <div>
            <h3>{totalCampaigns}</h3>
            <p>Campaigns</p>
          </div>
        </div>

        <div className="metric-card emails">
          <Mail size={28} />
          <div>
            <h3>{totalEmailsSent}</h3>
            <p>Emails Sent</p>
          </div>
        </div>
      </div>

      {/* Funnel */}
      <div className="funnel card">
        <h2>
          <TrendingUp size={20} /> Lead Funnel
        </h2>
        <ul>
          {Object.entries(stepLabels).map(([num, label]) => (
            <li key={num}>
              <span>{label}</span>
              <span className="count">{leadsByStep[num] || 0}</span>
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
              {stepLabels[log.step_number]} (
              <span className="campaign-tag">Campaign {log.campaign_id}</span>)
            </span>
          </div>
        ))}
        {outreachLogs.length === 0 && (
          <p className="empty-state">No outreach activity yet 🚀</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
