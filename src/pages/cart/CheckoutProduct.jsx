/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { localStorageState } from "../../redux/slice/localStorageSlice";
import { currencyState } from "../../redux/slice/currencySlice";
import { addressState } from "../../redux/slice/addressSlice";

const CheckoutProduct = ({ product }) => {
  const { symbol, exchangeRate } = useSelector(currencyState);
  const { selectedAddress } = useSelector(addressState);

  const { cart } = useSelector(localStorageState);
  const { name, mobile, country, district, state, address } = selectedAddress;
  const {
    _id: id,
    title,
    description,
    price,
    discountPercentage,
    thumbnail,
  } = product;

  const productQuantity = useMemo(() => {
    if (!id || !cart || !cart.length === 0) return null;

    const findProduct = cart.find((obj) => obj.id === id);
    return findProduct.quantity;
  }, [cart, id]);

  const exchangeRatePrice = Math.round(price * exchangeRate);
  const roundDiscountPercent = Math.round(discountPercentage);
  const discountedPrice = Math.round(
    (exchangeRatePrice * (100 - roundDiscountPercent)) / 100
  );

  return (
    <div className="w-full border-b-2 last:border-none p-7 flex gap-10">
      {/* MARK: IMAGE */}
      <div className="h-full w-48">
        <Link to={`/products/${id}`}>
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover"
          />
        </Link>
      </div>

      {/* MARK: MAIN */}
      <section className="flex-1 flex flex-col gap-2">
        <div>
          <Link to={`/products/${id}`}>
            <p>{title}</p>
          </Link>
          <p className="text-xs mt-1">{description}</p>
        </div>

        <div className="flex gap-2 items-center">
          <p className="text-2xl font-semibold tracking-wide">
            {symbol}
            {discountedPrice}
          </p>
          <p className="line-through">
            {symbol}
            {exchangeRatePrice}
          </p>
          <p className="text-xs">{roundDiscountPercent}% Off</p>
        </div>
        <p className="text-sm">Qty: {productQuantity}</p>
        <div className="flex gap-2 text-sm">
          <p>Address : </p>
          <div className="">
            <div className="flex items-center gap-2">
              <p className="capitalize ">{name}</p>
              <p className="">{mobile}</p>
            </div>
            <p className="break-all">{address}</p>
            <div className="flex">
              <p className="">{district},</p>
              <p className="ml-2 ">{state}</p>
              <p className="mx-1">-</p>
              <p>{country}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckoutProduct;