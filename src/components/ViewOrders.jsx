import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchOrdersDetails } from "../features/Order/OrderSlice";

const ViewOrders = ({ myOrders }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleViewDetails = (id) => {
    dispatch(fetchOrdersDetails(id));
    navigate(`/orders/:${id}`);
  };
  return (
    <div>
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
            {myOrders.map((orders) => (
              <tr key={orders._id}>
                <th>{orders._id}</th>
                <td>{orders.orderStatus}</td>
                <td>{orders.orderItems.length}</td>
                <td>{orders.totalPrice}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => {
                      handleViewDetails(orders._id);
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
    </div>
  );
};
export default ViewOrders;
