import { useState } from "react";
import "../styles/Outreach.css";

const Outreach = () => {
  const [formData, setFormData] = useState({
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
        "http://localhost:5678/webhook-test/sendmail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      // n8n might not always send JSON back
      let message = "✅ Sent to webhook!";
      try {
        const data = await res.json();
        message = `✅ Sent! Response: ${JSON.stringify(data)}`;
      } catch {
        message = "✅ Sent! (No JSON response)";
      }

      setStatus(message);
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
