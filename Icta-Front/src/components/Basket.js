import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import FooterComponent from './FooterComponent'
import Navbar from './Navbar'

function Basket() {

  const url = "https://localhost:7139";

  let total = 0;

  let token = JSON.parse(localStorage.getItem("token"));

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [baskets, setBaskets] = useState([]);

  //sweet alert
  const Success = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
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
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  //Get Basket from Api
  async function GetBasket() {
    await axios
      .get(`${url}/api/Basket/GetBasketProducts`, config)
      .then((res) => {
        setBaskets(res.data);      
        console.log(res);
      });
  }
  

  useEffect(() => {
    GetBasket();
  }, []);

  //Delete Basket Product
  const DeleteBasket = async (id) => {
    await axios
      .delete(`${url}/api/Basket/DeleteBasketProduct?id=${id}`, config)
      .then(function (response) {

        // localStorage.setItem('basketCount', basketCount);

        Swal.fire("", "Deleted", "success");
        console.log(response);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
        console.log(error);
      });
     
    GetBasket();
  };

  console.log(baskets.length);







  return (
    <div>
      <Navbar/>
    <div className="container" style={{ paddingTop: 50 }}>
  <table className="table">
    <thead>
      <tr>
        <th scope="col">Image</th>
        <th scope="col">Name</th>
        <th scope="col">Price</th>
        <th scope="col">Quantity</th>
        <th scope="col">Total price</th>
      </tr>
    </thead>
    <tbody>
    {baskets.map((basket, i) => (
                        <tr key={i}>
                          <td>
                            <img
                              style={{
                                width: "100px",
                                height: "70px",
                                borderRadius: "unset",
                               
                              }}
                              src={`data:image/jpeg;base64,${basket.product.image}`}
                              alt=""
                            />
                          </td>
                          <td>{basket.product.name}</td>
                          <td>{basket.quantity} </td>
                          <td>{(basket.product.price).toFixed(2)} $</td>
                          <td>{(basket.product.price * basket.quantity).toFixed(2)} $</td>
                          <td  style={{ display :"none" }} >
                          {(total += basket.product.price * basket.quantity )}
                          </td>
                          <td>
                            <i
                              className="fa fa-trash-o delete-icon"
                              onClick={() => DeleteBasket(basket.product.id)}
                            ></i>
                          </td>
                         
                        </tr>                        
                        ))}
    </tbody>
  </table>
  <div className="total-price">
              <h4>Payment :</h4>
              <p>Total-Price :</p>
              <span>{total.toFixed(2)} $</span>
            </div>
</div>
<FooterComponent/>
</div>
  )
}

export default Basket