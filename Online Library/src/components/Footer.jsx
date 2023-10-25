import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Books for all</p>
      </div>
    </footer>
  );
};

export default Footer;
