
const BASE_URL = "https://nokshi-git-main-azizul-dev.vercel.app/";

async function readData() {
  const res = await fetch(`${BASE_URL}/data.json`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  return res.json();
}

export async function getAllProducts() {
  return readData();
}

export async function getProductById(id) {
  const products = await readData();
  return products.find((p) => String(p.id) === String(id)) ?? null;
}

export async function getProductsByCategory(category) {
  const products = await readData();
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}