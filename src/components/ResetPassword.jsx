import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomFetch } from "../axios/Costomaxios";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [submit, isSubmit] = useState(false);
  const [email, setEmail] = useState(null);

  const { mutate: reset, isPending } = useMutation({
    mutationFn: async (email) => {
      await CustomFetch.post("/api/user/forgetPassword", { email: email })
        .then((res) => {
          // console.log(res);
          isSubmit(true);
        })
        .catch((err) => {
          // console.log(err);
          toast.error(err.response.data.message);
        });
    },
  });
  const handleSubmit = () => {
    reset(email);
  };

  if (isPending) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      {submit ? (
        <div id="reset-pass">
          <h1>Thank you</h1>
          <p>please check your email</p>
          <div>
            <button>Back</button>
          </div>
        </div>
      ) : (
        <div
          id="reset-pass"
          className="flex justify-center flex-col align-middle h-screen"
        >
          <h1 className="text-5xl capitalize text-center font-bold p-11 text-gray-600">
            you will get a Email
          </h1>
          <div className="flex justify-center align-middle pb-20">
            <label
              htmlFor="resetpassword"
              className="text-3xl capitalize text-center font-bold  text-gray-600"
            >
              enter your Email :
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="flex justify-center">
            <button className="btn btn-primary w-32" onClick={handleSubmit}>
              Send Email
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default ResetPassword;
