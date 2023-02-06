import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../../src/assets/css/home.css"
import Navbar from "./Navbar";


function Product() {
  const url = "https://localhost:7139";

  let token = JSON.parse(localStorage.getItem("token"));

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [products, setProducts] = useState([]);


  const Success = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2400,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const Reject = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2400,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });


  async function GetProducts() {
    await axios.get(`${url}/api/Product/GetAll`).then((res) => {
      setProducts(res.data);
      console.log(res.data)
    });
  }

  useEffect(() => {
    GetProducts();
  }, []);


  //Add products to basket method
  async function AddBasket(id) {
    await axios
      .post(`${url}/api/Basket/AddBasket?id=${id}`, null, config)
      .then((res) => {
        if (res.data.status === "success" || res.status === 200) {
          // basketCount++;
          // localStorage.setItem('basketCount', basketCount);
          //  console.log(basketCount);
          Success.fire({
            icon: "success",
            title: "Product successfully added to basket",
          });
        }console.log(res);
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.data.status === 401) {
          Reject.fire({
            icon: "error",
            title: "You need to login first to add products to basket",
          });
        } else {
          Reject.fire({
            icon: "error",
            title: "Something went wrong!",
          });
        }
      });
  }


  return (
    <div>
      <Navbar/>
    <section id="products">
  <div className="container">
    <div className="row">
      <div className="col-12">
        <div className="product-header">
          <h2>Popular Products</h2>
        </div>
      </div>
      {/* <div id="product-slider" className="owl-carousel"> */}
        
          {products.map((product, key) =>{
            return( 
              <div className="col-lg-3 col-md-6 col-sm-12"key={key}>
                <div className="product" >
              <div className="product-image" product-id={1}>
                <a href="product-detail.html" className="image">
                <img
                      src={`data:image/jpeg;base64,${product.image}`}
                      alt=""
                    />
                  <img
                    src="/images/home/products/acs-1.jpg"
                    className="img-2"
                  />
                </a>
                <span className="discount">Sale</span>
                <button className="cart" onClick={() => AddBasket(product.id)}>
                  Add to Cart
                </button>
                <div className="links">
                  <ul>
                    <li>
                      
                    </li>
                  </ul>
                </div>
                <div className="content">
                  <span className="category">
                    <a href="">Pull &amp; Bear</a>
                  </span>
                  <h3 className="title">
                    <a href="">{product.name}</a>
                  </h3>
                  <div className="price">${product.price}</div>
                </div>
              </div>
              </div>
            </div>)
             
          })}
          
        
        
      {/* </div> */}
    </div>
  </div>
</section>


  </div>
  
  )
}

export default Product