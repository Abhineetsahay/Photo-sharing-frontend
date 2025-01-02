import { Link } from "react-router-dom";

const Home = () => {
     
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-md hover:scale-105 transition-all">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to Private Photosharing Website
          </h1>
          <p className="text-gray-600 mb-6">
            Share your memories securely and privately with your loved ones.
          </p>
          <Link 
            to="/authorise" 
            className="inline-block px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Authorize Yourself
          </Link>
        </div>
      </div>
    );
  };

export default Home;
