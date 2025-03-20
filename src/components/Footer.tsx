import "../styles/Footer.css";
import { Youtube, Instagram, Send, Facebook } from "lucide-react";
import Icon from "../assets/car_logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Логотип и бренд */}
        <div className="footer-brand">
          <img src={Icon} alt="GrandCar Logo" className="footer-logo" />
        </div>

        {/* Социальные сети */}
        <nav className="nav-links">
          <a href="https://www.youtube.com/@grandcar_kz" target="_blank" rel="noopener noreferrer">
            <Youtube size={27} color="#ffffff" className="social-icon" />
          </a>
          <a href="https://www.instagram.com/grandcar_kz/" target="_blank" rel="noopener noreferrer">
            <Instagram size={25} color="#ffffff" className="social-icon" />
          </a>
          <a href="https://t.me/+_dGF19X7AChjNGVi" target="_blank" rel="noopener noreferrer">
            <Send size={25} color="#ffffff" className="social-icon" />
          </a>
          <a href="https://www.facebook.com/grandcarkz" target="_blank" rel="noopener noreferrer">
            <Facebook size={25} color="#ffffff" className="social-icon" />
          </a>
        </nav>

        {/* Политика и контакты */}
        <div className="footer-info">
          <a href="#managers" className="footer-link">Наши менеджеры</a>
          <a href="https://grand-car.kz/politica/" className="footer-link">Политика конфиденциальности</a>
        </div>
      </div>

      {/* Копирайт */}
      <div className="footer-bottom">
        <p>© 2025 Все права защищены. БСН 22104-0074848</p>
      </div>
    </footer>
  );
};

export default Footer;
