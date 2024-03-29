import { Link, Outlet } from "react-router-dom";
import PriceList from "../components/PriceList";
import { useSelector } from "react-redux";
import { localStorageState } from "../redux/slice/localStorageSlice";

const CartLayout = () => {
  const { cart } = useSelector(localStorageState);
  const cartIds = cart.map((obj) => obj.id);

  if (cartIds.length === 0) {
    return (
      <div className="p-5 bg-gray-100 ">
        <div className="bg-white w-full h-96 flex flex-col gap-4 justify-center items-center">
          <p className="text-lg">Your cart is empty!</p>
          <Link to={`/`}>
            <p className="bg-blue-500 py-3 px-20 text-sm text-white rounded-md">
              Shop Now
            </p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="p-5 bg-gray-100">
      <main className="flex gap-5">
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="bg-white w-96 h-96 sticky top-[100px]">
          <PriceList />
        </div>
      </main>
    </section>
  );
};

export default CartLayout;
