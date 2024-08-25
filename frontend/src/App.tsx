import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Index from "./pages/Index";
import BathroomShow from "./pages/BathroomShow";
import NewBathroomForm from "./pages/NewBathroomForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bathrooms" element={<Index />} />
          <Route path="/bathrooms/:id" element={<BathroomShow />} />
          <Route path="/bathrooms/new" element={<NewBathroomForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
