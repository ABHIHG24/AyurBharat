import React, { useState } from "react";
import { CustomFetch } from "../axios/Costomaxios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const AppointmentManage = () => {
  const [appointment, setAppointment] = useState([]);
  const {
    isLoading: dataLoading,
    data: productReview,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await CustomFetch.get(`/api/vi/appointments`);
      // console.log(data.appointments);
      setAppointment(data.appointments);

      return data;
    },
  });

  const deleteAppointmentMutation = useMutation(
    (id) => CustomFetch.delete(`/api/vi/appointments/${id}`),
    {
      onSuccess: () => {
        toast.success("deleted successfully");
        refetch();
      },
    }
  );

  const handleChecked = async (id) => {
    try {
      await CustomFetch.put(`/api/vi/appointments/${id}`, {
        Checked: "checked",
      });
      toast.success("checked successfully");
      refetch();
    } catch (error) {
      console.error("Error checking appointment:", error);
    }
  };

  if (dataLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Checked</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Message (optional)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointment &&
              appointment.reverse().map((data, index) => (
                <tr
                  key={index}
                  className={
                    data.appointmentStatus === "checked"
                      ? "line-through font-bold"
                      : "text-red-500"
                  }
                >
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={data.appointmentStatus === "checked"}
                      />
                    </label>
                  </td>
                  <td>
                    <div className="font-bold">{data.name}</div>
                  </td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td>{new Date(data.date).toLocaleDateString()}</td>
                  <td>{data.message}</td>
                  <td className="flex gap-4">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleChecked(data._id)}
                    >
                      Checked
                    </button>
                    <MdDeleteForever
                      className="w-8 h-8 cursor-pointer"
                      onClick={() => deleteAppointmentMutation.mutate(data._id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentManage;
