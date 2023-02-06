import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Category from './components/Category';
import Product from './components/Product';
import ProductCreate from './pages/Admin/ProductCreate';
import ProductUpdate from './pages/Admin/ProductUpdate';
import ProductTable from './pages/Admin/ProductTable';
import FooterComponent from './components/FooterComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import Protection from "./components/Protection";


function App() {
  return (


    <div>

      <Routes>
        <Route exact path="/" element={<Product />} />
        <Route exact path="/login" element={<LoginComponent/>} />
       



        <Route element={<Protection />}>
          <Route exact path="/productTable" element={<ProductTable />} />
          <Route exact path="/productUpdate/:id" element={<ProductUpdate />} />
        </Route>



      </Routes>


    </div>


  );
}

export default App;
