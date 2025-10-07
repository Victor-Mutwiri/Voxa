import {useState} from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../supabaseClient';
import useStore from '../useStore';
import Dashboard from '../components/Dashboard';
import Templates from '../components/Templates';
import Leads from '../components/Leads';
import Integrations from '../components/Integrations';
import Outreach from '../components/Outreach';
import Campaign from '../components/Campaign';
import Settingz from '../components/Settingz';
import LogoutModal from '../components/Authentication/LogoutModal';
import { 
    LogOut,
    User,
    Activity,
    LayoutDashboard,
    BookText,
    Users,
    Settings,
    Mail,
    Megaphone,
    LayoutTemplate,
    Rocket,
    // FileText,
    // Send,
    // Target,
} from 'lucide-react';
import Logo from '../assets/Voxa Logo.png'
import '../styles/Home.css'

const Home = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

    const handleUserIconClick = () => {
        setActiveTab('settings');
    };

    const navigationItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'leads', label: 'Leads', icon: BookText },
        { id: 'outreach', label: 'Outreach', icon: Rocket },
        { id: 'campaign', label: 'Campaign', icon: Megaphone },
        { id: 'templates', label: 'Templates', icon: LayoutTemplate },
        { id: 'integrations', label: 'Integrations', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const renderContent = () => {
        switch (activeTab) {
        case 'overview':
            return <Dashboard />;
        case 'leads':
            return <Leads />;
        case 'outreach':
            return <Outreach />;
        case 'campaign':
            return <Campaign />;
        case 'templates':
            return <Templates />;
        case 'integrations':
            return <Integrations />;
        case 'settings':
            return <Settingz />;
        default:
            return <Dashboard />;
        }
    };

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
        <div className="home-root">
            <div className="nav-panel">
                    {/* Header */}
                    <div className="nav-header">
                        <div className="nav-header-inner">
                            <div className="nav-logo">
                                <a href="/">
                                    <img src={Logo} alt="Voxa Logo" className="logo" />
                                    {/* <Activity className="nav-logo-icon" /> */}
                                </a>
                            </div>
                        </div>
                    </div>
                    <nav className="nav-items">
                        {navigationItems.filter(item => item.id !== 'settings').map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`nav-btn${activeTab === item.id ? ' nav-btn-active' : ''}`}
                                >
                                    <Icon className="nav-btn-icon" />
                                    <span className="nav-btn-label">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                {/* Sign Out Button */}
                <div className="nav-signout">
                    <button
                        onClick={handleSignOut}
                        className="signout-btn"
                    >
                        <LogOut className="signout-icon" />
                        <span className="signout-label">Sign Out</span>
                    </button>
                </div>
                <LogoutModal
                    open={showLogoutModal}
                    onClose={handleLogoutCancel}
                    onConfirm={handleLogoutConfirm}
                />
            </div>
            {/* Right Content Area */}
            <div className="content-area">
                {/* Top Header */}
                <header className="content-header">
                <div className="header-row">
                    <div>
                    <h1 className="header-title">
                        Hello, welcome back
                    </h1>
                    <p className="header-date">
                        {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                        })}
                    </p>
                    </div>
                    <div className="header-actions">
                        <div 
                            className="header-user"
                            onClick={handleUserIconClick}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="user-avatar">
                                <User className="user-avatar-icon" />
                            </div>
                        </div>
                    </div>
                </div>
                </header>

                {/* Main Content */}
                <main className="main-content">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}
export default Home;