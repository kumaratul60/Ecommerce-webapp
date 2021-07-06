 import moment from "moment";
import Currency from "react-currency-formatter";

function Order({ id, amount, amountShipping, items, timestamp, images }) {
  return (
    <div className=" relative border rounder-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">Order Placed</p>
          <p>{moment.unix(timestamp).format("DD MM YYYY")}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            <Currency quantity={amount} currency="INR" /> - Next Day Delivery{" "}
            <Currency quantity={amountShipping} currency="INR" />
          </p>
        </div>
        <p className="text-xs whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.length} items
        </p>

        {/* truncate -> if string is too long then it wrap it */}
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-pre-nowrap">
          ORDER # {id}
        </p>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flexspace-x-6 overflow-x-auto">
          {images.map((image) => (
            <img
              src={image}
              alt=""
              className="h-20 object-contain sm:h-32"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
