import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddProduct, Homepage } from "./AdminPages";
import {
  About,
  Cart,
  Error,
  HomeLayout,
  Landing,
  Orders,
  Products,
  SingleProduct,
  Login,
  Signup,
  Checkout,
  Service,
  Appointment,
  Profile,
  SingleOrder,
} from "./pages/index";

import {
  ResetPassword,
  ResetPassword2,
  ErrorElement,
  ServiceContainer,
  ProfilePage,
  UpdateProfile,
  UpdatePassword,
  Payment,
  Shipping,
  ConfirmShipping,
} from "./components/index";
import { ToastContainer } from "react-toastify";
import "./App.css";

import { loader as landingLoader } from "./pages/Landing";
import { loader as SingleProductLoader } from "./pages/SingleProduct";
import { loader as productLoader } from "./pages/Products";

// import { loader as serviceLoader } from "./pages/Service";
// import { action as registerAction } from "./pages/Signup";
import { action as loginAction } from "./pages/Login";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CustomFetch } from "./axios/Costomaxios";
// import { action as checkoutAction } from "./components/CheckoutForm";

const App = () => {
  const [role, setRole] = useState("user");
  // const [isLogin, setIsLogin] = useState(false);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await CustomFetch.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  let routes = [
    {
      path: "/login",
      element: <Login setRole={setRole} />,
      errorElement: <Error />,
      action: loginAction(),
    },
    {
      path: "/forgetPassword",
      element: <ResetPassword />,
      errorElement: <Error />,
    },
    {
      path: "/resetPassword/:token",
      element: <ResetPassword2 />,
      errorElement: <Error />,
    },
    {
      path: "/Signup",
      element: <Signup />,
      // action: registerAction,

      errorElement: <Error />,
      action: <registerAction />,
    },
  ];

  if (role === "user") {
    routes.unshift({
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
          errorElement: <ErrorElement />,
          loader: landingLoader,
        },
        {
          path: "products",
          element: <Products />,
          loader: productLoader,
        },
        {
          path: "products/:id",
          element: <SingleProduct />,
          loader: SingleProductLoader,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "checkout",
          element: <Checkout />,
          children: [
            {
              index: true,
              element: <Shipping />,
            },
            {
              path: "confirm",
              element: <ConfirmShipping />,
            },
            {
              path: "confirm/payment",
              element: stripeApiKey ? (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              ) : null,
            },
          ],
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "orders/:id",
          element: <SingleOrder />,
        },
        {
          path: "service",
          element: <Service />,
          // loader: serviceLoader,
          children: [
            {
              index: true,
              element: <ServiceContainer />,
            },
            {
              path: "book_appointment",
              element: <Appointment />,
            },
          ],
        },
        {
          path: "me",
          element: <Profile />,
          children: [
            {
              index: true,
              element: <ProfilePage />,
            },
            {
              path: "update_profile",
              element: <UpdateProfile />,
            },
            {
              path: "update_password",
              element: <UpdatePassword />,
            },
          ],
        },
      ],
    });
  } else if (role === "admin") {
    routes.unshift({
      path: "/",
      element: <AddProduct />,
      errorElement: <Error />,
    });
  }

  const router = createBrowserRouter(routes);

  const mode = localStorage.getItem("theme");

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        draggable={true}
        pauseOnHover={true}
        theme={mode === "winter" ? "light" : "dark"}
      />
    </>
  );
};

export default App;
