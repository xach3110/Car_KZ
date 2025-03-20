import { useState, useEffect, useRef } from "react";
import CarCard from "./card/CardList";

import bmwX5 from "../assets/CarList/bmw-x5-front-view.jpg";
import audi_q7 from "../assets/CarList/audi_q7.png";
import GLE from "../assets/CarList/Mers_GLE.jpg";
import Volvo from "../assets/CarList/volvo-xc90-front.jpg";

import SlidingModal from "./SlidingModal";

function CarList_delivered() {
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
  ];

  // Добавляем эффект выезда при появлении контейнера
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
      className={`car-list-delivered-container ${animate ? "animate slide-up" : ""}`}
      style={{ display: "flex", flexWrap: "wrap", margin: 0, paddingBottom: 50 }}
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
        Доставленные авто
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
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
          marginBottom: "50px",
          gap: "100px",
        }}
      >
        <button className="car-button" onClick={() => setModalOpen(true)}>
          Помощь в подборе авто
        </button>
        <button
          className="car-button-telegram"
          onClick={() => window.open("https://t.me/+904x-lj-zmk0OTEy", "_blank")}
        >
          Больше обзоров в Telegram
        </button>
      </div>
      <SlidingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default CarList_delivered;
