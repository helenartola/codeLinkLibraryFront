import { useTheme } from "../../context/ThemeContext";
import "./Footer.css";

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? "dark" : "light"}>
      <footer className="footer">
        <p>2024 © Code Link Library</p>
      </footer>
    </div>
  );
};

export default Footer;
