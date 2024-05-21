import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";

const ConfirmShipping = () => {
  const navigate = useNavigate();
  const { cartTotal, shipping, orderTotal, cartItems } = useSelector(
    (state) => state.cartState
  );
  const user = useSelector((state) => state.userState.user);
  const shippingInformation = useSelector((state) => state.orderState);
  const { city, country, phoneNo, pinCode, state, address } =
    shippingInformation;
  const countryInfo = Country.getCountryByCode(country);
  const countryName = countryInfo ? countryInfo.name : "";

  const ProceedToPayment = (e) => {
    e.preventDefault();
    const data = {
      cartTotal,
      shipping,
      orderTotal,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("payment");
  };
  return (
    <div className="grid grid-cols-1 grid-rows-3 lg:grid-rows-2 lg:grid-cols-2 w-full  lg:gap-4">
      <div className="font-bold flex flex-col gap-4 border-b-2 border-rose-900 max-h-[300px] overflow-y-auto">
        <h2 className="text-2xl text-primary">User Details</h2>
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>
          Address: {countryName} {state} {city} {address} - {pinCode}
        </p>
      </div>

      <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto">
        <h2 className="font-bold text-2xl text-error">Your Products</h2>
        {cartItems.map((data) => {
          const { cartID, image, price, amount, title } = data;
          const img = `http://localhost:5000/api/image/${image}`;
          return (
            <div key={cartID} className="flex gap-10 w-2/6 font-bold">
              <h2>Name: {title}</h2>
              <img src={img} className="w-60 h-60" />
              <p>price: {price}</p>
              <p>amount: {amount}</p>
            </div>
          );
        })}
      </div>
      <div className="lg:col-start-2 lg:row-start-1 lg:row-end-3 border-l-2 border-red-900 font-bold flex flex-col gap-3 items-center">
        <h2 className="text-3xl text-secondary">Shipping details</h2>
        <p>phoneNo : {phoneNo}</p>

        <p>Price : {cartTotal}</p>
        <p>Shipping : {shipping}</p>
        <p>TotalPrice : {orderTotal}</p>
        <button
          type="submit"
          className="btn btn-success"
          onClick={ProceedToPayment}
        >
          Proceed to payment
        </button>
      </div>
    </div>
  );
};
export default ConfirmShipping;
