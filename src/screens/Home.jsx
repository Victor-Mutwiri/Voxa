import {useState} from 'react';
import { useNavigate } from 'react-router';
import Dashboard from '../components/Dashboard';
import Templates from '../components/Templates';
import Settingz from '../components/Settingz';
import LogoutModal from '../components/Authentication/LogoutModal';
import { 
    LogOut,
    User,
    Activity,
    LayoutDashboard,
    BookText,
    Users,
    Settings
} from 'lucide-react';
import '../styles/Home.css'

const Home = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();

    const handleUserIconClick = () => {
        setActiveTab('settings');
    };

    const navigationItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'leads', label: 'Leads', icon: BookText },
        { id: 'templates', label: 'Templates', icon: Users },
        { id: 'integrations', label: 'Integrations', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const renderContent = () => {
        switch (activeTab) {
        case 'overview':
            return <Dashboard />;
        case 'leads':
            return <Settingz />;
        case 'templates':
            return <Templates />;
        case 'integrations':
            return <Templates />;
        case 'settings':
            return <Settingz />;
        default:
            return <Dashboard />;
        }
    };

    return (
        <div className="home-root">
            <div className="nav-panel">
                    {/* Header */}
                    <div className="nav-header">
                        <div className="nav-header-inner">
                            <div className="nav-logo">
                                <a href="/">
                                    <Activity className="nav-logo-icon" />
                                </a>
                            </div>
                            <span className="nav-title"> <a href="/">Voxa</a></span>
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
                        className="signout-btn"
                    >
                        <LogOut className="signout-icon" />
                        <span className="signout-label">Sign Out</span>
                    </button>
                </div>
                <LogoutModal/>
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