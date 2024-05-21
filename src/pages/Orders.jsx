import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../features/Order/OrderSlice";
import { ViewOrders } from "../components";

const Orders = () => {
  const dispatch = useDispatch();
  const { myOrders } = useSelector((state) => state.orderState);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <>
      {myOrders ? <ViewOrders myOrders={myOrders} /> : <h1>No orders Yet</h1>}
    </>
  );
};

export default Orders;
