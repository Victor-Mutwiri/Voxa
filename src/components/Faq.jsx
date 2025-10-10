import { useState } from "react";
import { ChevronDown } from "lucide-react";
import '../styles/landingpage.css'

const faqs = [
  {
    question: "What is the difference between the plans?",
    answer:
      "Our Basic plan is built for startups and small teams, offering AI-powered lead generation and most importantly OUTREACH. Pro adds analytics and support, while Enterprise provides tailored automations for larger organizations.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes! You can change your plan at any time by contacting your assigned agent. Your data and privacy remain intact.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards, Stripe, Wise, Pioneer and bank transfers for Enterprise clients.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "No — We offer a demo in our scheduled demo call bookings and a refund to your subscrition within 7 days so you can experience VoXa’s marketing power.",
  },
  {
    question: "Can VoXa integrate with my CRM?",
    answer:
      "Absolutely. VoXa integrates with most major CRMs including HubSpot, and Salesforce so your data stays in sync automatically.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <button className="faq-question">
              <span>{faq.question}</span>
              <ChevronDown
                size={22}
                className={`chevron ${activeIndex === index ? "rotate" : ""}`}
              />
            </button>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
