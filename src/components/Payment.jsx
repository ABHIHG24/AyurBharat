import React, { Fragment, useEffect, useRef } from "react";
// import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { CustomFetch } from "../axios/Costomaxios";
import { useNavigate } from "react-router-dom";

import { createOrder } from "../features/Order/OrderSlice";

const Payment = () => {
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { cartItems } = useSelector((state) => state.cartState);
  const shippingInfo = useSelector((state) => state.orderState);
  const user = useSelector((state) => state.userState.user);
  // const { error } = useSelector((state) => state.newOrder);

  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  const months = range(1, 12);
  const currentYear = new Date().getFullYear();
  const years = range(currentYear, currentYear + 10);

  const paymentData = {
    amount: Math.round(orderInfo.orderTotal * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.cartTotal,
    // taxPrice: Math.floor((orderInfo.orderTotal / 100) * 18),
    taxPrice: 0,
    shippingPrice: orderInfo.shipping,
    totalPrice: orderInfo.orderTotal,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const { data } = await CustomFetch.post(
        "/api/v1/payment/process",
        paymentData
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/orders");
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      // console.error("Error during payment processing:", error);
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     alert.error(error);
  //     dispatch(clearErrors());
  //   }
  // }, [dispatch, error, alert]);

  return (
    <>
      <div className="relative mx-auto w-ful">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-3500 sm:text-3xl">
                Secure Checkout
                <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
              </h1>
              <form action="" className="mt-10 flex flex-col space-y-4">
                <div className="relative">
                  <label
                    htmlFor="card-number"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Card number
                  </label>

                  <CardNumberElement
                    className="paymentInput block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    id="card-number"
                  />
                  <img
                    src="/images/uQUFIfCYVYcLK0qVJF5Yw.png"
                    alt=""
                    className="absolute bottom-3 right-3 max-h-4"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <label
                    htmlFor="Exp-date"
                    className="text-xs font-semibold text-gray-500"
                  >
                    Exp date
                  </label>
                  <CardExpiryElement
                    className="paymentInput block w-3/6 rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                    id="Exp-date"
                  />

                  <CardCvcElement className="paymentInput w-1/6 p-2  bg-slate-200 border-black border-2" />
                </div>

                <div>
                  <label htmlFor="card-name" className="sr-only">
                    Card name
                  </label>
                  <input
                    type="text"
                    id="card-name"
                    name="card-name"
                    placeholder="Name on the card"
                    className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-400 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </form>
              <p className="mt-10 text-center text-sm font-semibold text-gray-500">
                By placing this order you agree to the{" "}
                <a
                  href="#"
                  className="whitespace-nowrap text-teal-400 underline hover:text-teal-600"
                >
                  Terms and Conditions
                </a>
              </p>
              <button
                ref={payBtn}
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
                onClick={submitHandler}
                value={`pay - ${orderInfo && orderInfo.orderTotal}`}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
