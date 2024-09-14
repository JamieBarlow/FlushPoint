import { LoaderFunctionArgs } from "react-router-dom";

export default async function showLoader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  const res = await fetch(`http://localhost:8000/bathrooms/${id}`);
  if (!res.ok) {
    throw Error("Failed to fetch bathroom data");
  }
  return res.json();
}
