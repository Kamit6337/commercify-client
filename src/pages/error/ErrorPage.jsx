import { Link, useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();

  const errMsg =
    location?.state?.error || "Something went Wrong. Login or SignUp again.";

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="h-96 w-[500px] p-6 border border-gray-600 rounded-xl flex flex-col justify-around">
        <p>Error Message</p>
        <p>{errMsg}</p>
        <div className="flex justify-between items-center gap-4">
          <div className="p-3 border border-slate-500 rounded-lg w-full">
            <Link to={`/login`}>Go to Login Page</Link>
          </div>
          <div className="p-3 border border-slate-500 rounded-lg w-full">
            <Link to={`/signup`}>Go to SignUp Page</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
