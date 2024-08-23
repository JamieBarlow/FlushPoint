import { useState, useEffect } from "react";
import type { BathroomType } from "../../../backend/models/bathroomModel";
import dbUrl from "../../../backend/routes/index";

export default function HomePage() {
  const [bathrooms, setBathrooms] = useState<BathroomType[]>([]);
  useEffect(() => {
    fetch("http://localhost:8000/bathrooms")
      .then((response) => response.json())
      .then((data) => setBathrooms(data));
  }, []);
  return (
    <div>
      <h1>All bathrooms</h1>
      <ul>
        {bathrooms.map((bathroom) => (
          <li key={bathroom.tags.bathroom_id}>
            {bathroom.tags.name} {bathroom.tags.opening_hours}
          </li>
        ))}
      </ul>
    </div>
  );
}
