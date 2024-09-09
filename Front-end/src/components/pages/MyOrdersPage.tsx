/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { getMyOrdersAndProducts } from "../../services/orderService";
import { Link } from "react-router-dom";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedOrders] = (await getMyOrdersAndProducts()) as any[];
      const sortedOrders = fetchedOrders.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setOrders(sortedOrders);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg flex flex-col gap-10">
      <h1 className="text-4xl font-bold mb-6">My Orders</h1>      
      {orders.map((order: any) => (
        <div key={order.id} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Order #{order.id}</h2>
          <div className="mb-6">
            <p className="text-sm text-gray-500">
              Placed on: {new Date(order.createdAt).toLocaleDateString()} at{" "}
              {new Date(order.createdAt).toLocaleTimeString()}
            </p>
            <p className="text-sm text-gray-500">
              Delivery Address: {order.address}
            </p>
            <p className="text-sm text-gray-500">Phone: {order.phone}</p>
          </div>
          {order.items.map((orderItem: any) => {
            const { product } = orderItem;
            return (
              <div key={orderItem.id} className="mb-4 flex justify-between">
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-bold">{product.name}</p>
                    <p className="text-sm text-gray-700">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-lg font-bold">{orderItem.price}$</p>
                  <p className="ml-4 text-lg">{orderItem.quantity}x</p>
                </div>
              </div>
            );
          })}
          <div className="flex justify-end mt-4">
            <p className="text-xl font-bold">
              Total Price: {order.totalPrice}$
            </p>
          </div>
          
        </div>
      ))}
      <Link to="/" className="text-blue-500 hover:underline text-3xl items-center justify-center flex mb-10">
          Back to Home
        </Link>
    </div>
  );
};

export default MyOrdersPage;
