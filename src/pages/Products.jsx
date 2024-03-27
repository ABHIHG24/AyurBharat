import { Helmet } from "react-helmet";
import { CustomFetch } from "../axios/Costomaxios";
import Filters from "../components/Filters";
import PaginionContainer from "../components/PaginionContainer";
import ProductsContainer from "../components/ProductsContainer";

export const loader = async ({ request }) => {
  // const prams = new URL(request.url).searchParams;
  // console.log(prams);
  // const category = prams.get("category");
  // console.log(category);

  const urlSearchParams = new URLSearchParams(request.url.split("?")[1]);
  const params = Object.fromEntries(urlSearchParams.entries());
  console.log(params);

  const response = await CustomFetch("/api/product/getAllProduct", {
    params,
  });

  const products = response.data.data;
  const productCount = response.data.productCount;
  const categories = response.data.categories;
  const companies = response.data.companies;
  const totalPages = response.data.totalPages;
  const currentPage = response.data.currentPage;
  return {
    products,
    productCount,
    categories,
    companies,
    params,
    totalPages,
    currentPage,
  };
};

const Products = () => {
  return (
    <>
      <Helmet>
        <title>AyurBharat --- Our Products</title>
        <meta name="products" content="out ayurveda natural products" />
      </Helmet>
      <Filters />
      <ProductsContainer />
      <PaginionContainer />
    </>
  );
};
export default Products;
