import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdOutlinePreview } from "react-icons/md";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { CustomFetch } from "../../axios/Costomaxios";
import { useState } from "react";

const AdminDashboard = () => {
  const [user, setUser] = useState("");
  const [product, setProduct] = useState("");
  const [order, setOrder] = useState("");

  const {
    isLoading: productLoading,
    data: productData,
    error,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await CustomFetch.get("/api/product/admin/products");
      setProduct(data);
      return data;
    },
  });

  const { isLoading: userLoading, data: userData } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await CustomFetch.get(`/api/user/admin/users`);
      setUser(data.users);
      return data;
    },
  });

  const { isLoading: orderLoading, data: orderData } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await CustomFetch.get(
        `/api/v1/orderRoutes/admin/orders`
      );
      setOrder(data);
      return data;
    },
  });

  if (orderLoading || userLoading || productLoading) {
    return <h1>Loading...</h1>;
  }

  const inStockCount = product.products
    ? product.products.filter((p) => p.stock > 0).length
    : 0;

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197 , 72, 49)"],
        data: [0, order && order.totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStack"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#00681ca4"],
        hoverBackgroundColor: ["#3f4604", "#841ab9c5"],
        data: [
          product.products && product.products.length - inStockCount,
          inStockCount,
        ],
      },
    ],
  };
  ChartJS.register(CategoryScale);
  return (
    <div className="flex flex-col justify-center items-center gap-20">
      <h1 className="bg-blue-500 h-14 text-2xl font-bold text-center p-2 w-screen">
        Total Amount : ₹{order.totalAmount}
      </h1>
      <div className="flex gap-20 justify-center text-2xl  mt-3">
        <div className="border-2 border-blue-400 p-20 w-auto     h-auto rounded-full bg-green-400 font-bold text-white place-self-center">
          <MdOutlineProductionQuantityLimits />
          product: {product.products && product.products.length}
        </div>
        <div className="border-2 border-blue-400 p-20 w-auto     h-auto rounded-full bg-yellow-200 font-bold  place-self-center">
          <FaUsers />
          users: {user && user.length}
        </div>
        <div className="border-2 border-blue-400 p-20 w-auto h-auto rounded-full bg-orange-400 font-bold text-white place-self-center">
          <MdOutlinePreview />
          orders: {order.orders && order.orders.length}
        </div>
      </div>
      <div className="flex justify-center items-center h-[400px] w-[800px]">
        <div className="h-full w-full">
          <Line data={lineState} />
        </div>
      </div>
      <div className="flex justify-center items-center h-[400px] w-[600px]">
        <div className="h-full w-full">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
