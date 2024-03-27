import { Shipping, SectionTitle } from "../components";
import { Outlet } from "react-router-dom";
import ShippingNav from "../components/ShippingNav";
import { useSelector } from "react-redux";

const Checkout = () => {
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  return (
    <div>
      {numItemsInCart === 0 ? (
        <h2 className="font-medium text-3xl capitalize tracking-wider ">
          fill the Cart
        </h2>
      ) : (
        <>
          <SectionTitle text={"proceed with payment"} />
          <ShippingNav />
          <Outlet />
        </>
      )}
    </div>
  );
};
export default Checkout;
