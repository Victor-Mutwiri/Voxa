import { useState } from "react";
import { Mail, Linkedin, Phone } from "lucide-react";
import EmailOutreach from "./Outreaches/Emailoutreach";
import PhoneOutreach from "./Outreaches/Phoneoutreach";
import LinkedinOutreach from "./Outreaches/Linkedinoutreach";
import '../styles/Outreach.css';

const Outreach = () => {
  const [activeTab, setActiveTab] = useState("email");

  return (
    <section className="outreach">
      {/* Tab Navigation */}
      <div className="outreach-tabs">
        <button
          className={`tab-btn ${activeTab === "phone" ? "active" : ""}`}
          onClick={() => setActiveTab("phone")}
        >
          <Phone size={18} />
          <span>Phone</span>
        </button>
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
        {activeTab === "phone" && <PhoneOutreach />}
        {activeTab === "email" && <EmailOutreach />}
        {activeTab === "linkedin" && <LinkedinOutreach />}
      </div>
    </section>
  );
};

export default Outreach;
