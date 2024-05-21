import React, { useState } from "react";
import { CustomFetch } from "../axios/Costomaxios";
import { useQuery, QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

const OrderStatus = () => {
  const { id } = useParams();
  const {
    isLoading: DataLoading,
    data: SingleProduct,
    refetch,
  } = useQuery({
    queryKey: ["SingleOrders"],
    queryFn: async () => {
      const { data } = await CustomFetch.get(`/api/v1/orderRoutes/order/${id}`);
      console.log(data);
      return data;
    },
  });

  const { mutate: OrderMutation, isLoading: deleteLoading } = useMutation({
    mutationFn: (data) =>
      CustomFetch.put(`/api/v1/orderRoutes/admin/order/${id}`, data),
    onSuccess: () => {
      toast.success("edit successfully");
      refetch();
    },
    onError: (error) => {
      // toast.error("unsuccessfully");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    OrderMutation(data);
    e.currentTarget.reset();
  };

  if (DataLoading) {
    return <h1>Loading...</h1>;
  }
  const img = "http://localhost:5000/api/image/";
  console.log(SingleProduct.order);

  return (
    <>
      {SingleProduct.order && (
        <div className="flex gap-10 flex-wrap">
          <div className="flex gap-10 flex-col flex-wrap">
            <h1 className="font-bold text-2xl">Order Items</h1>
            <ol className="flex flex-col gap-8">
              {SingleProduct.order &&
                SingleProduct.order.orderItems.map((data, index) => (
                  <li key={data._id} className="flex gap-7 ">
                    <img
                      src={`${img}${data.image}`}
                      alt="img"
                      className="w-52 h-52 object-contain"
                    />
                    <span>
                      <p className="font-bold">Name</p> <p>{data.title}</p>
                    </span>
                    <span>
                      <p className="font-bold">Price</p> <p>{data.price}</p>
                    </span>
                    <span>
                      <p className="font-bold">Qty</p> <p>{data.amount}</p>
                    </span>
                  </li>
                ))}
            </ol>

            <form onSubmit={handleSubmit} className="form-control w-32 gap-5">
              <select className="select select-primary" name="status">
                <option value="">Choose category</option>

                {SingleProduct.order.orderStatus === "processing" && (
                  <option value="shipped">Shipped</option>
                )}
                {SingleProduct.order.orderStatus === "shipped" && (
                  <option value="delivered">Delivered</option>
                )}
              </select>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-24 border-pink-600 border-l-2 pl-10">
            {SingleProduct && (
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-2xl ">Booking Details</h2>
                <p>Total Products Price : {SingleProduct.order.itemsPrice}</p>
                <p>Tax Applied : {SingleProduct.order.taxPrice}</p>
                <p>Shipping : {SingleProduct.order.shippingPrice}</p>
                <p className="font-bold">
                  Total Price : {SingleProduct.order.totalPrice}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-2xl">Delivery details</h2>

              <p>
                shipping address : {SingleProduct?.order.shippingInfo?.address}
                {SingleProduct?.order.shippingInfo?.city}{" "}
                {SingleProduct?.order.shippingInfo?.state}{" "}
                {SingleProduct?.order.shippingInfo?.country}
                {" - "}
                {SingleProduct?.shippingInfo?.order.pinCode}
              </p>
              <p>payment_id : {SingleProduct?.order.paymentInfo?.id}</p>
              <p>payment_status : {SingleProduct?.order.paymentInfo?.status}</p>
              <p>
                paid At:{" "}
                {new Date(SingleProduct?.order.paidAt).toLocaleString()}
              </p>
              <p className="font-bold">
                Delivery Status : {SingleProduct?.order.orderStatus}
              </p>
              <Link to="/admin/view_orders">
                <button className="btn btn-primary w-2/6">
                  Back to Orders
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default OrderStatus;
