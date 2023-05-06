//cd MyStartup/ThreadWear/threadwear
//npm run both
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductState from "./Context/products/ProductState";
import Item from "./Components/Item";
import Design from "./Components/Design";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import CartState from "./Context/carts/CartState";
import Cart from "./Components/Cart";
import "./App.css";

function App() {
  return (
    <div>
      <ProductState>
        <CartState>
          <Router>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/item" element={<Item />} />
              <Route exact path="/design" element={<Design />} />
            </Routes>
            <About />
          </Router>
        </CartState>
      </ProductState>
    </div>
  );
}

export default App;
