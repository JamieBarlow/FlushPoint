import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Index from "./pages/Index";
import BathroomShow from "./pages/BathroomShow";
import NewBathroomForm from "./pages/NewBathroomForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/bathrooms" element={<Index />} />
      <Route path="/bathrooms/:id" element={<BathroomShow />} />
      <Route path="/bathrooms/new" element={<NewBathroomForm />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
