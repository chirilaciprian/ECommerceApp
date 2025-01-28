// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface OrderItemProps {
    orderItemId:string;
    name:string;
    image:string;
    price:number;
    description:string;
    quantity:number;
    brand:string;
    size:string
}

const OrderItemCard = (props:OrderItemProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
      <div className="img-box max-lg:w-full">
        <img
          src={props.image}
          alt="Premium Watch image"
          className="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-row items-center w-full ">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          <div className="flex items-center">
            <div className="">
              <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                {props.name}
              </h2>
              <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                Brand: {props.brand}
              </p>
              <div className="flex items-center ">
                <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                  Size: <span className="text-gray-500">{props.size}</span>
                </p>
                <p className="font-medium text-base leading-7 text-black ">
                  Qty: <span className="text-gray-500 roboto">{props.quantity}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end mr-10">
            <div className=" lg:col-span-1 flex items-center justify-end max-lg:mt-3">
              <div className="flex gap-3 lg:block">
                <p className="font-medium text-md leading-7 text-black">
                  Price
                </p>
                <p className="lg:mt-4 font-medium text-md leading-7 text-indigo-600 roboto">
                  ${props.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
