import { useRef, useEffect, useState } from "react";
import Telephone from "../assets/telefon.png";
import '../styles/InfoSection.css';

interface InfoSectionProps {
  onOpenModal: () => void; // Принимаем функцию открытия модалки
}

const InfoSection = ({ onOpenModal }: InfoSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      });
    };

    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`info-section ${animate ? "animate slide-up" : ""}`}
    >
      <div className="info-container">
        <div className="info-image-container">
          <img src={Telephone} alt="Информация" className="info-image" />
        </div>
        <div className="info-text-container">
          <h2 className="info-title">Свяжитесь с нами для подбора АВТО</h2>
          <p className="info-description">
            С персональной консультацией менеджера
          </p>
          <button className="info-button" onClick={onOpenModal}>
            Связаться
          </button>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
