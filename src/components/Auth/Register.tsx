import { useForm } from "react-hook-form";
import { FaUserAlt, FaLock, FaEnvelope, FaImage } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { url } from "../../utils/Url";
import toast from "react-hot-toast";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  file: FileList | null;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  const navigate = useNavigate();
  const onSubmit = async (data: RegisterData) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);

    if (data.file && data.file[0]) {
      formData.append("file", data.file[0]);
    }

    try {
      const response = await axios.post(`${url}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200 || response.status === 201) {
        const cookies = new Cookies();
        cookies.set("accessToken", response.data.accessToken);
        cookies.set("refreshToken", response.data.refreshToken);
        toast.success("User Created Successfully");
        navigate("/UserProfile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating user");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: -100, y: -100, rotate: -10 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotate: 0,
      }}
      transition={{
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        type: "spring",
        stiffness: 90,
        damping: 10,
      }}
      className="p-6 bg-[#183D3D] rounded-lg w-full max-w-md mx-auto sm:mx-auto lg:max-w-lg lg:p-8 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Register
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        encType="multipart/form-data"
      >
        {/* Username */}
        <label
          htmlFor="username"
          className="flex text-sm font-medium text-white"
        >
          Enter your Username
        </label>
        <motion.div
          className="flex items-center border rounded-lg px-3 py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaUserAlt className="text-gray-300 mr-2" />
          <input
            type="text"
            id="username"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            className="w-full outline-none bg-inherit text-white"
          />
        </motion.div>
        {errors.username && (
          <p className="text-red-500 text-sm">
            {String(errors.username.message)}
          </p>
        )}
        
        <label htmlFor="email" className="flex text-sm font-medium text-white">
          Enter your Email
        </label>
        <motion.div
          className="flex items-center border rounded-lg px-3 py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaEnvelope className="text-gray-300 mr-2" />
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full outline-none bg-inherit text-white"
          />
        </motion.div>
        {errors.email && (
          <p className="text-red-500 text-sm">{String(errors.email.message)}</p>
        )}

        <label
          htmlFor="password"
          className="flex text-sm font-medium text-white"
        >
          Enter your Password
        </label>
        <motion.div
          className="flex items-center border rounded-lg px-3 py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaLock className="text-gray-300 mr-2" />
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full outline-none bg-inherit text-white"
          />
        </motion.div>
        {errors.password && (
          <p className="text-red-500 text-sm">
            {String(errors.password.message)}
          </p>
        )}

        <label
          htmlFor="profilePicture"
          className="flex text-sm font-medium text-white"
        >
          Enter your Profile Picture
        </label>
        <motion.div
          className="flex items-center border rounded-lg px-3 py-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaImage className="text-gray-300 mr-2" />
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            {...register("file")}
            className="w-full outline-none bg-inherit text-white"
            placeholder="Choose profile picture"
          />
        </motion.div>

        <motion.button
          type="submit"
          className="w-full px-6 py-2 text-white bg-[#21684e] rounded hover:bg-white hover:text-[#325c4d] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#93B1A6] focus:ring-opacity-75"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Register;
