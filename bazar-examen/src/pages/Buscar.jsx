import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Buscar.css"; // Importa tu archivo CSS aquí

const Buscar = () => {
  const [productName, setProductName] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    fetch(`https://www.bazarexamen.somee.com/api/Producto/items?name=${productName}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        navigate("/items", {
          state: { searchResults: data, searchTerm: productName },
        });
      })
      .catch((error) => {
        console.error("Error al buscar productos:", error);
      });
  }; 

  const handleButtonClick = () => {
    setButtonClicked(true);
    // Puedes agregar otras lógicas relacionadas con el clic del botón aquí si es necesario
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <img
            src="https://i.pinimg.com/564x/a0/54/ff/a054ff84e54d38b388e4407f6201037c.jpg"
            alt="Imagen encima del buscador"
            className="image-above-search"
          />
          <p className="text-below-image">Bazar|Adriana</p>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="¿Qué buscas?"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <button
              className={`btn btn-search ${buttonClicked ? 'btn-clicked' : ''}`}
              type="button"
              onClick={() => {
                handleButtonClick();
                handleSearch();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buscar;

