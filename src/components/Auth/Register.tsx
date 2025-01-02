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

  const navigate=useNavigate();
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
      if (response.status === 200||response.status === 201) {
        const cookies = new Cookies();
        cookies.set("accessToken",response.data.accessToken);
        cookies.set("refreshToken",response.data.refreshToken);
        toast.success("User Created Successfully");
        navigate("/UserProfile");

      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaUserAlt className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            className="w-full outline-none text-gray-800"
          />
        </div>
        {errors.username && (
          <p className="text-red-500 text-sm">{String(errors.username.message)}</p>
        )}

        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaEnvelope className="text-gray-400 mr-2" />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full outline-none text-gray-800"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm">{String(errors.email.message)}</p>
        )}

        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaLock className="text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full outline-none text-gray-800"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{String(errors.password.message)}</p>
        )}

        <div className="flex items-center border rounded-lg px-3 py-2">
          <FaImage className="text-gray-400 mr-2" />
          <input
            type="file"
            accept="image/png"
            {...register("file")}
            className="w-full outline-none text-gray-800"
            placeholder="ma"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Register
        </button>
      </form>
    </motion.div>
  );
};

export default Register;
