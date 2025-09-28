import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Logo from '../../assets/Voxa Logo.png';
import "./Navbar.css";

const Navbar = () => {

  const handlePricingClick = (e) => {
    e.preventDefault();
    const pricingSection = document.querySelector('.pricing-section');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('.cta-section');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <a href="/">
        <img src={Logo} alt="Voxa Logo" className="logo" />
      </a>
      
      <div className='nav-links'>
        <a href="/" className="nav-link" >Home</a>
        <a href="/#pricing" className="nav-link" onClick={handlePricingClick}>Pricing</a>
        <a href="/#contact" className="nav-link" onClick={handleContactClick}>Contact</a>
        <div className="get-started-button">
          <a href="/dashboard" className="nav-link">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
