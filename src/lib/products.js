import products from "@/data/data.json";

export async function getAllProducts() {
  return products;
}

export async function getProductById(id) {
  return products.find((p) => String(p.id) === String(id)) ?? null;
}

export async function getProductsByCategory(category) {
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}
