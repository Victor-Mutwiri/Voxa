import { useState } from "react";
import { Mail, Linkedin } from "lucide-react";
import EmailOutreach from "./Outreaches/Emailoutreach";
import LinkedinOutreach from "./Outreaches/Linkedinoutreach";
import '../styles/Outreach.css';

const Outreach = () => {
  const [activeTab, setActiveTab] = useState("email");

  return (
    <section className="outreach">
      {/* Tab Navigation */}
      <div className="outreach-tabs">
        <button
          className={`tab-btn ${activeTab === "email" ? "active" : ""}`}
          onClick={() => setActiveTab("email")}
        >
          <Mail size={18} />
          <span>Email</span>
        </button>
        <button
          className={`tab-btn ${activeTab === "linkedin" ? "active" : ""}`}
          onClick={() => setActiveTab("linkedin")}
        >
          <Linkedin size={18} />
          <span>LinkedIn</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="outreach-content">
        {activeTab === "email" && <EmailOutreach />}
        {activeTab === "linkedin" && <LinkedinOutreach />}
      </div>
    </section>
  );
};

export default Outreach;
