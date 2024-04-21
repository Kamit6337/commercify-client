import useUserOrders from "../../hooks/query/useUserOrders";
import Loading from "../../containers/Loading";
import { Link } from "react-router-dom";
import makeDateDaysAfter from "../../utils/javascript/makeDateDaysAfter";
import OrderStatus from "./OrderStatus";
import { useEffect } from "react";
import changePriceDiscountByExchangeRate from "../../utils/javascript/changePriceDiscountByExchangeRate";
import { useSelector } from "react-redux";
import { currencyState } from "../../redux/slice/currencySlice";
const UserOrders = () => {
  const { isLoading, error, data } = useUserOrders();
  const { symbol, exchangeRate } = useSelector(currencyState);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-96">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96">
        <p>{error.message}</p>
      </div>
    );
  }

  const buys = data.data;

  if (!buys || buys.length === 0) {
    return (
      <div
        className="w-full flex flex-col gap-3 items-center justify-center"
        style={{ height: "calc(100vh - 120px)" }}
      >
        <p>No orders yet.</p>
        <Link to={`/`}>
          <p className="bg-orange-600 py-2 px-10 rounded text-white">
            Start Shopping
          </p>
        </Link>
      </div>
    );
  }

  return (
    <section>
      <p className="border-b-2 py-4 px-10">Orders</p>
      <main>
        {buys.map((buy, i) => {
          const {
            _id,
            product,
            price,
            quantity,
            address: buyAddress,
            isDelievered,
            isCancelled,
            isReturned,
            updatedAt,
            createdAt,
          } = buy;

          const { _id: id, title, description, thumbnail } = product;

          const { pinCode, district, state, address } = buyAddress;

          const { exchangeRatePrice } = changePriceDiscountByExchangeRate(
            price,
            0,
            exchangeRate
          );

          return (
            <div key={i} className="border-b-2 last:border-none p-7 space-y-5">
              {/* MARK: UPPER PORTION */}
              <div className="w-full flex gap-10">
                <div className="h-full w-48">
                  <Link to={`/products/${id}`}>
                    <img
                      src={thumbnail}
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                </div>
                <section className="flex-1 flex flex-col gap-2">
                  <div>
                    <Link to={`/products/${id}`}>
                      <p>{title}</p>
                    </Link>
                    <p className="text-xs">{description}</p>
                  </div>

                  <p className="text-2xl font-semibold tracking-wide">
                    {symbol}
                    {exchangeRatePrice}
                  </p>
                  <div className="text-xs">Qty : {quantity}</div>
                </section>
                <div className="space-y-3">
                  <OrderStatus {...buy} />
                  <div className="flex items-center gap-3 text-sm">
                    <p>Ordered on:</p>
                    <p className="">{makeDateDaysAfter(createdAt, 0)}</p>
                  </div>
                </div>
              </div>

              {/* MARK: LOWER PORTION */}
              <div className="flex justify-between items-center">
                {/* MARK: ADDRESS */}
                <div className="flex mt-1 gap-3 text-sm">
                  <p>Address:</p>
                  <div className="cursor-pointer">
                    <p className="text-sm">{address}</p>
                    <div className="flex">
                      <p className="text-sm">{district},</p>
                      <p className="ml-2 text-sm">{state}</p>
                      <p className="mx-1">-</p>
                      <p>{pinCode}</p>
                    </div>
                  </div>
                </div>

                {/* MARK: CANCEL ORDER */}
                <div className="flex gap-2">
                  {!isReturned && !isCancelled && isDelievered && (
                    <Link to={`/orders/return/${_id}`}>
                      <p className="cursor-pointer py-2 px-4 border rounded-md">
                        Return Order
                      </p>
                    </Link>
                  )}
                  {!isCancelled && !isReturned && !isDelievered && (
                    <Link to={`/orders/cancel/${_id}`}>
                      <p className="cursor-pointer py-2 px-4 border rounded-md">
                        Cancel Order
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </section>
  );
};

export default UserOrders;
