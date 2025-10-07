import Navbar from "../components/Navbar/Navbar";
import { Search, Mail, BarChart3, Star, Users, TrendingUp, Target } from 'lucide-react';
import Boredperson from '../assets/bored person.png';
import Landingpageimage from '../assets/Heroimage.jpg';
/* import Landingpageimage from '../assets/Landingpage.png'; */
import '../styles/landingpage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            
            
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
                            <p className="hero-subtitle">
                            Voxa helps you reach more clients, book more meetings, and close more deals every month—without the grind of outdated strategies.
                            </p>
                            <div className="hero-buttons">
                                <button className="btn-primary">Get Started</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="trust-section">
                <p className="trust-text">TRUSTED BY GROWING BUSINESSES</p>
                <div className="trust-stats">
                    <strong>Over 200+ SMBs use Voxa to find quality leads</strong>
                </div>
                <div className="company-logos">
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
                        Don't just take our word for it. See what other businesses have achieved with Voxa.
                    </p>
                    
                    <div className="testimonials-grid">
                        <div className="testimonial-card">
                            <p className="testimonial-text">
                                "Voxa transformed our lead generation process. We've seen a 3x increase in qualified leads and our sales team is closing deals faster than ever before."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">JD</div>
                                <div className="author-info">
                                    <strong>Jane Doe</strong>
                                    <span>Director of Marketing, GrowthCorp</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="testimonial-card">
                            <p className="testimonial-text">
                                "The automated outreach features saved our team countless hours. The personalization capabilities are impressive and have significantly improved our response rates."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">MS</div>
                                <div className="author-info">
                                    <strong>Michael Smith</strong>
                                    <span>Sales Manager, ConnectPlus</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="testimonial-card">
                            <p className="testimonial-text">
                                "As a small business, finding the right leads was always challenging. Voxa's platform made it simple to identify and connect with our ideal customers."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">AL</div>
                                <div className="author-info">
                                    <strong>Amanda Lee</strong>
                                    <span>Founder, Evolve Solutions</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="testimonial-card">
                            <p className="testimonial-text">
                                "The analytics dashboard gives us clear visibility into our business performance. We can quickly adjust our strategy based on real data."
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">RJ</div>
                                <div className="author-info">
                                    <strong>Robert Johnson</strong>
                                    <span>CEO, Scaler Digital</span>
                                </div>
                            </div>
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
            <section className="faq-section">
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
            </section>


            {/* CTA Section */}
            <section className="cta-section" id="contact">
                <div className="cta-container">
                    <h2 className="cta-title">Ready to Fill Your Pipeline?</h2>
                    <p className="cta-subtitle">
                        Get started with Voxa today and discover how our platform can transform your marketing.
                        Fill in your details and we will respond to you ASAP!!!
                    </p>
                    <div className="cta-form">
                        <input 
                            type="email" 
                            placeholder="Enter your email"
                            className="email-input"
                        />
                        <button className="get-demo-btn">Contact me</button>
                    </div>
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
                        <p>&copy; 2025 Voxa. All rights reserved.</p>
                        <div className="footer-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Security</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;