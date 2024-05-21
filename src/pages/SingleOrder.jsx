import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SingleOrder = () => {
  const { singleDetails } = useSelector((state) => state.orderState);
  const img = "http://localhost:5000/api/image/";

  return (
    <>
      {singleDetails &&
        singleDetails.orderItems &&
        singleDetails.shippingInfo &&
        singleDetails.paymentInfo && (
          <div className="flex gap-10 flex-wrap">
            <div className="flex gap-10 flex-col flex-wrap">
              <h1 className="font-bold text-2xl">Order Items</h1>
              <ol className="flex flex-col gap-8">
                {singleDetails.orderItems.map((data) => (
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
            </div>
            <div className="flex flex-col gap-24 border-pink-600 border-l-2 pl-10">
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-2xl ">Booking Details</h2>
                <p>Total Products Price : {singleDetails.itemsPrice}</p>
                <p>Tax Applied : {singleDetails.taxPrice}</p>
                <p>Shipping : {singleDetails.shippingPrice}</p>
                <p className="font-bold">
                  Total Price : {singleDetails.totalPrice}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-2xl">Delivery details</h2>
                <p>
                  {" "}
                  shipping address : {singleDetails.shippingInfo.address}{" "}
                  {singleDetails.shippingInfo.city}{" "}
                  {singleDetails.shippingInfo.state}{" "}
                  {singleDetails.shippingInfo.country}
                  {" - "}
                  {singleDetails.shippingInfo.pinCode}
                </p>
                <p>payment_id : {singleDetails.paymentInfo.id}</p>
                <p>payment_status : {singleDetails.paymentInfo.status}</p>
                <p>
                  paid At: {new Date(singleDetails.paidAt).toLocaleString()}
                </p>
                <p className="font-bold">
                  Delivery Status : {singleDetails.orderStatus}
                </p>
                <Link to="/orders">
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
export default SingleOrder;
