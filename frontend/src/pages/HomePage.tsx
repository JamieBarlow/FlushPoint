import { useState, useEffect } from "react";

interface Bathroom {
  id: number;
  name: string;
}

export default function HomePage(): JSX.Element {
  const [bathrooms, setBathrooms] = useState<Bathroom[]>([]);
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
          <li key={bathroom.id}>{bathroom.name}</li>
        ))}
      </ul>
    </div>
  );
}
