import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AddProduct from "./Components/ProductComponent";
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Products from "./Components/Products";
import UpdateProduct from "./Components/UpdateComponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/logout" element={<h1>logout</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
