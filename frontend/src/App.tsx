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
import ShowBathroomError from "./pages/ShowBathroomError";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
      <Route path="/bathrooms">
        <Route index element={<Index />} loader={indexLoader} />
        <Route
          path=":id"
          element={<BathroomShow />}
          loader={showLoader}
          errorElement={<ShowBathroomError />}
        />
        <Route path="new" element={<NewBathroomForm />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
