import Navbar from "../components/Navbar/Navbar";
import '../styles/landingpage.css'

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Navbar />
            <div className="landing-container">
                <section>
                    <h1>Welcome to the Landing Page</h1>
                </section>
                <section>
                    <p>This is the landing page of the application.</p>
                </section>
            </div>
        </div>
    );
}
export default LandingPage;