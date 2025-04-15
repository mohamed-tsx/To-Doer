import { Route, Routes } from "react-router";
import Login from "./Pages/Login";
import ProtectedRoute from "./Components/ProtectedRoutes";
import Home from "./Pages/Home";
import Register from "./Pages/Regsiter";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
