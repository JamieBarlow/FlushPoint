import { defer } from "react-router-dom";

export default async function indexLoader() {
  const bathrooms = fetch("http://localhost:8000/bathrooms").then((res) =>
    res.json()
  );
  return defer({ bathrooms });
}
