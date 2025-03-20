import { useEffect, useRef, useState } from "react";
import '../styles/PartnerSection.css'

import IAAI from '../assets/IAA.png'
import Copart from '../assets/Copart.png'
import Manheim from '../assets/manheim.svg'

const PartnersSection = () => {
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
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`partners-section ${animate ? "animate slide-up" : ""}`}
    >
      <div className="partners-header">
        <h2 className="partners-title">Официальные партнеры крупнейших аукционов США</h2>
        <p className="partners-subtitle">С региональным офисом в Алматы</p>
      </div>
      <div className="partners-container">
        <div className="partner-card partner-blue">
          <img src={IAAI} alt="IAAI" className="partner-logo small-logo" />
          <p>Copart - наиболее востребованный аукцион, где проводится более тысячи торгов ежедневно. Широкий ассортимент автомобилей, однако требуется тщательный подбор.</p>
        </div>
        <div className="partner-card partner-red">
          <img src={Copart} alt="Copart" className="partner-logo medium-logo" />
          <p>IAAI - Мы предлагаем широкий выбор автомобилей от страховых компаний, которые отличаются прозрачной историей и детальным описанием каждого лота.</p>
        </div>
        <div className="partner-card partner-orange">
          <img src={Manheim} alt="Manheim" className="partner-logo large-logo" />
          <p>Manheim - это аукцион, где каждый день проходят тысячи торгов на широкий выбор авто, включая целые и электромобили.</p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
