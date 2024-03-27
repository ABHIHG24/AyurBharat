import { useSelector } from "react-redux";

const CartTotal = () => {
  const { cartTotal, shipping, orderTotal } = useSelector(
    (state) => state.cartState
  );
  return (
    <div className="cart bg-base-200">
      <div>
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>SubTotal</span>
          <span className="font-medium">{cartTotal}</span>
        </p>

        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Shipping</span>
          <span className="font-medium">{shipping}</span>
        </p>
        <p className="flex justify-between text-sm mt-4   pb-2">
          <span>Order Total</span>
          <span className="font-medium">{orderTotal}</span>
        </p>
      </div>
    </div>
  );
};
export default CartTotal;
