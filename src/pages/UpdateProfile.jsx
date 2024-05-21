import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { editProfile } from "../features/User/userSlice";
import { CustomFetch } from "../axios/Costomaxios";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const user = useSelector((state) => state.userState.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: reset, isPending } = useMutation({
    mutationFn: async (data) => {
      await CustomFetch.put(`/api/user/me/update`, data)
        .then((response) => {
          // console.log(response.data);
          dispatch(editProfile(response.data.user));
          toast.success("profile edit successful");
          navigate("/me");
        })
        .catch((error) => {
          toast.success("unsuccessful please try again");
          console.log("Error resetting password:", error);
        });
    },
  });
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const imageFile = e.currentTarget.querySelector('input[name="avatar"]')
      .files[0];

    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = async () => {
        const imageData = reader.result;
        formData.set("avatar", imageData);
        reset(Object.fromEntries(formData));
      };
    } else {
      reset(Object.fromEntries(formData));
    }
  };

  const { username, age, dateOfBirth, email, phoneNumber } = user;
  return (
    <form className="w-full max-w-lg" onSubmit={HandleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            Username
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            name="username"
            placeholder="Username"
            defaultValue={username}
            required
          />
          {/* <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p> */}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            dob
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="date"
            name="dateOfBirth"
            defaultValue={dateOfBirth}
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            type="email"
            name="email"
            placeholder="abc@gmail.com"
            defaultValue={email}
            required
          />
          <p className="text-green-400 text-xs italic">
            image should be under 100kb
          </p>

          <input
            type="file"
            className="file-input w-full mb-2  mt-2 max-w-xs"
            name="avatar"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-city"
          >
            phoneNumber
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-city"
            type="number"
            name="phoneNumber"
            placeholder="1234567890"
            defaultValue={phoneNumber}
            required
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-zip"
          >
            age
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-zip"
            type="number"
            name="age"
            placeholder="00"
            defaultValue={age}
            required
          />
        </div>
      </div>
      <div className="flex gap-10 mt-4">
        <button type="submit" className="btn btn-success">
          submit
        </button>
        <Link to="/me">
          <button type="submit" className="btn btn-warning">
            Back
          </button>
        </Link>
      </div>
    </form>
  );
};

export default UpdateProfile;
