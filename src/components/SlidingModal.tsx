import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../styles/SlidingModal.css";

interface SlidingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlidingModal: React.FC<SlidingModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const botToken = "7877422434:AAHjowjGiF21-qENdDt_Fsiu_IOWANYQmw8";
  const chatId = "1039289071";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы

    const text = `📩 *Новая заявка!*\n\n👤 *Имя:* ${name}\n📞 *Телефон:* ${phone}\n💬 *Комментарий:* ${comment}`;

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
        setComment("");
        onClose(); // Закрываем модалку
      } else {
        alert("Ошибка при отправке. Попробуйте снова.");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка сети. Попробуйте снова.");
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Кнопка закрытия */}
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        {/* Заголовок */}
        <h2 className="label">Оставьте заявку</h2>
        <p className="label2">
          Для получения консультации по доставке авто из США в Казахстан под ключ
        </p>

        {/* Форма */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <textarea
            placeholder="Комментарий"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default SlidingModal;
