import { useRef, useEffect, useState } from "react";
import "../styles/CalculatedCar.css";
import Man from "../assets/image_man.png";

export default function CalculationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const botToken = "7877422434:AAHjowjGiF21-qENdDt_Fsiu_IOWANYQmw8"; // Твой токен бота
  const chatId = "1039289071"; // Твой chat_id

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Останавливаем стандартное поведение формы

    const text = `📩 *Новая заявка на подбор авто!*\n\n👤 *Имя:* ${name}\n📞 *Телефон:* ${phone}`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: "Markdown",
          }),
        }
      );

      const data = await response.json();
      if (data.ok) {
        alert("Заявка отправлена!");
        setName("");
        setPhone("");
      } else {
        alert("Ошибка при отправке. Попробуйте снова.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка сети. Попробуйте снова.");
    }
  };

  // Добавляем эффект выезда при появлении секции
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
      className={`calc-section ${animate ? "animate slide-up" : ""}`}
    >
      {/* Верхняя часть: Заголовок слева, подзаголовок справа */}
      <div className="calc-header">
        <h2 className="calc-title">Подбор и просчет</h2>
        <p className="calc-subtitle">
          Оставьте заявку для получения подборки авто под ваш бюджет
        </p>
      </div>

      {/* Основной контейнер: Форма слева, картинка справа */}
      <div className="calc-container">
        <form className="calc-left" onSubmit={handleSubmit}>
          <label className="calc-label" htmlFor="name">
            Имя
          </label>
          <input
            id="name"
            type="text"
            className="calc-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="calc-label" htmlFor="phone">
            Телефон
          </label>
          <input
            id="phone"
            type="text"
            className="calc-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button type="submit" className="calc-button">
            Подобрать авто
          </button>
        </form>

        <div className="calc-right">
          <img src={Man} alt="Placeholder" className="calc-image" />
        </div>
      </div>
    </section>
  );
}
