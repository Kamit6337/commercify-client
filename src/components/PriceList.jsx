import { useSelector } from "react-redux";
import { localStorageState } from "../redux/slice/localStorageSlice";
import useProductsFromIDs from "../hooks/query/useProductsFromIDs";
import Loading from "../containers/Loading";

const PriceList = () => {
  const { cart } = useSelector(localStorageState);
  const cartIds = cart.map((obj) => obj.id);

  const { data, isLoading, error } = useProductsFromIDs(cartIds);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  const productPrice = data.reduce((prev, current) => {
    const findProduct = cart.find((obj) => obj.id === current._id);

    return prev + findProduct.quantity * current.price;
  }, 0);

  const productDiscount = data.reduce((prev, current) => {
    const discount = Math.round(
      (current.price * Math.round(current.discountPercentage)) / 100
    );

    const findProduct = cart.find((obj) => obj.id === current._id);

    return prev + findProduct.quantity * discount;
  }, 0);

  const deliveryCharges = 40;
  const productSellingPrice = productPrice - productDiscount + deliveryCharges;
  return (
    <div className="">
      <p className="uppercase p-4 border-b tracking-wide font-semibold text-gray-500 text-sm">
        Price Details
      </p>
      <div className="p-4 flex justify-between">
        <p>
          Price <span>({data.length} item)</span>
        </p>
        <p>&#x20B9;{productPrice}</p>
      </div>
      <div className="p-4 flex justify-between">
        <p>Discount</p>
        <p>
          <span className="mx-1">-</span>
          &#x20B9;{productDiscount}
        </p>
      </div>
      <div className="p-4 flex justify-between">
        <p>Delivery Charges</p>
        <p>&#x20B9;{deliveryCharges}</p>
      </div>
      <div className="border-t p-4 flex justify-between">
        <p className="font-semibold">Total Amount</p>
        <p>&#x20B9;{productSellingPrice}</p>
      </div>
      <p className="border-t p-4 text-sm text-green-600 font-semibold tracking-wide">
        You are saving &#x20B9;{productDiscount} on this order
      </p>
    </div>
  );
};

export default PriceList;
