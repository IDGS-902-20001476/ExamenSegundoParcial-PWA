
import  { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StarRating from "../components/Estrellas";
import "./Items.css";

const Items = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchResults = location.state?.searchResults || [];
  const searchTerm = location.state?.searchTerm;

  // Manejar clic en el recuadro
  const handleBoxClick = async (productId) => {
    try {
      // Realizar solicitud al API con el ID del producto
      const response = await fetch(
        `https://www.bazarexamen.somee.com/api/Producto/items/${productId}`
      );

      if (!response.ok) {
        throw new Error(`Error al obtener detalles del producto ${productId}`);
      }

      const productDetails = await response.json();
      console.log("Detalles del producto:", productDetails);
      // Navegar a la página ProductDetail con los detalles del producto
      navigate(`/item/${productId}`, { state: { productDetails } });
    } catch (error) {
      console.error(error.message);
    }
  }; 

  // Agregar un efecto para manejar el clic en el recuadro
  useEffect(() => {
    const boxElements = document.querySelectorAll(".product-box");

    boxElements.forEach((box) => {
      box.addEventListener("click", () => {
        // Obtener el ID del producto del atributo "data-product-id"
        const productId = box.getAttribute("data-product-id");
        handleBoxClick(productId);
      });
    });

    // Limpiar los event listeners al desmontar el componente
    return () => {
      boxElements.forEach((box) => {
        box.removeEventListener("click", handleBoxClick);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list-products-container">
      {/* Barra de búsqueda */}
      <div className="mb-3 d-flex justify-content-center">
        <input type="text" className="form-control" placeholder="Aún NO funciona" />
        <button className="btn btn-search ms-2">Buscar</button>
      </div>

      {/* Resultados de la búsqueda */}
      <h2 className="text-center mb-4 result-heading">Resultados de Búsqueda</h2>
      {searchTerm && (
        <p className="text-center search-term">
          Resultados de la búsqueda de: <strong>{searchTerm}</strong>
        </p>
      )}

      {/* Lista de productos */}
      <div className="row">
        {searchResults.map((product) => (
          <div
            key={product.productID}
            className="col-md-12 mb-4 product-box"
            data-product-id={product.productID}
          >
            <div className="box-content">
              <img
                src={product.thumbnailUrl}
                alt={product.title}
                className="box-img"
              />
              <div className="box-details">
                <h5 className="box-title">{product.title}</h5>
                <p className="box-text">{product.description}</p>
                <p className="box-text">
                  <strong>Precio:</strong> ${product.price}
                </p>
                <p className="box-text">
                  <strong>Categoria:</strong> {product.category}
                </p>
                <StarRating rating={product.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
