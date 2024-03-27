import React from "react";
import { CustomFetch } from "../axios/Costomaxios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Appointment = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    CustomFetch.post("/api/vi/appointments", data)
      .then((res) => {
        // Handle success
        toast.success("Form data sent successfully");
        navigate("/service");
      })
      .catch((err) => {
        // Handle error
        // console.error("error:", err);

        toast.error("please try again after some time");
      });
    e.currentTarget.reset();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Ayur Bharat Hospital Appointment Form
      </h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="mb-4">
          <label htmlFor="name" className="font-bold block">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            className="input input-bordered w-full max-w-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="font-bold block">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@example.com"
            className="input input-bordered w-full max-w-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="font-bold block">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="123-456-7890"
            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            className="input input-bordered w-full max-w-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="font-bold block">
            Preferred Appointment Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="input input-bordered w-full max-w-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="font-bold block">
            Message (Optional):
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Any additional information or specific requirements?"
            className="textarea textarea-bordered w-full max-w-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Appointment;
