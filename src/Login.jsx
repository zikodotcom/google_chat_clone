import { useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { useForm } from "react-hook-form";
import { axiosClient } from "./axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userData } from "./feautures/user/userSlice";
function Login() {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setLoading(true);
    await axiosClient
      .post("/login", data)
      .then((res) => {
        if (res.status === 201) {
          dispatch(userData(res.data));

          navigate("/chat");
        }
      })
      .catch((err) => {
        console.log(err);
        setError("email", {
          type: "400",
          message: err.response.data.message,
        });
        setError("password", {
          type: "400",
          message: err.response.data.message,
        });
      });
  };
  // TODO: IF the user logged transfer it to chat route
  useEffect(() => {
    // axiosClient.get("/v1/users").then((res) => {
    //   console.log("object");
    //   navigate("/chat");
    // });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] lg:flex-row ">
      <div className="w-[100%] h-[50vh] flex justify-center lg:h-full">
        <img
          src="https://cdn.dribbble.com/userupload/4714349/file/original-8efac4c1c17b9c90fba8c8ec748d648a.gif"
          alt=""
        />
      </div>
      <div className="w-[100%] h-[70vh] p-4 bg-gray-400 flex flex-col justify-center items-center lg:h-full">
        <h1 className="text-[#344055] font-bold text-5xl my-4">Login</h1>
        <p>Join our chat app and start chatting with friends!</p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-[50%]">
          <div className="relative">
            <EmailIcon className="absolute top-[27px] left-3" />
            <div className="w-full">
              <input
                type="text"
                className="my-4 placeholder:text-gray-2300 w-full  pl-10 py-2 outline-none rounded-md border-2 shadow-sm"
                placeholder="Enter your email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "This field required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message:
                      "The email should be in this format: info@info.com",
                  },
                  max: {
                    value: 50,
                    message: `The email shouldn't passed 100 charachters.`,
                  },
                })}
              />
            </div>
            <div className="w-full">
              <p className="text-red-500 text-sm mt-[-12px]">
                {errors.email?.message}
              </p>
            </div>
          </div>
          <div className="relative">
            <PasswordIcon className="absolute top-[27px] left-3" />
            <div className="w-full">
              <input
                type="password"
                className="my-4 placeholder:text-gray-2300 w-full pl-10 py-2 outline-none rounded-md border-2 shadow-sm"
                placeholder="Enter your password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "The password is required.",
                  },
                  // max: {
                  //     value: 50,
                  //     message: `The password shouldn't passed 50 charachters`
                  // },
                  min: {
                    value: 8,
                    message: `Password must be at least 8 characters long!`,
                  },
                })}
              />
            </div>
            <div className="w-full">
              <p className="text-red-500 text-sm mt-[-12px]">
                {errors.password?.message}
              </p>
            </div>
          </div>
          <div>
            <button
              disabled={isLoading ? true : ""}
              className="bg-bluishGreen-100 px-4 py-2 mt-2 rounded-md text-white text-lg hover:text-bluishGreen-100 hover:bg-white"
            >
              {isLoading ? (
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                "Login"
              )}
            </button>
            <br />
            <Link to="/register"> Register </Link>
          </div>
        </form>
        <h2 className="text-[#344055] my-4 text-2xl relative ele-after">
          <span className="font-bold">Login</span> with others
        </h2>
        <div className="px-6 py-4 border border-gray-1000 rounded-lg flex cursor-pointer">
          <img
            className="w-6 h-6 mr-2"
            src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
            alt=""
          />
          <h4>
            Login with <span className="font-bold">GOOGLE</span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Login;
