import { useState, useEffect, useRef } from "react";
import "../styles/CarFirst.css";
import SlidingModal from "./SlidingModal";

// Импорт изображений
import CarFirst_1 from "../assets/CarFirst/car_first1.png";
import CarFirst_2 from "../assets/CarFirst/car_first2.png";
import CarFirst_3 from "../assets/CarFirst/car_first3.png";

// Компонент-счётчик, который анимированно считает от 0 до target за 3 секунды
const CountUp: React.FC<{ target: number; suffix?: string }> = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 3000; // общая длительность анимации (3 секунды)
    const intervalTime = 30; // интервал обновления (30 мс)
    const steps = duration / intervalTime;
    const increment = target / steps;
    let current = 0;
    const intervalId = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(intervalId);
      }
      setCount(Math.floor(current));
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [target]);

  return <span>{count}{suffix}</span>;
};

export default function CarBanner() {
  const images = [CarFirst_1, CarFirst_2, CarFirst_3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Анимация появления при входе в область видимости
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
    
    if (bannerRef.current) {
      const rect = bannerRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setAnimate(true);
      } else {
        observer.observe(bannerRef.current);
      }
    }
  
    return () => observer.disconnect();
  }, []);

  // Автоматическое переключение слайдов каждые 4 секунды
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 1500);
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <section ref={bannerRef} className={`car-banner ${animate ? "animate slide-up" : ""}`}>
      {/* Левый столбец: Текст и кнопка */}
      <div className="banner-left">
        <h1>
          Доставляем <br /> <span>АВТО из США</span>
        </h1>
        <p>
          С <strong>выгодой до 37%</strong> и гарантией цены{" "}
          <strong>под ключ</strong> в Казахстан
        </p>
        <button className="banner-button" onClick={() => setModalOpen(true)}>
          Подобрать автомобиль
        </button>

        {/* Статистика с анимированными числами */}
        <div className="stats">
          <div>
            <h3><CountUp target={2} /></h3>
            <p>Года на рынке</p>
          </div>
          <div>
            <h3><CountUp target={500} suffix="+" /></h3>
            <p>Привезли авто</p>
          </div>
          <div>
            <h3><CountUp target={153} /></h3>
            <p>Специалиста</p>
          </div>
        </div>
      </div>

      {/* Правый столбец: Контейнер для изображения с фиксированной высотой */}
      <div className="banner-right">
        <div className="image-container">
          <img src={images[currentSlide]} alt="Car" className="car-image" />

          {/* Пагинация – позиционируется абсолютно относительно image-container */}
          <div className="slider-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <SlidingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
