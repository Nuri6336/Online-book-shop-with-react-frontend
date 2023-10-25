import Navber from "../components/Navber";
import Footer from "../components/Footer";
import "../css/home.css";

function Home() {
  return (
    <div>
      <Navber />
      <div className="hero-container">
        <div className="hero"></div>
        <div className="hero-stuff">
          <h1 className="h1-home">Knowledge is power</h1>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
