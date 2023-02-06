import { Button, Form,FormGroup } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios';



function ProductUpdate() {
    const { id } = useParams();

    const url = "https://localhost:7139";

    const [product, setproduct] = useState([]);
    const [name, setName] = useState();
    const [count, setCount] = useState("");
    const [price, setPrice] = useState("");


    //product for id
  async function Getproduct() {
    await axios.get(`${url}/api/Product/Get?id=${id}`).then((res) => {
      setproduct(res.data);
      setName(res.data.name);
      setCount(res.data.count);
      setPrice(res.data.price);
      console.log(res.data);
    });
  }

  useEffect(() => {
    Getproduct();
  }, []);





      //sweet alert
  const Success = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
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
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

    async function Product(e) {
        e.preventDefault(e);   

        await axios
          .put(`${url}/api/Product/Update`, {
            name: name,
            price: price,
            count: count,
           
          })
          .then((res) => {
            if (res.data.status === "success" || res.status === 200) {
              Success.fire({
                icon: "success",
                title: "Product successfully Updated",
              });
            }
            console.log(res);
          })
          .catch((err) => {
            if (err.response.status === 400 || err.response.data.status === 400) {
              Reject.fire({
                icon: "error",
                title: "Please fill the blank",
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

            <div className='container'>
                <Form onSubmit={(e) => ProductUpdate(e)} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Product Name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                   
                    <Form.Group className="mb-3" controlId="formBasicNumber">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNumber">
                        <Form.Label>Count</Form.Label>
                        <Form.Control type="number" placeholder="Count "onChange={(e) => setCount(e.target.value)} />
                    </Form.Group>
              
                    <Button variant="primary" type="submit" className='mt-3' >
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ProductUpdate