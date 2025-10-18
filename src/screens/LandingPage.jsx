import {useState} from 'react'
import { toast, Toaster } from 'react-hot-toast';
import Navbar from "../components/Navbar/Navbar";
import { Search, Mail, BarChart3, Star, Users, TrendingUp, Target, ChevronDown } from 'lucide-react';
import FAQSection from "../components/Faq";
import Boredperson from '../assets/bored person.png';
import Landingpageimage from '../assets/background1.jpeg';
/* import Landingpageimage from '../assets/Heroimage.jpg'; */
/* import Landingpageimage from '../assets/Landingpage.png'; */
import '../styles/landingpage.css';
import Sarah from '../assets/Sarah Chen.jpg'
import David from '../assets/David Sterling.jpg'
import Maria from '../assets/Maria Rodriguez.jpg'
import Ben from '../assets/Ben Carter.jpg'
import Mark from '../assets/Mark Johnson.jpg'

const LandingPage = () => {

    const webhook = import.meta.env.VITE_WEBHOOK_URL;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        industry: '',
        message: '',
        from: 'Voxa'
    });
    const [submitStatus, setSubmitStatus] = useState({
        loading: false,
        success: false,
        error: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus({ loading: true, success: false, error: null });

        /* console.log('Submitting form with data:', formData);
        console.log('Submitting to webhook URL:', webhook); */
        try {
            const response = await fetch(webhook, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            /* console.log('Response status:', response.status);
            const responseData = await response.text();
            console.log('Response data:', responseData); */

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
            setSubmitStatus({ loading: false, success: true, error: null });
            setFormData({
                name: '',
                email: '',
                industry: '',
                message: '',
                from: 'Voxa'
            });
            /* alert('Thank you for your message! I will get back to you soon.'); */
            toast.success('Thank you for your message! I will get back to you soon.', {
                duration: 3000,
                position: 'top-right',
                style: {
                    background: '#10B981',
                    color: '#fff',
                    borderRadius: '8px',
                },
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus({ loading: false, success: false, error: 'Failed to submit form. Please try again later.' });
            /* alert('Sorry there was an error submitting your message. Please try again later.'); */
            toast.success('Sorry there was an error submitting your message. Please try again later.', {
                duration: 3000,
                position: 'top-right',
                style: {
                    background: '#EF4444',
                    color: '#fff',
                    borderRadius: '8px',
                },
            });
        }
    };

    const handleCTAClick = (e) => {
        e.preventDefault();
        const pricingSection = document.querySelector('.cta-section');
        pricingSection?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="landing-page">
            <Toaster />
            
            {/* Hero Section */}
            <section
                className="hero-section"
                style={{ backgroundImage: `url(${Landingpageimage})` }}
            >
                <div className="hero-navbar">
                    <Navbar />
                </div>   
                <div className="landing-page-hero">
                    <div className="overlay"></div>
                    <div className="hero-container">
                        <div className="hero-content">
                            <h1 className="hero-title">
                                <span className="highlight">Traditional</span> Marketing <br /> is SLOOOOW
                            </h1>
                            {/* <p className="hero-subtitle">
                            Voxa helps you reach more clients, book more meetings, and close more deals every month—without the grind of outdated strategies.
                            </p> */}
                            <div className="hero-buttons">
                                <button className="btn-primary" onClick={handleCTAClick}>Get Started</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="trust-section">
                <div className="trust-container">
                    <p className="trust-text">TRUSTED BY GROWING BUSINESSES</p>
                    <div className="trust-stats">
                        <strong>Over 200+ SMBs use VoXa to find quality leads</strong>
                    </div>

                    <div className="logos-wrapper">
                        <div className="logos-slide">
                            <div className="logo-item">ACME Inc.</div>
                            <div className="logo-item">TechFlow</div>
                            <div className="logo-item">GrowthHub</div>
                            <div className="logo-item">Voltemad Wineries</div>
                            <div className="logo-item">Jerry & Co Contractors</div>
                            <div className="logo-item">Quantum</div>
                            <div className="logo-item">Elevate</div>
                            <div className="logo-item">ConnectPlus</div>
                            <div className="logo-item">GrowthCorp</div>
                        </div>
                        {/* duplicate for infinite scroll effect */}
                        <div className="logos-slide">
                            <div className="logo-item">ACME Inc.</div>
                            <div className="logo-item">TechFlow</div>
                            <div className="logo-item">GrowthHub</div>
                            <div className="logo-item">Voltemad Wineries</div>
                            <div className="logo-item">Jerry & Co Contractors</div>
                            <div className="logo-item">Quantum</div>
                            <div className="logo-item">Elevate</div>
                            <div className="logo-item">ConnectPlus</div>
                            <div className="logo-item">GrowthCorp</div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Services Section */}
            <section className="services-section">
                <div className="services-container">
                    <h2 className="services-title">Our Services</h2>
                    <p className="services-subtitle">
                        Discover how Voxa can transform your lead generation and outreach process with our comprehensive suite of tools.
                    </p>
                    
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">
                                <Search size={32} />
                            </div>
                            <h3>Lead Discovery</h3>
                            <p>Find qualified leads that match your ideal customer profile using our AI-powered search engine.</p>
                            <a href="#" className="learn-more">Learn more →</a>
                        </div>
                        
                        <div className="service-card">
                            <div className="service-icon">
                                <Mail size={32} />
                            </div>
                            <h3>Automated Outreach</h3>
                            <p>Create personalized email sequences and engage prospects and drive responses.</p>
                            <a href="#" className="learn-more">Learn more →</a>
                        </div>
                        
                        <div className="service-card">
                            <div className="service-icon">
                                <BarChart3 size={32} />
                            </div>
                            <h3>Pipeline Analytics</h3>
                            <p>Track performance metrics and optimize your outreach strategy with data-driven insights.</p>
                            <a href="#" className="learn-more">Learn more →</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="testimonials-container">
                    <h2 className="testimonials-title">What Our Clients Say</h2>
                    <p className="testimonials-subtitle">
                        Real feedback from businesses using VoXa to automate their growth.
                    </p>

                    <div className="testimonials-grid">

                        <div className="testimonial-card">
                            <div className="testimonial-header">
                                <img src={Sarah} alt="Sarah Chen" className="author-avatar" />
                                <div className="author-info">
                                    <strong>Sarah Chen</strong>
                                    <span>@ConnectSphere • CEO</span>
                                </div>
                            </div>
                            <p className="testimonial-text">
                                “Before VoXa, our team spent more time chasing leads than talking to customers.
                                Now it’s the other way around. We’re having more meaningful sales conversations and closing deals faster.”
                            </p>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-header">
                                <img src={David} alt="David Sterling" className="author-avatar" />
                                <div className="author-info">
                                    <strong>David Sterling</strong>
                                    <span>@SterlingWealth • Managing Partner</span>
                                </div>
                            </div>
                            <p className="testimonial-text">
                                “I wasn’t sure an AI system could handle the kind of personal outreach our firm needs,
                                but VoXa proved me wrong. It sounds natural, keeps our tone, and saves us hours every week.”
                            </p>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-header">
                                <img src={Maria} alt="Maria Rodriguez" className="author-avatar" />
                                <div className="author-info">
                                    <strong>Maria Rodriguez</strong>
                                    <span>@ApexRealty • Principal Broker</span>
                                </div>
                            </div>
                            <p className="testimonial-text">
                                “Real estate moves fast, and VoXa helps us keep up. It reaches out to new leads the moment they show interest —
                                we’ve definitely seen an improvement in how quickly we connect with clients.”
                            </p>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-header">
                                <img src={Ben} alt="Ben Carter" className="author-avatar" />
                                <div className="author-info">
                                    <strong>Ben Carter</strong>
                                    <span>@PixelateAgency • Founder</span>
                                </div>
                            </div>
                            <p className="testimonial-text">
                                “We started using VoXa to handle early-stage outreach for a few clients,
                                and it’s been surprisingly effective. It freed up our team to focus on creative work without missing new opportunities.”
                            </p>
                        </div>

                        <div className="testimonial-card">
                            <div className="testimonial-header">
                                <img src={Mark} alt="Mark Johnson" className="author-avatar" />
                                <div className="author-info">
                                    <strong>Mark Johnson</strong>
                                    <span>@TitanSupply • VP of Sales</span>
                                </div>
                            </div>
                            <p className="testimonial-text">
                                “Our market is small and competitive, so finding the right contacts matters.
                                VoXa helped us start conversations with the people who actually make decisions — that alone has been a big win.”
                            </p>
                        </div>

                    </div>
                </div>
            </section>


            {/* Pricing Section */}
            <section className="pricing-section" id="pricing">
                {/* <div className="pricing-container">
                    <h2 className="pricing-title">Find the perfect plan for your business</h2>
                    <p className="pricing-subtitle">
                    Choose the plan that’s right for your business
                    </p>
                    <div className="pricing-grid">
                    <div className="pricing-card">
                        <h3>Basic</h3>
                        <p className="price">$99 <span>/month</span></p>
                        <ul>
                        <li>✔ Lead Generation</li>
                        <li>✔ AI Marketing</li>
                        <li>✔ Email Automation</li>
                        </ul>
                        <button className="btn-secondary">Get Started</button>
                    </div>

                    <div className="pricing-card popular">
                        <div className="badge">Most Popular</div>
                        <h3>Pro</h3>
                        <p className="price">$299 <span>/month</span></p>
                        <ul>
                        <li>✔ Everything in Basic</li>
                        <li>✔ Dedicated Support</li>
                        <li>✔ Advanced Analytics</li>
                        </ul>
                        <button className="btn-primary">Get Started</button>
                    </div>

                    <div className="pricing-card">
                        <h3>Enterprise</h3>
                        <p className="price">Custom</p>
                        <ul>
                        <li>✔ Everything in Pro</li>
                        <li>✔ Custom Integrations</li>
                        <li>✔ Personalized Solutions</li>
                        </ul>
                        <button className="btn-secondary">Contact Us</button>
                    </div>
                    </div>
                </div> */}
            </section>
            

            {/* FAQ Section */}
            {/* <section className="faq-section">
            <div className="faq-container">
                <h2 className="faq-title">Frequently Asked Questions</h2>

                <div className="faq-item">
                <button className="faq-question">What is the difference between the plans?</button>
                <div className="faq-answer">
                    <p>
                    The Basic plan is designed for startups, offering lead generation and AI marketing tools.  
                    The Pro plan is for growing businesses, with added support and analytics.  
                    The Enterprise plan is for large organizations with tailored solutions.
                    </p>
                </div>
                </div>

                <div className="faq-item">
                <button className="faq-question">Can I upgrade or downgrade my plan?</button>
                <div className="faq-answer">
                    <p>Yes, you can change your plan anytime inside your account settings.</p>
                </div>
                </div>

                <div className="faq-item">
                <button className="faq-question">What payment methods do you accept?</button>
                <div className="faq-answer">
                    <p>We accept all major credit cards, PayPal, and wire transfers for Enterprise customers.</p>
                </div>
                </div>
            </div>
            </section> */}
            <FAQSection />


            {/* CTA Section */}
            <section className="cta-section" id="contact">
                <h4 className="contact-heading">Get in touch</h4>
                <div className="contact-wrapper">
                    {/* Left Side - Info Card */}
                    <div className="contact-info">
                        <p className="contact-text">
                            We'd love to hear from you. Reach out through any of the channels below or send us a quick message.
                        </p>

                        <div className="info-item">
                            <i className="fa-solid fa-envelope info-icon"></i>
                            <div>
                                <strong>Email Us</strong>
                            <p>hello@voxa.ai</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <i className="fa-solid fa-phone info-icon"></i>
                            <div>
                                <strong>Call Us</strong>
                                <p>+254 712 345 678</p>
                            </div>
                        </div>

                        <div className="social-links">
                            <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
                            <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                            <a href="#"><i className="fa-brands fa-instagram"></i></a>
                        </div>
                    </div>

                    {/* Right Side - Message Form */}
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <h3 className="form-heading">Send us a message</h3>
                        <div className="form-row">
                            <input type="text" name='name' placeholder="Name *" required value={formData.name} onChange={handleInputChange}/>
                            <input type="email" name='email' placeholder="Email *" required value={formData.email} onChange={handleInputChange}/>
                        </div>
                        <div className="form-row">
                            <input type="text" name='industry' placeholder="Industry *" required value={formData.industry} onChange={handleInputChange}/>
                        </div>
                        <textarea name='message' onChange={handleInputChange} placeholder="Message (optional)" rows="4" value={formData.message}></textarea>
                        <button type="submit" className="send-btn" disabled={submitStatus.loading}>{submitStatus.loading? 'Sending...':'Send'}</button>
                    </form>
                </div>
            </section>



            {/* Footer */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <div className="footer-brand">
                                <h3>🗲 Voxa</h3>
                                <p>Helping small to medium sized businesses find better leads and grow through effective outreach.</p>
                                <div className="social-links">
                                    <a href="#" className="social-link">📘</a>
                                    <a href="#" className="social-link">🐦</a>
                                    <a href="#" className="social-link">💼</a>
                                    <a href="#" className="social-link">📺</a>
                                </div>
                            </div>
                        </div>
                        
                        <div className="footer-section">
                            {/* <h4>Company</h4> */}
                            <ul>
                                {/* <li><a href="#">About Us</a></li> */}
                                {/* <li><a href="#">Careers</a></li> */}
                                {/* <li><a href="#">Blog</a></li> */}
                                {/* <li><a href="#">Press</a></li> */}
                            </ul>
                        </div>
                        
                        {/* <div className="footer-section">
                            <h4>Product</h4>
                            <ul>
                                <li><a href="#">Features</a></li>
                                <li><a href="#">Pricing</a></li>
                            </ul>
                        </div> */}
                        
                        <div className="footer-section">
                            <h4>Resources</h4>
                            <ul>
                                {/* <li><a href="#">Help Center</a></li> */}
                                {/* <li><a href="#">Documentation</a></li> */}
                                {/* <li><a href="#">Webinars</a></li> */}
                                <li><a href="#">Contact Support</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} Voxa. All rights reserved.</p>
                        {/* <div className="footer-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Security</a>
                        </div> */}
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;