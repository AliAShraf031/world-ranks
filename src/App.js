import "./App.css";
import { Outlet, Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import ViewCountry from "./pages/ViewCountry/ViewCountry";
import logo from "./assets/images/Logo.svg";

function App() {
  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="" />
      </div>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="" element={<Home />} />
          <Route path="view/:countryName" element={<ViewCountry />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
