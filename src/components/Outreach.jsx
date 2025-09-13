import { useState } from "react";
import "../styles/Outreach.css";

const Outreach = () => {
  const [formData, setFormData] = useState({
    host: "",
    port: 587,
    username: "",
    password: "",
    to: "",
    subject: "",
    text: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch(
        "https://wiwfljidzgczcgrunlnb.supabase.co/functions/v1/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success) {
        setStatus("✅ Email sent successfully!");
      } else {
        setStatus("❌ Failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error: " + err.message);
    }
  };

  return (
    <section className="outreach">
      <h2>Outreach Test</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="host"
          placeholder="SMTP Host"
          value={formData.host}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="port"
          placeholder="SMTP Port"
          value={formData.port}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="username"
          placeholder="SMTP Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="SMTP Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="to"
          placeholder="Recipient Email"
          value={formData.to}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="text"
          placeholder="Message"
          value={formData.text}
          onChange={handleChange}
          required
        />

        <button type="submit">Send Test Email</button>
      </form>

      {status && <p>{status}</p>}
    </section>
  );
};

export default Outreach;
