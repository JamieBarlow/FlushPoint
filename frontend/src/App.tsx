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
import { v4 as uuidv4 } from "uuid";
import { fakerEN_GB } from "@faker-js/faker";

export const createBathroom: ActionFunction = async ({ request }) => {
  // gather data from form
  const data = await request.formData();
  // fake GPS coords within range for Oxford
  const geo = fakerEN_GB.location.nearbyGPSCoordinate({
    isMetric: false,
    origin: [51.752022, -1.257726],
    radius: 10,
  });
  // Fetches today's date in ISO format
  const getDate = () => {
    const now = new Date().toISOString().split("T")[0];
    return now;
  };

  const rawTags = {
    amenity: "toilets",
    source: "local_knowledge",
    name: data.get("name"),
    "addr:street": data.get("addr:street"),
    description: data.get("description"),
    operator: data.get("operator"),
    opening_hours: data.get("opening_hours"),
    access: data.get("access"),
    fee: data.get("fee"),
    gender_segregated: data.get("gender_segregated"),
    wheelchair: data.get("wheelchair"),
    "toilets:wheelchair": data.get("toilets:wheelchair"),
    "wheelchair:description": data.get("wheelchair:description"),
    locked: data.get("locked"),
    child: data.get("child"),
    changing_table: data.get("changing_table"),
    "changing_table:location": data.getAll("changing_table:location"),
    drinking_water: data.get("drinking_water"),
    "toilets:position": data.getAll("toilets:position"),
    "toilets:menstrual_products": data.get("toilets:menstrual_products"),
    vending: data.get("vending"),
    supervised: data.get("supervised"),
    indoor: data.get("indoor"),
    level: data.get("level"),
    shower: data.get("shower"),
    check_date: getDate(),
    fixme: data.get("fixme"),
  };

  // Ensure that empty arrays, empty strings, "unknown" entries and 'null' entries are returned as 'undefined'
  const sanitizeField = (field: any) => {
    if (Array.isArray(field) && field.length === 0) {
      return undefined;
    }
    if (field === "" || field === "unknown" || field === null) return undefined;
    return field;
  };

  const sanitizedTags = Object.fromEntries(
    Object.entries(rawTags).map(([key, value]) => [key, sanitizeField(value)])
  );

  // Submission for request body
  const submission = {
    // to add: lat and long
    type: "node",
    bathroom_id: uuidv4(),
    lat: geo[0],
    long: geo[1],
    tags: sanitizedTags,
  };

  console.log(submission);
  // validation
  if (
    typeof submission.tags.description === "string" &&
    submission.tags.description.length < 10
  ) {
    return { error: "Description must be over 10 chars long" };
  }
  if (
    submission.tags.changing_table === "yes" &&
    submission.tags["changing_table:location"].length === 0
  ) {
    return {
      error: "Please select at least one checkbox for changing table location",
    };
  }
  // Send POST request to API
  try {
    const response = await fetch("http://localhost:8000/bathrooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submission),
    });
    if (!response.ok) {
      throw new Error("Network response failed");
    }
    const result = await response.json();
    console.log("Result:", result);
    return redirect("/bathrooms");
  } catch (error) {
    console.error("Error submitting form:", error);
    return { error: "Failed to create bathroom" };
  }
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
