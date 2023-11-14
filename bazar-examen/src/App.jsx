
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Buscar from "./pages/Buscar";
import Items from "./pages/Items";
import DetallesPro from "./pages/DetallesPro";
import Error404 from "./pages/Error404";


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Buscar />} />
          <Route path="/items" element={<Items />} />
          <Route path="/item/:id" element={<DetallesPro />} />

          {<Route path="*" element={< Error404 />} />}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
