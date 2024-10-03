import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  ActionFunction,
  redirect,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Index from "./pages/Index";
import BathroomShow from "./pages/BathroomShow";
import NewBathroomForm from "./pages/NewBathroomForm";
import NotFound from "./pages/NotFound";
import indexLoader from "./loaders/indexLoader";
import showLoader from "./loaders/showLoader";
import ShowBathroomError from "./pages/ShowBathroomError";

export const createBathroom: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const submission = {
    name: data.get("name"),
    address: data.get("address"),
    description: data.get("description"),
    operator: data.get("operator"),
    openingHours: data.get("openingHours"),
  };
  console.log(submission);
  if (
    typeof submission.description === "string" &&
    submission.description.length < 10
  ) {
    return { error: "Description must be over 10 chars long" };
  }
  return redirect("/bathrooms");
};

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
        <Route
          path="new"
          element={<NewBathroomForm />}
          action={createBathroom}
        />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
