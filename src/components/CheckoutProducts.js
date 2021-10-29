import { MinusSmIcon, PlusIcon, StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  removeGroupedFromBasket,
} from "../slices/basketSlice";

function CheckoutProducts({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
  hasPrime,
}) {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
    };

    //Push Item into Redux
    dispatch(addToBasket(product));
  };
  const removeItemFromBasket = () => {
    // Remove the item from Redux
    dispatch(removeFromBasket({ id }));
  };

  function removeGroupFromBasket() {
    dispatch(removeGroupedFromBasket({ id }));
  }

  return (
    <div className="block py-4 sm:grid sm:grid-cols-5 my-16 sm:my-3">
      <div className="text-center sm:text-left">
        <Image src={image} width={200} height={200} objectFit="contain" />
      </div>

      {/* Middle section */}
      {/* mx-5 => margin in left & right is 5 */}
      <div className="col-span-3 mx-5 mb-4 sm:mb-0">
        <p className="my-3">{title}</p>
        <div className="flex    ">
          {/* map(value, index  ) */}
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-sm mt-2 my-2 line-clamp-3">{description}</p>

        <Currency quantity={price} currency="INR" />

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />

            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}
      </div>
      {/* Right add/remove buttons */}

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add to basket
        </button>

        <button className="button" onClick={removeItemFromBasket}>
          Remove from basket
        </button>
      </div>
    </div>
  );
}
export default CheckoutProducts;
