import { useState, useEffect, useRef } from "react";
import CarCard from "./card/CardList";
import SlidingModal from "./SlidingModal";

import bmwX5 from "../assets/CarList/bmw-x5-front-view.jpg";
import audi_q7 from "../assets/CarList/audi_q7.png";
import GLE from "../assets/CarList/Mers_GLE.jpg";
import Volvo from "../assets/CarList/volvo-xc90-front.jpg";
import Lexus from "../assets/CarList/driven-lexus-rx350-square640.jpg";
import Jaguar from "../assets/CarList/eeabff43f6c9d0f35ea4e456c15175e6.jpg.jpg";
import Kaen from "../assets/CarList/Kaen.jpg";
import Discovery from "../assets/CarList/discovery.jpg";
import Infinity from "../assets/CarList/preview-928x522.jpg";
import Akura from "../assets/CarList/0x0.png";
import XT5 from "../assets/CarList/xt5.png";
import ModelX from "../assets/CarList/modelx.jpg";

function CarList() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const cars = [
    {
      name: "BMW X5",
      modelYear: "sDrive40i 2023",
      engine: "3.0L",
      drive: "RWD",
      mileage: "40 т. м.",
      price: 21.9,
      image: bmwX5,
    },
    {
      name: "Audi Q7",
      modelYear: "Quattro 2022",
      engine: "3.0L",
      drive: "AWD",
      mileage: "35 т. м.",
      price: 20.5,
      image: audi_q7,
    },
    {
      name: "Mercedes-Benz GLE",
      modelYear: "GLE 450 2022",
      engine: "3.0L",
      drive: "AWD",
      mileage: "30 т. м.",
      price: 25.0,
      image: GLE,
    },
    {
      name: "Volvo XC90",
      modelYear: "T8 2023",
      engine: "2.0L",
      drive: "AWD",
      mileage: "25 т. м.",
      price: 23.5,
      image: Volvo,
    },
    {
      name: "Lexus RX 350",
      modelYear: "2021",
      engine: "3.5L",
      drive: "FWD",
      mileage: "45 т. м.",
      price: 19.8,
      image: Lexus,
    },
    {
      name: "Jaguar F-Pace",
      modelYear: "2022",
      engine: "2.0L",
      drive: "AWD",
      mileage: "28 т. м.",
      price: 22.0,
      image: Jaguar,
    },
    {
      name: "Porsche Cayenne",
      modelYear: "2023",
      engine: "3.0L",
      drive: "AWD",
      mileage: "20 т. м.",
      price: 27.5,
      image: Kaen,
    },
    {
      name: "Land Rover Discovery",
      modelYear: "2022",
      engine: "3.0L",
      drive: "AWD",
      mileage: "33 т. м.",
      price: 24.3,
      image: Discovery,
    },
    {
      name: "Infiniti QX60",
      modelYear: "2021",
      engine: "3.5L",
      drive: "FWD",
      mileage: "38 т. м.",
      price: 18.7,
      image: Infinity,
    },
    {
      name: "Acura MDX",
      modelYear: "2022",
      engine: "3.5L",
      drive: "FWD",
      mileage: "36 т. м.",
      price: 20.9,
      image: Akura,
    },
    {
      name: "Cadillac XT5",
      modelYear: "2023",
      engine: "3.6L",
      drive: "FWD",
      mileage: "32 т. м.",
      price: 19.5,
      image: XT5,
    },
    {
      name: "Tesla Model X",
      modelYear: "2022",
      engine: "Electric",
      drive: "AWD",
      mileage: "15 т. м.",
      price: 30.0,
      image: ModelX,
    },
  ];

  // Используем IntersectionObserver для добавления анимации при появлении
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
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`car-list-container ${animate ? "animate slide-up" : ""}`}
      style={{ display: "flex", flexWrap: "wrap", margin: 0, paddingTop: 60, paddingBottom: 30 }}
    >
      {/* Заголовок на всю ширину, текст по центру */}
      <h2
        style={{
          fontSize: "32px",
          color: "#fff",
          marginBottom: "8px",
          width: "100%",
          textAlign: "center",
          textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
        }}
      >
        Проверенные авто из США
      </h2>
      <p
        className="hww-subtitle"
        style={{ textAlign: "center", width: "100%" }}
      >
        С гарантией цены под ключ
      </p>
      <div className="space"></div>
      {/* Список карточек */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {cars.map((car, index) => (
          <CarCard key={index} car={car} onOpenModal={() => setModalOpen(true)} />
        ))}
      </div>
      <div style={{ width: "100%", textAlign: "center", marginTop: "50px", marginBottom: "50px" }}>
        <button className="car-button" onClick={() => setModalOpen(true)}>
          Подобрать автомобиль
        </button>
      </div>
      <SlidingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default CarList;
