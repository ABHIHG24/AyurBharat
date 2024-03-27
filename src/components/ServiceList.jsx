import React from "react";
import { doctorsData, Services } from "../data/DoctorsData";
import { Link } from "react-router-dom";
const ServiceList = () => {
  return (
    <div>
      <div className="join join-vertical w-full ">
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" defaultChecked />
          <div className="collapse-title text-xl font-medium text-secondary">
            Our Doctors
          </div>
          <div className="collapse-content flex justify-evenly gap-10 flex-wrap">
            {doctorsData.map((data, index) => {
              const { img, name, specialization } = data;
              return (
                <div
                  key={index}
                  className="card w-80 h-96 bg-base-100 shadow-xl flex"
                >
                  <figure className="px-10 pt-10">
                    <img
                      src={img}
                      alt="Shoes"
                      className="rounded-xl image-full object-cover"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{specialization}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border border-base-300 ">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium text-secondary">
            Services Offered
          </div>
          <div className="collapse-content h-98 overflow-auto  ">
            {Services.map((data, index) => {
              const { img, title, description } = data;
              return (
                <div
                  key={index}
                  className="card h-72 bg-base-100 shadow-xl flex w-full justify-center align-middle items-center "
                >
                  <div className="flex flex-col w-full lg:flex-row gap-6 justify-center  items-center">
                    <div className="hidden lg:flex h-56 card bg-base-300 rounded-box place-items-center w-2/5 ml-3 ">
                      <figure className="px-10 pt-10 ">
                        <img
                          src={img}
                          alt="Shoes"
                          // width={"1000px"}
                          className="rounded-xl image-full object-cover "
                        />
                      </figure>
                    </div>
                    <div className="divider lg:divider-horizontal divider-accent"></div>
                    <div className="overflow-auto lg:overflow-hidden grid flex-grow h-56 card bg-base-300 rounded-box place-items-center w-2/3 mr-3 ">
                      <div className="card-body items-center text-center">
                        <h2 className="card-title">{title}</h2>
                        <p>{description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Link to="book_appointment" className="link">
        <div className="btn btn-error mt-10">Book an Appointment</div>
      </Link>
    </div>
  );
};

export default ServiceList;
