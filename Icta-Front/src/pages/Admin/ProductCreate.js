import React, { useState } from 'react';
import { Button, Form,FormGroup } from 'react-bootstrap';
import Swal from "sweetalert2";
import axios from 'axios';



function ProductCreate() {

    const url = "https://localhost:7139";

    const [name, setName] = useState();
    const [count, setCount] = useState();
    const [price, setPrice] = useState();
    const [image, setImage] = useState();


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

    async function CreateProduct(e) {
        e.preventDefault(e);   

        await axios
          .post(`${url}/api/Product/Create`, {
            name: name,
            price: price,
            count: count,
            image : image

           
          })
          .then((res) => {
            if (res.data.status === "success" || res.status === 200) {
              Success.fire({
                icon: "success",
                title: "Product successfully created",
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

       function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(reader.result.replace("data:", "").replace(/^.+,/, ""));
      reader.onerror = (error) => reject(error);
    });
  }

  function base64Img(file) {
    var base64String = getBase64(file);
    base64String.then(function (result) {
      setImage(result);
    });
  }

    return (
        <div>

            <div className='container'>
                <Form onSubmit={(e) => CreateProduct(e)} >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Product Name" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                   
                    <Form.Group className="mb-3" controlId="formBasicNumber">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNumber">
                        <Form.Label>Count</Form.Label>
                        <Form.Control type="number" placeholder="Count "onChange={(e) => setCount(e.target.value)} />
                    </Form.Group>
                    <input
                  type="file"
                  onChange={(e) => base64Img(e.target.files[0])}
                ></input>
              
                    <Button variant="primary" type="submit" className='mt-3' >
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ProductCreate