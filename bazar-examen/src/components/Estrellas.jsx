
import "./Estrellas.css";

// eslint-disable-next-line react/prop-types
const Estrellas = ({ rating }) => {
  // Redondear la calificación hacia abajo si los decimales son menos de 0.5
  const roundedRating = Math.floor(rating * 2) / 2; // Permitir medias estrellas

  // Crear un array de estrellas basado en la calificación
  const stars = Array.from({ length: 5 }, (_, index) => {
    const isHalfStar = index + 0.5 === roundedRating;
    return (
      <span
        key={index}
        className={`fa ${isHalfStar ? "fa-star-half-alt" : "fa-star"}${
          index < roundedRating ? " checked" : ""
        }`}
      ></span>
    );
  });

  return (
    <div className="star-rating">
      {stars}
      <p className="rating-text">{`(${rating})`}</p>
    </div>
  );
};

export default Estrellas;
