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
import NotFound from "./pages/NotFound";
import indexLoader from "./loaders/indexLoader";
import showLoader from "./loaders/showLoader";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/bathrooms">
        <Route index element={<Index />} loader={indexLoader} />
        <Route path=":id" element={<BathroomShow />} loader={showLoader} />
        <Route path="new" element={<NewBathroomForm />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
