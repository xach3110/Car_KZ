import { useRef, useEffect, useState } from "react";
import "../styles/HowWeWork.css";

const stepsData = [
  {
    title: "Консультация и подбор",
    text: "Наши эксперты свяжутся с Вами для уточнения всех деталей. Подбираем и просчитываем лучшие варианты."
  },
  {
    title: "Проверка и расчет стоимости ремонта",
    text: "Проверяем авто на скрытые дефекты. Точно определяем стоимость ремонта авто."
  },
  {
    title: "Договор и аукцион",
    text: "Все официально! Юридическое Вы полностью защищены. Играем лоты в рамках бюджета, строго под Вашим контролем."
  },
  {
    title: "Оплата и страхование",
    text: "Помогаем оплатить выигранный авто через банк США. Страхуем автомобиль для полной безопасности от повреждений."
  },
  {
    title: "Доставка в порт и транспортировака",
    text: "Делаем полный фото-отчет Вашего автомобиля. Перевозим авто в Грузию по морю или воздуху и доставляем в Казахстан."
  },
  {
    title: "Растаможка и ремонт",
    text: "Помогаем с таможенным оформлением и восстановлением авто до гарантийного состояния."
  },
  {
    title: "Выдача авто",
    text: "Вы получаете авто Вашей мечты а мы довольного клиента и рекомендации."
  }
];

export default function HowWeWork() {
  const [progressHeight, setProgressHeight] = useState(0);
  const [activeSteps, setActiveSteps] = useState<boolean[]>(Array(stepsData.length).fill(false));
  const [animate, setAnimate] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    function handleScroll() {
      if (!stepsContainerRef.current) return;

      const container = stepsContainerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      
      // Рассчитываем видимую часть контейнера
      let progressPx = window.innerHeight - containerRect.top;
      progressPx = Math.max(0, Math.min(progressPx, containerHeight));
      const fillPercent = (progressPx / containerHeight) * 100;
      setProgressHeight(fillPercent);

      // Вычисляем активность шагов
      const newActiveSteps = stepsData.map((_, index) => {
        const stepElement = stepRefs.current[index];
        if (stepElement) {
          const stepRect = stepElement.getBoundingClientRect();
          // Центр шага относительно контейнера
          const stepCenter = ((stepRect.top + stepRect.bottom) / 2) - containerRect.top;
          const isActive = progressPx >= stepCenter;
          return isActive;
        }
        return false;
      });
      setActiveSteps(newActiveSteps);
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Добавляем эффект выезда для всей секции при появлении в зоне видимости
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
    <section ref={sectionRef} className={`how-we-work ${animate ? "animate slide-up" : ""}`}>
      <h2 className="hww-title">Как мы работаем</h2>
      <p className="hww-subtitle">
        Полное сопровождение от подбора до постановки на учёт
      </p>

      <div className="hww-container">
        <div className="hww-left">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ZsJg1yl7EpE"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="hww-video"
          ></iframe>

          <p className="hww-description">
            Мы заботимся о каждой детали, чтобы вы могли купить авто из США с минимальными затратами времени и усилий.
          </p>
          <p className="hww-description">
            Мы делаем фото-отчеты, отслеживаем авто по трекеру, страхуем его на старте, следим за крепежами и делаем обрешетку.
          </p>
          <p className="hww-description">
            У нас есть быстрая доставка и персональный менеджер, готовый помочь вам 24/7.
          </p>
        </div>

        <div className="hww-right" ref={stepsContainerRef}>
          <div className="timeline">
            <div className="timeline-line" />
            <div
              className="timeline-progress"
              style={{ height: `${progressHeight}%` }}
            />
          </div>

          <div className="steps">
            {stepsData.map((step, index) => (
              <div
                className={`step ${activeSteps[index] ? "active" : ""}`}
                key={index}
                ref={(el: HTMLDivElement | null) => {
                  if (el) {
                    stepRefs.current[index] = el;
                  }
                }}
              >
                <h3 className="step-title">{step.title}</h3>
                <p className="step-text">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
