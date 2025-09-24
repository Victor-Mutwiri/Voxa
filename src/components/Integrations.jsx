import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faEnvelope, faLock, faServer, faHashtag, faShieldAlt, faTerminal } from "@fortawesome/free-solid-svg-icons";
import "../styles/Integrations.css";

const Integrations = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    host: "",
    port: "",
    ssl: true,
    disableStartTLS: false,
    clientHostName: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5678/webhook-test/b490f27e-3c27-4d66-aeae-5ed57b95317a", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert("SMTP connected successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert("Connection failed. Please try again.");
    }
  };


  return (
    <div className="integrations-container">
      <div className="integration-card">
        <h2>Email SMTP Setup</h2>
        <p className="intro">
          Enter your business email provider’s SMTP details below. These credentials allow our platform
          to send emails campaigns on your behalf through <strong>Voxa</strong>.  
          If you’re unsure, check your email provider’s documentation for SMTP settings.
        </p>

        <form onSubmit={handleSubmit} className="integration-form">
          {/* Email */}
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faEnvelope} /> Business Email Address
              <FontAwesomeIcon icon={faInfoCircle} className="info-icon" title="The email address you want to send cold emails from." />
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          {/* Password */}
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faLock} /> Password / App Password
              <FontAwesomeIcon icon={faInfoCircle} className="info-icon" title="Use your account password or an app-specific password if required." />
            </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          {/* Host */}
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faServer} /> SMTP Host
              <FontAwesomeIcon icon={faInfoCircle} className="info-icon" title="Usually looks like smtp.provider.com (check with your provider)." />
            </label>
            <input type="text" name="host" value={formData.host} onChange={handleChange} placeholder="smtp.mailserver.com" required />
          </div>

          {/* Port */}
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faHashtag} /> Port
              <FontAwesomeIcon icon={faInfoCircle} className="info-icon" title="Common ports: 465 (SSL), 587 (TLS), 25 (no encryption)." />
            </label>
            <input type="number" name="port" value={formData.port} onChange={handleChange} placeholder="465" required />
          </div>

          {/* SSL/TLS */}
          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" name="ssl" checked={formData.ssl} onChange={handleChange} />
              <FontAwesomeIcon icon={faShieldAlt} /> Use SSL/TLS
            </label>
          </div>

          {/* Disable STARTTLS */}
          <div className="form-group checkbox-group">
            <label>
              <input type="checkbox" name="disableStartTLS" checked={formData.disableStartTLS} onChange={handleChange} />
              <FontAwesomeIcon icon={faTerminal} /> Disable STARTTLS
            </label>
          </div>

          {/* Client Host Name */}
          <div className="form-group">
            <label>
              Client Host Name (optional)
              <FontAwesomeIcon icon={faInfoCircle} className="info-icon" title="Some providers require identifying the client host name." />
            </label>
            <input type="text" name="clientHostName" value={formData.clientHostName} onChange={handleChange} placeholder="mail.yourdomain.com" />
          </div>

          <button type="submit" className="btn-submit">Save & Connect</button>
        </form>
      </div>
    </div>
  );
};

export default Integrations;
