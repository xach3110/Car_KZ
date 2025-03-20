import { useState, useEffect, useRef } from "react";
import "../styles/VideoReviews.css";

const videoData = [
  {
    title: "Kia Telluride 2022",
    thumbnail: "https://img.youtube.com/vi/vR4V3L_PHxE/hqdefault.jpg",
    videoId: "vR4V3L_PHxE",
    city: "Астана"
  },
  {
    title: "BMW X5 G05 2019",
    thumbnail: "https://img.youtube.com/vi/jbjTWnE0Cfc/hqdefault.jpg",
    videoId: "jbjTWnE0Cfc",
    city: "Алматы"
  },
  {
    title: "BMW X1 2023 из США",
    thumbnail: "https://img.youtube.com/vi/QJ9EgwvIibM/hqdefault.jpg",
    videoId: "QJ9EgwvIibM",
    city: "Маты"
  },
  {
    title: "BMW X5 PHEV 2024",
    thumbnail: "https://img.youtube.com/vi/afSuLHzFNQA/hqdefault.jpg",
    videoId: "afSuLHzFNQA",
    city: "Актобе"
  },
  {
    title: "Lexus GX 550 2024",
    thumbnail: "https://img.youtube.com/vi/nOJYqO3Atxo/hqdefault.jpg",
    videoId: "nOJYqO3Atxo",
    city: "Станай"
  },
  {
    title: "Subaru Outback 2023",
    thumbnail: "https://img.youtube.com/vi/rUtRHWhsnko/hqdefault.jpg",
    videoId: "rUtRHWhsnko",
    city: "Тобе"
  }
];

export default function VideoReviews() {
  // Состояние для анимации
  const [animate, setAnimate] = useState(false);
  // Ref для секции
  const sectionRef = useRef<HTMLElement>(null);

  // IntersectionObserver для эффекта выезда
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        console.log("IntersectionObserver entry:", {
          isIntersecting: entry.isIntersecting,
          boundingClientRect: entry.boundingClientRect
        });
        if (entry.isIntersecting) {
          console.log("Секция VideoReviews вошла в область видимости");
          setAnimate(true);
          observer.disconnect();
        }
      });
    };

    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (sectionRef.current) {
      console.log("Наблюдаем за секцией VideoReviews", sectionRef.current);
      observer.observe(sectionRef.current);
    } else {
      console.log("sectionRef.current is null");
    }

    return () => {
      console.log("Отключаем IntersectionObserver");
      observer.disconnect();
    };
  }, []);

  // Функция перехода на YouTube
  const openYouTube = (videoId: string) => {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    console.log("Переход по ссылке:", url);
    window.open(url, "_blank");
  };

  return (
    <>
      <section
        ref={sectionRef}
        className={`video-reviews ${animate ? "animate slide-up" : ""}`}
      >
        <h2 className="vr-title">Отзывы GrandCar</h2>
        <p className="vr-subtitle">96% клиентов нас рекомендуют</p>

        <div className="video-grid">
          {videoData.map((video, index) => (
            <div
              className="video-card"
              key={index}
              onClick={() => {
                console.log("Нажата карточка видео, videoId:", video.videoId);
                openYouTube(video.videoId);
              }}
            >
              <div
                className="video-thumbnail"
                style={{ backgroundImage: `url(${video.thumbnail})` }}
              >
                <div className="play-icon">&#9658;</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
