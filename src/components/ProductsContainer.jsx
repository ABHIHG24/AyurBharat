import ProductGrid from "./ProductGrid";
import ProductList from "./ProductList";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";

const ProductsContainer = () => {
  const { products, productCount } = useLoaderData();

  const [layout, setLayout] = useState("grid");

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-based-content"
    }`;
  };
  return (
    <div className="flex justify-between flex-col items-center mt-8 border-b border-base-300 pb-5">
      <div className="font-medium text-md ">
        TotalProduct{productCount > 1 && "s"} {productCount}
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => setLayout("grid")}
            className={setActiveStyles("grid")}
          >
            <BsFillGridFill />
          </button>
          <button
            type="button"
            onClick={() => setLayout("list")}
            className={setActiveStyles("list")}
          >
            <BsList />
          </button>
        </div>
      </div>

      <div>
        {products.length === 0 ? (
          <h5 className="text-2xl mt-16">
            "Sorry, no products matched your search ...
          </h5>
        ) : layout === "grid" ? (
          <ProductGrid />
        ) : (
          <ProductList />
        )}
      </div>
    </div>
  );
};
export default ProductsContainer;
