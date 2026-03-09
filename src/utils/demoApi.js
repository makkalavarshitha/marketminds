import { demoBills, demoProducts } from "../data/demoData";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchDemoProducts = async () => {
  await wait(700);
  return demoProducts;
};

export const fetchDemoBills = async () => {
  await wait(500);
  return demoBills;
};
