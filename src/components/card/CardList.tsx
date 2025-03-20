import "../../styles/CardList.css";
import engineIcon from "../../assets/CarCard/engin.svg";
import roadIcon from "../../assets/CarCard/road.svg";
import driveIcon from "../../assets/CarCard/privod.svg";

// Интерфейс для объекта автомобиля
interface Car {
  name: string;
  modelYear: string;
  engine: string;
  drive: string;
  mileage: string;
  price: number;
  image: string;
}

// Интерфейс пропсов для компонента CarCard
interface CarCardProps {
  car: Car;
  onOpenModal: () => void; // Теперь без передачи данных
}

function CarCard({ car, onOpenModal }: CarCardProps) {
  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} className="car-card__image" />

      {/* Блок с информацией */}
      <div className="car-card__info">
        <h3 className="car-card__name">{car.name}</h3>
        <p className="car-card__subname">{car.modelYear}</p>

        <div className="car-card__specs">
          <span className="car-card__spec">
            <img src={engineIcon} alt="Engine" className="img_card" />
            {car.engine}
          </span>
          <span className="car-card__spec">
            <img src={roadIcon} alt="Road" className="img_card" />
            {car.drive}
          </span>
          <span className="car-card__spec">
            <img src={driveIcon} alt="Mileage" className="img_card" />
            {car.mileage}
          </span>
        </div>

        <div className="car-card__price-row">
          <span className="car-card__price-label">Цена в США:</span>
          <span className="car-card__price-value">{car.price} млн ₸</span>
        </div>

        {/* Кнопка вызывает модальное окно без передачи данных */}
        <button className="car-card__button" onClick={onOpenModal}>Узнать цену под ключ</button>
      </div>
    </div>
  );
}

export default CarCard;
