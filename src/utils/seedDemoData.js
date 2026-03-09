import { fetchDemoBills, fetchDemoProducts } from "./demoApi";

export const ensureDemoDataSeeded = async () => {
  const parseArray = (key) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  };

  const currentProducts = parseArray("marketmind-products");
  const currentBills = parseArray("marketmind-bills");

  if (!currentProducts || currentProducts.length === 0) {
    const products = await fetchDemoProducts();
    localStorage.setItem("marketmind-products", JSON.stringify(products));
  }

  if (!currentBills || currentBills.length === 0) {
    const bills = await fetchDemoBills();
    localStorage.setItem("marketmind-bills", JSON.stringify(bills));
  }
};
