import {useState} from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../supabaseClient';
import useStore from '../useStore';
import LogoutModal from '../components/Authentication/LogoutModal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faChartLine,
  faUserFriends,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Logo from '../assets/Voxa Logo.png'
import { Activity, PieChart } from "lucide-react";
import '../styles/UserDashboard.css';

const UserDashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
            <a href="/">
                <img src={Logo} alt="Voxa Logo" className="logo" />
            </a>
        </div>
        <nav className="menu">
          <ul>
            <li>
              <FontAwesomeIcon icon={faChartLine} /> Dashboard
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} /> Campaigns
            </li>
            <li>
              <FontAwesomeIcon icon={faUserFriends} /> Leads
            </li>
          </ul>
        </nav>
        <div className="logout">
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </div>
      </aside>

      {/* Main content */}
      <main className="main">
        <header className="header">
          <h1>Dashboard</h1>
          <p>Welcome back! Here’s your latest performance.</p>
        </header>

        {/* Hero stats */}
        <section className="stats">
          <div className="stat-card">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <h2>1,250</h2>
            <p>Emails Sent</p>
          </div>
          <div className="stat-card">
            <PieChart size={20} className="icon" />
            <h2>58%</h2>
            <p>Open Rate</p>
          </div>
          <div className="stat-card">
            <Activity size={20} className="icon" />
            <h2>120</h2>
            <p>Replies</p>
          </div>
          <div className="stat-card">
            <FontAwesomeIcon icon={faUserFriends} className="icon" />
            <h2>75</h2>
            <p>LinkedIn Connects</p>
          </div>
        </section>

        {/* Charts & activity */}
        <section className="charts">
          <div className="chart-card">
            <h3>Email Performance</h3>
            <div className="chart-placeholder">[Bar Chart]</div>
          </div>
          <div className="chart-card">
            <h3>Leads by Industry</h3>
            <div className="chart-placeholder">[Pie Chart]</div>
          </div>
        </section>

        {/* Recent activity */}
        <section className="activity">
          <h3>Recent Activity</h3>
          <ul>
            <li>✅ Sent 250 emails yesterday</li>
            <li>📈 50 new leads added this week</li>
            <li>💬 12 replies received today</li>
            <li>🔗 5 new LinkedIn connections</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
