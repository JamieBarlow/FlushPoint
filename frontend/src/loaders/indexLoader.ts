import { defer } from "react-router-dom";

export default async function indexLoader() {
  try {
    const res = await fetch("http://localhost:8000/bathrooms");
    if (!res.ok) {
      throw new Error(
        `Error fetching bathrooms: ${res.status} ${res.statusText}`
      );
    }
    const bathrooms = await res.json();
    return defer({ bathrooms });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Network error: ${error.message}`);
    } else {
      throw new Error("An unknown error occured.");
    }
  }
}
