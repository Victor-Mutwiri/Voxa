import { useState, useEffect } from 'react';
import useStore from '../useStore';
import { useNavigate } from 'react-router';
import { supabase } from '../supabaseClient';
import LogoutModal from '../components/Authentication/LogoutModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faChartLine,
  faUserFriends,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  LogOut,
  Mail,
  Users,
  Layers,
  Activity,
  TrendingUp,
  Clock,
  Filter
} from "lucide-react";
import Logo from '../assets/Voxa Logo.png'
import '../styles/UserDashboard.css';

const stepLabels = {
  0: "Awaiting Cold Outreach",
  1: "Cold Email Sent",
  2: "Follow-up 1 Sent",
  3: "Follow-up 2 Sent",
  4: "Breakup Email Sent",
};

const UserDashboard = () => {
  const { userId, leads, campaigns, fetchLeads, fetchCampaigns } = useStore();
  const [outreachLogs, setOutreachLogs] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const linkedinProspects = leads.filter((lead) => lead.leads_linkedin_url);
  const totalLinkedinProspects = linkedinProspects.length;
  const [showAllProspects, setShowAllProspects] = useState(false);
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


  const handleSignOut = () => {
      setShowLogoutModal(true);
  };
  const handleLogoutConfirm = async () => {
      try{
      await supabase.auth.signOut();
      useStore.getState().resetStore();
      localStorage.clear();
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      setShowLogoutModal(false);
      navigate('/', {replace:true});
      } catch (error) {
      console.error('Logout failed:', error);
      };
  };
  const handleLogoutCancel = () => {
      setShowLogoutModal(false);
  };

  return (
    <div className="userdashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="userdashboard-logo">
            <a href="/">
                <img src={Logo} alt="Voxa Logo" className="logo" />
            </a>
        </div>
        <nav className="menu">
          <ul>
            {/* <li>
              <FontAwesomeIcon icon={faChartLine} /> Dashboard
            </li> */}
            {/* <li>
              <FontAwesomeIcon icon={faEnvelope} /> Campaigns
            </li>
            <li>
              <FontAwesomeIcon icon={faUserFriends} /> Leads
            </li> */}
          </ul>
        </nav>
        {/* <div className="logout">
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </div> */}
        <div className="nav-signout">
            <button
                onClick={handleSignOut}
                className="user-signout-btn"
            >
                <LogOut className="user-signout-icon" />
                <span className="user-signout-label">Sign Out</span>
            </button>
        </div>
        <LogoutModal
            open={showLogoutModal}
            onClose={handleLogoutCancel}
            onConfirm={handleLogoutConfirm}
        />
      </aside>

      {/* Main content */}
      <main className="main">
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

        {/* <div className="metric-card linkedin">
          <Users size={28} />
          <div>
            <h3>{stats.linkedinProspects}</h3>
            <p>LinkedIn Prospects</p>
          </div>
        </div> */}
  
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

        {/* LinkedIn Prospects Section */}
        <div className="linkedin-prospects card">
          <h2>
            <Users size={20} /> LinkedIn Prospects
          </h2>
          {linkedinProspects.length === 0 && (
            <p className="empty-state">No LinkedIn prospects found yet.</p>
          )}
          {linkedinProspects.length > 0 && (
            <>
              <div className="table-wrapper">
                <table className="lead-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Title</th>
                      <th>Organization</th>
                      <th>Industry</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(showAllProspects ? linkedinProspects : linkedinProspects.slice(0, 5)).map(
                      (lead) => (
                        <tr key={lead.id}>
                          <td>{lead.name}</td>
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
                              Connect
                            </a>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* Toggle Button */}
              {linkedinProspects.length > 5 && (
                <div className="view-all-wrapper">
                  <button
                    className="view-all-btn"
                    onClick={() => setShowAllProspects((prev) => !prev)}
                  >
                    {showAllProspects ? "Show Less ↑" : "View All Prospects →"}
                  </button>
                </div>
              )}
            </>
          )}
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
      </main>
    </div>
  );
};

export default UserDashboard;
