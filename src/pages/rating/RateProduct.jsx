import { Link, useNavigate, useParams } from "react-router-dom";
import useSingleProduct from "../../hooks/query/useSingleProduct";
import Loading from "../../containers/Loading";
import { useForm } from "react-hook-form";
import Toastify from "../../lib/Toastify";
import changePriceDiscountByExchangeRate from "../../utils/javascript/changePriceDiscountByExchangeRate";
import { useSelector } from "react-redux";
import { currencyState } from "../../redux/slice/currencySlice";
import { Icons } from "../../assets/icons";
import { useEffect, useState } from "react";
import { postReq } from "../../utils/api/api";
import useProductRatings from "../../hooks/query/useProductRatings";

const RateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { symbol, exchangeRate } = useSelector(currencyState);
  const { isLoading, error, data } = useSingleProduct(id);
  const { refetch } = useProductRatings(id);
  const [starSelected, setStarSelected] = useState(0);
  const { ToastContainer, showErrorMessage, showAlertMessage } = Toastify();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      comment: "",
    },
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full h-96">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        {error?.message}
      </div>
    );
  }

  const { title, description, price, discountPercentage, thumbnail } =
    data.data;

  const onSubmit = async (data) => {
    if (starSelected === 0) {
      showAlertMessage({ message: "Please select star to rate product" });
      return;
    }

    const { title, comment } = data;

    try {
      await postReq("/ratings", {
        id,
        rate: starSelected,
        title,
        comment,
      });
      refetch();
      navigate(`/products/${id}`);
    } catch (error) {
      showErrorMessage({ message: error.message });
    }
  };

  const { exchangeRatePrice, discountedPrice, roundDiscountPercent } =
    changePriceDiscountByExchangeRate(price, discountPercentage, exchangeRate);

  return (
    <>
      <section className="bg-gray-100 p-5">
        <main className="bg-white ">
          <p className="border-b-2 text-xl font-semibold p-5">
            Rate and Review the Order
          </p>

          <div className="space-y-10">
            <div className="p-7">
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
                <section className="flex-1 flex flex-col gap-4">
                  <div>
                    <Link to={`/products/${id}`}>
                      <p>{title}</p>
                    </Link>
                    <p className="text-xs">{description}</p>
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
                </section>
              </div>
            </div>

            {/* MARK: FORM */}
            <form
              className="px-7 pb-7 space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex gap-5 items-center">
                <p className="text-lg">Rate the Product</p>
                <div className="flex text-2xl h-10">
                  {Array.from({ length: 5 }).map((value, i) => {
                    const newI = i + 1;

                    if (newI <= starSelected) {
                      return (
                        <p
                          key={i}
                          className="cursor-pointer hover:text-3xl duration-300 w-8 flex items-center justify-center"
                          onClick={() => setStarSelected(i + 1)}
                        >
                          <Icons.star className="text-yellow-300" />
                        </p>
                      );
                    }

                    return (
                      <p
                        key={i}
                        className="cursor-pointer hover:text-3xl duration-300 w-8 flex items-center justify-center"
                        onClick={() => setStarSelected(i + 1)}
                      >
                        <Icons.star_empty className="" />
                      </p>
                    );
                  })}
                </div>
              </div>

              {/* MARK: TITLE */}
              <div>
                <div className="border">
                  <input
                    type="text"
                    {...register("title", {
                      validate: (value) => {
                        if (value && !getValues().comment) {
                          return "Please provide comment";
                        }
                        return true;
                      },
                    })}
                    placeholder="Title"
                    className="p-3 w-full text-lg font-semibold"
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
                <p className="text-xs text-red-500 h-4 ml-1 mt-1">
                  {errors.comment?.message}
                </p>
              </div>

              {/* MARK: COMMENT */}
              <div>
                <div className="border">
                  <textarea
                    rows={5}
                    {...register("comment", {
                      validate: (value) => {
                        if (value && !getValues().title) {
                          return "Please provide title";
                        }
                        return true;
                      },
                    })}
                    placeholder="Comment on Product"
                    className="p-3 w-full"
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
                <p className="text-xs text-red-500 h-4 ml-1 mt-1">
                  {errors.title?.message}
                </p>
              </div>

              {/* MARK: SUBMIT AND CANCEL */}
              <div className="flex justify-end items-center gap-10">
                <Link to={`/products/${id}`}>
                  <button>Cancel</button>
                </Link>
                <button
                  type="submit"
                  className="rounded cursor-pointer py-3 px-20 bg-slate-600 text-white"
                >
                  {isSubmitting ? <Loading small={true} /> : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </section>
      <ToastContainer />
    </>
  );
};

export default RateProduct;
