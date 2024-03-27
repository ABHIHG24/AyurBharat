import { Link, useLoaderData } from "react-router-dom";

const ProductGrid = () => {
  const { products } = useLoaderData();

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { title, image, price } = product;

        return (
          <Link
            to={`/products/${product._id}`}
            key={product._id}
            className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
          >
            <figure className="px-4 pt-4">
              <img
                src={`http://localhost:5000/api/image/${product.image}`}
                alt={title}
                className="rounded-xl h-64 md:h-40 w-50% object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wider ">{title}</h2>
              <span className="text-secondary">₹{price}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductGrid;
