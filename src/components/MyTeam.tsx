import { useEffect, useRef, useState } from "react";
import "../styles/MyTeam.css";
import MyTeam from "../assets/team.png";

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);

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
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="managers"
      ref={sectionRef}
      className={`team-section-wrapper ${animate ? "animate slide-up" : ""}`}
    >
      <div className="team-header">
        <h2 className="team-title">Наша команда</h2>
        <p className="team-subtitle">Более 150 человек работают в 4-х странах</p>
      </div>
      <section className="team-section">
        <div className="team-content">
          <p className="team-description">
            Наша команда состоит из более чем 150 экспертов, каждый из которых является профессионалом в своей области. Мы гордимся тем, что можем предоставить широкий спектр услуг для покрытия всех сложностей, связанных с импортом автомобилей. Наша команда объединяет специалистов из различных отделов, включая транспортный, юридический, логистический и многие другие. Мы работаем вместе, чтобы обеспечить нашим клиентам быстрое и эффективное решение любых проблем, связанных с импортом авто.
          </p>
        </div>
        <div className="team-image-container">
          <img src={MyTeam} alt="Наша команда" className="team-image" />
        </div>
      </section>
    </section>
  );
};

export default TeamSection;
