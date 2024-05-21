import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrdersDetails } from "../features/Order/OrderSlice";

const ViewOrders = ({ myOrders }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(!(myOrders && myOrders.length >= 0));
  }, [myOrders]);

  const handleViewDetails = (id) => {
    dispatch(fetchOrdersDetails(id));
    navigate(`/orders/${id}`);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : myOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>OrderID</th>
                <th>Status</th>
                <th>items Qty</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order) => (
                <tr key={order._id}>
                  <th>{order._id}</th>
                  <td>{order.orderStatus}</td>
                  <td>{order.orderItems.length}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        handleViewDetails(order._id);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
