import { Outlet } from "react-router-dom";
import { CustomFetch } from "../axios/Costomaxios";
import { SectionTitle } from "../components";

const Service = () => {
  return (
    <div>
      <SectionTitle text={" Our Doctors and services offered"} />
      <Outlet />
    </div>
  );
};
export default Service;
