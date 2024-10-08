import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../assets/icons";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { localStorageState } from "../redux/slice/localStorageSlice";
import useLoginCheck from "../hooks/auth/useLoginCheck";
import { getReq } from "../utils/api/api";
import OnClickOutside from "../lib/OnClickOutside";
import Toastify from "../lib/Toastify";
import { QueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import CustomImages from "../assets/images";
import { useForm } from "react-hook-form";
import debounce from "../utils/javascript/debounce";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useSelector(localStorageState);
  const { data: user } = useLoginCheck();
  const [searchList, setSearchList] = useState([]);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showClearAll, setShowClearAll] = useState(false);

  const queryClient = new QueryClient();

  const { register, reset } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const { ToastContainer, showErrorMessage } = Toastify();

  const callback = () => {
    setShowUserInfo(false);
  };

  const { ref } = OnClickOutside(callback);

  const handleLogout = async () => {
    try {
      await getReq("/auth/logout");
      navigate("/login");
      localStorage.removeItem("_cart");
      localStorage.removeItem("_wishlist");
      localStorage.removeItem("_cou");
      localStorage.removeItem("_add");
      localStorage.removeItem("_exra");
      Cookies.remove("_ut");
      queryClient.clear();
      window.location.reload();
    } catch (error) {
      showErrorMessage({ message: error.message });
    }
  };

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      try {
        const products = await getReq("/search", { q: query });
        setSearchList(products);
      } catch (error) {
        showErrorMessage({ message: error.message });
      }
    }, 1000),
    []
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission behavior
      const query = e.target.value;
      navigate(`/search?q=${query}`);
      setSearchList([]);
    }
  };

  const handleChange = (value) => {
    if (!value) {
      setSearchList([]);
      setShowClearAll(false);
      return;
    }
    setShowClearAll(true);
    debouncedSearch(value);
  };

  const resetSearch = () => {
    setSearchList([]);
    setShowClearAll(false);
    reset();
  };

  return (
    <>
      <section className="w-full flex justify-between items-center px-40 gap-5 sm_lap:px-20 tablet:px-10 mobile:gap-3 mobile:px-2 h-full absolute z-10 ">
        {/* MARK: APP LOGO */}
        <Link to={`/`} className="tablet:hidden">
          <div className="cursor-pointer w-40">
            <img src={CustomImages.logo} className="w-full object-cover" />
          </div>
        </Link>

        <Link to={`/`} className="hidden tablet:flex">
          <div className="cursor-pointer w-10">
            <img src={CustomImages.smallLogo} className="w-full object-cover" />
          </div>
        </Link>

        {/* MARK: SEARCH BAR */}
        <form className="flex-1 relative flex justify-between items-center border border-white  rounded-3xl">
          <input
            type="text"
            {...register("search")}
            spellCheck="false"
            autoComplete="off"
            placeholder="Search Products"
            className="bg-inherit px-5 py-2 w-full"
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {showClearAll ? (
            <p
              className="px-5 py-2 flex justify-center items-center cursor-pointer whitespace-nowrap text-xs"
              onClick={resetSearch}
            >
              Clear All
            </p>
          ) : (
            <p className="px-5 py-2 flex justify-center items-center">
              <Icons.search className="text-xl" />
            </p>
          )}
          {searchList.length > 0 && (
            <div className="absolute z-50 w-full top-full mt-1 bg-white text-black border border-black rounded-lg max-h-96 overflow-y-auto">
              {searchList.map((product, i, array) => {
                const { _id, title } = product;
                return (
                  <div
                    key={_id}
                    className={`${
                      array.length - 1 !== i ? "border-b border-black" : ""
                    } p-2 `}
                  >
                    <Link to={`/products/${_id}`} onClick={resetSearch}>
                      {title}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </form>

        {/* MARK: USER PROFILE */}
        <div className="h-full relative flex flex-col items-center justify-center">
          <div
            ref={ref}
            className="flex justify-center items-center gap-[6px] cursor-pointer"
            onClick={() => setShowUserInfo((prev) => !prev)}
          >
            <p className="w-8">
              <img
                src={user.photo}
                loading="lazy"
                className="w-full rounded-full object-cover "
              />
            </p>
            <p className="mobile:hidden">{user.name.split(" ")[0]}</p>
            <p className="text-xs">
              {showUserInfo ? (
                <Icons.upArrow className="" />
              ) : (
                <Icons.downArrow />
              )}
            </p>
          </div>
          {showUserInfo && (
            <div className="mobile:self-end mobile:-mr-16 absolute z-10 top-full bg-white shadow-2xl shadow-slate-700 w-64 text-black">
              <Link to={`/user/orders`} onClick={() => setShowUserInfo(false)}>
                <p className="py-3 border-b px-4 cursor-pointer">My Orders</p>
              </Link>
              <Link to={`/wishlist`} onClick={() => setShowUserInfo(false)}>
                <p className="py-3 border-b px-4 cursor-pointer">Wishlist</p>
              </Link>
              <Link to={`/user`} onClick={() => setShowUserInfo(false)}>
                <p className="py-3 border-b px-4 cursor-pointer">Profile</p>
              </Link>
              <p
                className="py-3 border-b px-4 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </p>
            </div>
          )}
        </div>

        {/* MARK: CART */}
        <Link to={`/cart`}>
          <div className="flex gap-1">
            <div className="relative cursor-pointer">
              <Icons.cart className="text-2xl" />
              <p className="absolute z-50 bottom-full right-0 text-xs -mb-1 mr-[6px]">
                {cart.length}
              </p>
            </div>
            <p className="tracking-wide">Cart</p>
          </div>
        </Link>
      </section>
      <ToastContainer />
    </>
  );
};

export default Navbar;
