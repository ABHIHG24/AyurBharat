import React, { useState } from "react";
import axios from "axios";
// import "./resetPassword2.css";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomFetch } from "../axios/Costomaxios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { mutate: reset, isPending } = useMutation({
    mutationFn: async (data) => {
      await CustomFetch.put(`/api/user/resetPassword/${token}`, data)
        .then((response) => {
          console.log(response.data);
          toast.success("Password reset successful");
          navigate("/login");
        })
        .catch((error) => {
          console.log(token, " token", data);
          toast.success("Password reset unsuccessful ");
          console.log("Error resetting password:", error);
          // navigate("/forgetPassword");
        });
    },
  });

  const handleChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const passw = data.password;
    const repassw = data.confirmPassword;
    // console.log(passw, repassw);
    if (passw !== repassw) {
      toast.success("Password and re-entered password do not match");
      return;
    }

    if (data.password.length < 8) {
      toast.success("password should contain at least 8 characters");
      return;
    }
    reset(data);
  };

  return (
    <div
      id="resetpassw"
      className="flex flex-col items-center justify-center h-screen"
    >
      <h1 className="text-3xl font-bold mb-4">Reset Your Password</h1>
      <label htmlFor="password" className="text-lg font-bold">
        Enter your new password
      </label>
      <input
        type="password"
        required
        id="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        className="border border-gray-400 rounded p-2 mb-4"
      />
      <label htmlFor="rePassword" className="text-lg font-bold">
        Re-enter your new password
      </label>
      <input
        type="password"
        required
        id="rePassword"
        name="confirmPassword"
        value={data.repassword}
        onChange={handleChange}
        className="border border-gray-400 rounded p-2 mb-4"
      />
      <button onClick={handleSubmit} className="btn btn-primary">
        Change Password
      </button>
    </div>
  );
};

export default ResetPassword;
