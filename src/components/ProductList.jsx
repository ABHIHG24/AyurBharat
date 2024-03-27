import { Link, useLoaderData } from "react-router-dom";

const ProductList = () => {
  const { products } = useLoaderData();

  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { title, image, price, company } = product;

        return (
          <Link
            to={`/products/${product._id}`}
            key={product._id}
            className="p-8 rounded-lg flex flex-col sm:flex-row flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
          >
            <img
              src={`http://localhost:5000/api/image/${product.image}`}
              alt={title}
              className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300 group"
            />
            <div className="ml-0 sm:ml-16">
              <h3 className="capitalize font-medium text-lg">{title}</h3>
              <h4 className="capitalize font-medium text-md text-neutral-content">
                {company}
              </h4>
              <p className="font-medium ml-0 sm:ml-auto text-lg'">₹{price}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductList;
