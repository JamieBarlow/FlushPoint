import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Index from "./pages/Index";
import BathroomShow from "./pages/BathroomShow";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bathrooms" element={<Index />} />
          <Route path="/bathrooms/:id" element={<BathroomShow />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
