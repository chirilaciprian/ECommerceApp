/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getMyOrdersAndProducts } from "../../services/orderService";
import OrderItemCard from "../general/OrderItemCard";
import { Link } from "react-router-dom";

const MyOrdersPage = () => {  

  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedOrders] = (await getMyOrdersAndProducts()) as any[];
      const sortedOrders = fetchedOrders.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setOrders(sortedOrders);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="py-24 relative bg-base-200 min-h-screen">
        {orders.length !== 0 ? (
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto flex flex-col gap-10">
          <h2 className="merriweather font-light md:text-5xl text-4xl leading-10 text-black text-center mb-10">
            My orders
          </h2>
          {orders.map((order: any) => (
            <div key={order.id} className="main-box border border-gray-300 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                <div className="data">
                  <p className="font-semibold text-base leading-7 text-black">
                    Order Id:{" "}
                    <span className="text-indigo-600 font-medium roboto">
                      #{order.id}
                    </span>
                  </p>
                  <div className="mb-6">
                    <p className="text-sm text-gray-500">
                      Placed on:{" "}
                      {new Date(order.createdAt).toLocaleDateString()} at{" "}
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Delivery Address: {order.address}
                    </p>
                    <p className="text-sm text-gray-500">
                      Phone Number: {order.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full px-3 min-[400px]:px-6">
                {order.items.map((orderItem: any) => {
                  const { product } = orderItem;
                  return (
                    <OrderItemCard
                      key={orderItem.id}                      
                      orderItemId={orderItem.id}
                      name={product.name}
                      image={product.images[0]}
                      price={product.price}
                      description={""}
                      quantity={orderItem.quantity}
                      brand={product.manufacturer}
                    />
                  );
                })}
              </div>
              <div className="grid grid-cols-2 text-lg playfair m-5 md:mx-10">
                <div className="flex flex-row items-center gap-2">
                  <span className="">Status:</span>
                  {order.status === "pending" ? (
                    <div className="badge badge-warning p-3 text-lg uppercase">
                      {order.status}
                    </div>
                  ) : order.status === "delivered" ? (
                    <div className="badge badge-success p-3 text-lg uppercase">
                      {order.status}
                    </div>
                  ) : (
                    <div className="badge badge-error p-3 text-lg uppercase">
                      {order.status}
                    </div>
                  )}
                </div>
                <span className="text-xl font-bold text-end">
                  Total Price:
                  <span className="ml-1 text-primary roboto">
                    ${order.totalPrice}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
        ):(
          <div className="flex flex-col items-center  playfair">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076507.png"
                alt="No Orders"
                className="w-48 h-48 mb-6"
              />
              <h2 className="md:text-3xl text-xl font-semibold text-gray-700">
                No Orders Yet
              </h2>
              <p className="mt-2 text-gray-500 md:text-xl text-md">
                You haven’t placed any orders yet.
              </p>
              <Link to="/products" className="mt-6 btn btn-primary px-6 md:text-xl text-md">
                Start Shopping
              </Link>
            </div>
        )}
      </div>
    </>
  );
};

export default MyOrdersPage;
