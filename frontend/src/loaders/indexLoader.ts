export default async function indexLoader() {
  const res = await fetch("http://localhost:8000/bathrooms");
  return res.json();
}
