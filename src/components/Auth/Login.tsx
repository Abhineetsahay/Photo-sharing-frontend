import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/Url";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie";
import { motion } from "framer-motion";

interface LoginFormInputs {
  usernameOrEmail: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await axios.post(
        `${url}/login`,
        {
          username: data.usernameOrEmail,
          email: data.usernameOrEmail,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Login successful!");
        const cookies = new Cookies();
        cookies.set("accessToken", response.data.accessToken);
        cookies.set("refreshToken", response.data.refreshToken);
        navigate("/UserProfile");
      }
    } catch (err: unknown) {
      toast.error("Login failed!");
      console.error("Login error:", err);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-[#183D3D] rounded-lg max-w-md w-full shadow-lg"
      initial={{
        opacity: 0,
        scale: 0.6,
        x: 100,
        y: 100,
        rotate: 15,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotate: 0,
      }}
      transition={{
        duration: 1,
        ease: [0.68, -0.55, 0.27, 1.55],
        type: "spring",
        stiffness: 90,
        damping: 10,
      }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-[#e9eeec]">
        Login
      </h2>
      <div className="mb-4">
        <label
          htmlFor="usernameOrEmail"
          className="block text-sm font-medium text-white"
        >
          Enter your Username or Email
        </label>
        <input
          type="text"
          {...register("usernameOrEmail", { required: "Username or Email is required" })}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#21684e]"
        />
        {errors.usernameOrEmail && (
          <p className="text-red-500 text-sm">{errors.usernameOrEmail.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white"
        >
          Enter your Password
        </label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#21684e]"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <motion.button
        type="submit"
        className="w-full px-6 py-2 text-white bg-[#21684e] rounded hover:bg-white hover:text-[#21684e] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#93B1A6] focus:ring-opacity-75"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Login
      </motion.button>
    </motion.form>
  );
};

export default Login;
