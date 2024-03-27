import { removeItem, editItem } from "../features/Cart/cartSlice";
import { useDispatch } from "react-redux";
const CartItem = ({ cartItem }) => {
  // console.log(cartItems, "cartItems");
  const dispatch = useDispatch();

  const removeItemFromTheCart = () => {
    dispatch(removeItem({ cartID }));
  };

  // const handleAmount = (e) => {
  //   dispatch(editItem({ cartID, amount: parseInt(e.target.value) }));
  // };
  const { cartID, title, price, image, amount, company } = cartItem;
  const img = `http://localhost:5000/api/image/${image}`;

  return (
    <article
      key={cartID}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      <img
        src={img}
        alt={title}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />

      <div className="sm:ml-16 sm:w-48">
        <h3 className="capitalize font-medium">{title}</h3>

        <h4 className="mt-2 capitalize text-sm text-neutral-content">
          {company}
        </h4>
      </div>
      <div className="sm:ml-12">
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Amount</span>
          </label>
          <h4 className="mt-2 capitalize text-sm font-bold">{amount}</h4>
        </div>

        <button
          className="mt-2 link link-primary link-hover text-sm"
          onClick={removeItemFromTheCart}
        >
          remove
        </button>
      </div>

      <p className="font-medium sm:ml-auto">{price}</p>
    </article>
  );
};
export default CartItem;
