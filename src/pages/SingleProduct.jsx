import { useLoaderData } from "react-router-dom";
import { CustomFetch } from "../axios/Costomaxios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/Cart/cartSlice";
import { nanoid } from "nanoid";
import ProductReview from "../components/ProductReview";
import ReactStars from "react-rating-stars-component";

export const loader = async ({ params }) => {
  const response = await CustomFetch(
    `/api/product/getSingleProduct/${params.id}`
  );
  return { product: response.data };
};

const SingleProduct = () => {
  const [amount, setAmount] = useState(1);
  const { product } = useLoaderData();
  const { _id, title, description, company, category, price, image, stock } =
    product;
  const img = `http://localhost:5000/api/image/${image}`;

  const options = {
    edit: false,
    color: "rbg(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  const cartProduct = {
    cartID: _id,
    title,
    description,
    company,
    category,
    price,
    image,
    amount,
    stock,
  };

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };
  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={img}
          alt={title}
          className="w-96 h-96 object-contain rounded-lg lg:w-full"
        />
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <div className="flex flex-row gap-4 items-center">
            <ReactStars {...options} />
            <p className="font-bold">reviews ({product.reviews.length})</p>
          </div>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl text-blue-500">₹{price}</p>
          <p className="mt-3 text-xl">
            {stock < 1 ? "out of Stock" : "in Stock"}
          </p>
          <p className="mt-6 leading-8">{}</p>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="tex-md font-medium -tracking-wider capitalize">
                quantity
              </h4>
            </label>

            <select
              name="amount"
              className="select select-secondary select-md"
              id="amount"
              // value={amount}
              onChange={(e) => {
                const newAmount = parseInt(e.target.value);
                setAmount(newAmount);
              }}
            >
              {[...Array(stock)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-10">
            <button className="btn btn-secondary btn-md" onClick={addToCart}>
              Add to Card
            </button>
          </div>
        </div>
      </div>
      <div className="pt-16">
        <ProductReview product={product} />
      </div>
    </section>
  );
};

export default SingleProduct;
