
import  { useEffect } from "react";
import { useLocation } from "react-router-dom";
import StarRating from "../components/Estrellas";
import "./DetallesPro.css";

const DetallesPro = () => {
  const location = useLocation();
  const productDetails = location.state?.productDetails;

  useEffect(() => {
    if (
      productDetails &&
      productDetails.Imagenes &&
      productDetails.Imagenes.$values.length > 0
    ) {
      // Inicializar el carrusel de Bootstrap
      const carousel = new bootstrap.Carousel(document.getElementById("imageCarousel"), {
        interval: 5000, // No cambia automáticamente las imágenes
      });
    }
  }, [productDetails]);

  if (!productDetails) {
    return <div>No se encontraron detalles del producto.</div>;
  }

  const { Title, Description, Price, DiscountPercentage, Rating, Category, Imagenes } = productDetails;

  return (
    <div className="product-detail-container">
      <div className="row">
        <div className="col-md-6">
          {Imagenes && Imagenes.$values.length > 0 ? (
            <div id="imageCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                {Imagenes.$values.map((image, index) => (
                  <div key={image.ImageID} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                    <img src={image.ImageUrl} alt={`Imagen ${image.ImageID}`} className="d-block w-100" />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#imageCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#imageCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>
          ) : (
            <div>No hay imágenes disponibles</div>
          )}
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">{Title}</h2>
              <h4 className="discount-text">- {DiscountPercentage}% de descuento</h4>
              <p className="card-text">{Description}</p>
              <p className="card-text">Precio: ${Price}</p>
              <p className="card-text">Categoría: {Category}</p>
              <StarRating rating={Rating} />
              <button className="btn btn-pink">
                🛒 Comprar
              </button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesPro;
 