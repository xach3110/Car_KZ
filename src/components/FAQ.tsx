import { useState, useEffect, useRef } from "react";
import "../styles/FAQ.css";

const faqData = [
  {
    question: "Может ли конечная стоимость автомобиля быть выше цены в договоре?",
    answer: "Мы понимаем, что для вас важна прозрачность вопроса стоимости автомобиля. Поэтому мы гарантируем фиксированную цену на автомобиль, которая указывается в договоре. Вы получаете предварительный точный расчет, в котором учитываются все затраты, и всё фиксируется в договоре. Вы не будете платить больше оговоренной суммы. Мы предлагаем честный и прозрачный подход в нашей работе.",
  },
  {
    question: "Как гарантируете отсутствие скрытых повреждений и того, что автомобиль не был утопленным?",
    answer: "Мы проверяем историю каждого автомобиля по базам данных и проводим тщательный осмотр на наличие скрытых повреждений.",
  },
  {
    question: "Как подобрать автомобиль без повреждений?",
    answer: "Мы предлагаем только проверенные автомобили с прозрачной историей. Также наши специалисты помогут подобрать авто с минимальными повреждениями или вовсе без них.",
  },
  {
    question: "Что значит авто под ключ у нас?",
    answer: "Это комплексная услуга, включающая подбор, покупку, транспортировку и оформление всех документов для клиента.",
  },
  {
    question: "Какие документы получают наши клиенты на автомобили из США?",
    answer: "Вы получаете полный пакет документов, включая таможенную декларацию, договор купли-продажи и транспортный сертификат.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");

  // Добавляем состояние анимации и ref для секции
  const sectionRef = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);

  const botToken = "7877422434:AAHjowjGiF21-qENdDt_Fsiu_IOWANYQmw8"; // Твой токен бота
  const chatId = "-4794025014"; // Твой chat_id

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const text = `❓ *Новый вопрос в FAQ!*\n\n👤 *Имя:* ${name}\n📞 *Телефон:* ${phone}\n💬 *Вопрос:* ${question}`;

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
        alert("Ваш вопрос отправлен!");
        setName("");
        setPhone("");
        setQuestion("");
      } else {
        alert("Ошибка при отправке. Попробуйте снова.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка сети. Попробуйте снова.");
    }
  };

  // IntersectionObserver для эффекта выезда FAQ
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
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`faq-section ${animate ? "animate slide-up" : ""}`}
    >
      <div className="partners-header">
        <h2 className="partners-title">Частые вопросы</h2>
        <p className="partners-subtitle">Наших клиентов</p>
      </div>
      <div className="faq-container">
        {/* Список вопросов */}
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "open" : ""}`}
            >
              <button className="faq-question" onClick={() => toggleQuestion(index)}>
                {item.question}
                <span className={`arrow ${openIndex === index ? "rotated" : ""}`}>
                  &#9662;
                </span>
              </button>
              <div className="faq-answer-wrapper">
                <div className="faq-answer-content">
                  <p className="faq-answer">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Форма для обратной связи */}
        <form className="faq-form" onSubmit={handleSubmit}>
          <p className="string">Напишите нам, если остались вопросы</p>
          <input
            type="text"
            placeholder="Имя"
            className="faq-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Телефон"
            className="faq-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <textarea
            placeholder="Ваш вопрос"
            className="faq-textarea"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <button type="submit" className="faq-submit">
            Отправить
          </button>
        </form>
      </div>
    </section>
  );
};

export default FAQSection;
