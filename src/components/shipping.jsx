import { useDispatch, useSelector } from "react-redux";
import { shippingInfo } from "../features/Order/OrderSlice";
import { Country, State } from "country-state-city";
import { useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ShippingNav from "./ShippingNav";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const { cartTotal, shipping, orderTotal } = useSelector(
    (state) => state.cartState
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    if (data.phoneNo.length !== 10) {
      return toast.info("the phone number should be 10 digit long");
    }
    dispatch(shippingInfo({ ...data }));
    setCountry("");
    <ShippingNav shipping={"bg-emerald-200"} />;
    navigate("/checkout/confirm");
    e.currentTarget.reset();
  };
  return (
    <>
      <div className="mt-10 bg-base-300 px-4 pt-8 lg:mt-0 w-3/6">
        <p className="text-xl font-medium">Payment Details</p>
        <p className="text-gray-400">
          Complete your order by providing your payment details.
        </p>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="phoneNo"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            phoneNo
          </label>
          <div className="relative">
            <input
              type="number"
              id="phoneNo"
              name="phoneNo"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Phone No..."
              required
            />

            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <label
            htmlFor="address"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Address
          </label>
          <div className="relative">
            <input
              type="text"
              id="address"
              name="address"
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Address..."
              required
            />

            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <label htmlFor="city" className="mt-4 mb-2 block text-sm font-medium">
            city
          </label>
          <div className="relative">
            <input
              type="text"
              id="city"
              name="city"
              required
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="your city..."
            />

            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <label
            htmlFor="billing-address"
            className="mt-4 mb-2 block text-sm font-medium"
          >
            Billing Address
          </label>
          <div className="flex flex-col sm:flex-row">
            <select
              type="text"
              name="country"
              className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              required
              onClick={(e) => setCountry(e.target.value)}
            >
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((data) => (
                  <option key={data.isoCode} value={data.isoCode}>
                    {data.name}
                  </option>
                ))}
            </select>
            {country && (
              <select
                type="text"
                name="state"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((data) => (
                    <option key={data.isoCode} value={data.name}>
                      {data.name}
                    </option>
                  ))}
              </select>
            )}

            <input
              type="number"
              required
              name="pinCode"
              className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              placeholder="pinCode"
            />
          </div>

          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="font-semibold text-gray-900">{cartTotal}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="font-semibold text-gray-900">{shipping}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">{orderTotal}</p>
          </div>

          <button
            type="submit"
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Place Order
          </button>
        </form>
      </div>
    </>
  );
};
export default Shipping;
