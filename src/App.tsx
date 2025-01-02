import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Authorize from "./Pages/Authorise";
import User from "./Pages/User";

const App=()=>{
  return(
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/authorise" element={<Authorize/>}/>
        <Route path="/UserProfile" element={<User/>}/>
      </Routes>
    </div>
  )
}
export default App;