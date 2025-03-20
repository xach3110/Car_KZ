import ReactDOM from "react-dom";
import "../styles/VideoModal.css";

interface VideoModalProps {
  video: {
    title: string;
    videoId: string;
    thumbnail: string;
    city: string;
  } | null;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  // Если видео не выбрано, не рендерим модальное окно
  if (!video) return null;

  console.log("VideoModal. Видео:", video.videoId);

  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => {
        // Закрываем окно, если кликнули на overlay (не внутри модального контента)
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          console.log("Клик внутри модального окна");
          e.stopPropagation();
        }}
      >
        <button
          className="modal-close"
          onClick={() => {
            console.log("Нажата кнопка закрытия модального окна");
            onClose();
          }}
        >
          &times;
        </button>
        <div className="iframe-container">
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>,
    document.body
  );
}
