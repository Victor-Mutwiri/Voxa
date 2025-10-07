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

        <div className="metric-card linkedin">
          <Users size={28} />
          <div>
            <h3>{totalLinkedinProspects}</h3>
            <p>LinkedIn Prospects</p>
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
                {stepLabels[log.step_number]} (
                <span className="campaign-tag">Campaign {log.campaign_id}</span>)
              </span>
            </div>
          ))}
          {outreachLogs.length === 0 && (
            <p className="empty-state">No outreach activity yet 🚀</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
