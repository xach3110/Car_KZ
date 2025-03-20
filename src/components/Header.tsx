import { useState } from "react";
import { Menu, X, Youtube, Instagram, Send, Facebook } from "lucide-react";
import SlidingModal from "./SlidingModal";

import "../styles/Header.css";
import car_logo from "../assets/car_logo.png"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <img src={car_logo} alt="GrandCar Logo" className="header-logo" />
        </div>

        {/* Средний блок: Социальные сети */}
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

        {/* Правый блок: Номер телефона и кнопка */}
        <div className="header-right">
          <button className="car-button" onClick={() => setModalOpen(true)}>Подобрать автомобиль</button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="menu-button">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#"><Youtube size={20} /> YouTube</a>
          <a href="#"><Instagram size={20} /> Instagram</a>
          <a href="#"><Send size={20} /> Telegram</a>
          <a href="#"><Facebook size={20} /> Facebook</a>
        </div>
      )}
      <SlidingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
}
