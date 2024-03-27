import { CustomFetch } from "../axios/Costomaxios";
import { FeaturedProducts, Hero } from "../components";

export const loader = async () => {
  const response = await CustomFetch("/api/product/getAllProduct");
  const products = response.data.data.slice(0, 3);
  return { products };
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
