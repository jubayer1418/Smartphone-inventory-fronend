import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/api/authapi";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { AuthState, setUser } from "../redux/features/auth/authSlice";
type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const [userLogin] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Please wait...");
    try {
      
      const res = await userLogin(data).unwrap();
      console.log(res);
      const user = verifyToken(res.data.token) as AuthState;
      dispatch(setUser({ user, token: res.data.token }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/all-products`);
    } catch (error) {
      toast.error(`${ error.data.message}`, { id: toastId, duration: 2000 });
      console.log(error);
    }
  };
  return (
    <div className="hero min-h-screen bg-[#191D26]">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-white">
            Login to SmartPhone Inventory account
          </h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password")}

                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <div className="mt-4">
              <p className=" text-sm text-gray-600">
                Don't have an account yet?
                <Link
                  className="font-semibold text-gray-800 hover:underline focus:text-gray-800 focus:outline-none ms-1 text-md"
                  to={"/register"}
                >
                  register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
