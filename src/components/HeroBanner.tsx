import { useEffect, useRef, useState } from "react";
import "../styles/HeroBanner.css";
import BG from "../assets/BMW_background.jpg";

interface HeroBannerProps {
  direction?: "up" | "down";
  onOpenModal: () => void; // Принимаем функцию открытия модалки
}

function HeroBanner({ direction = "up", onOpenModal }: HeroBannerProps) {
  const [animate, setAnimate] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      });
    };

    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (bannerRef.current) observer.observe(bannerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={bannerRef} className={`hero-banner ${animate ? `animate slide-${direction}` : ""}`}>
      <img src={BG} alt="BMW X5 2024" className="hero-image" />
      <div className="hero-overlay">
        <h1 className="hero-title">BMW X5 2024</h1>
        <p className="hero-subtitle">Выгода до 10 млн т (разница рынком KZ)</p>
        <p className="hero-subtitle">Цена в США: от 20 млн т</p>
        
        {/* Кнопка вызывает глобальное модальное окно */}
        <button className="hero-button" onClick={onOpenModal}>Получить просчет</button>
      </div>
    </section>
  );
}

export default HeroBanner;
