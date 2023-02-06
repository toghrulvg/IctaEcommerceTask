import { Button, Form, FormGroup } from 'react-bootstrap';
import { useParams,useNavigate } from "react-router-dom";
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
  const [imageInput, setImageInput] = useState("");
  const navigate = useNavigate();

  //product for id
  async function Getproduct() {
    await axios.get(`${url}/api/Product/Get?id=${id}`).then((res) => {
      setproduct(res.data);
      setName(res.data.name);
      setCount(res.data.count);
      setPrice(res.data.price);
      setImageInput(res.data.image);
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

  async function Updateproduct(e) {
    e.preventDefault(e);
    await axios
      .put(`${url}/api/Product/Update/${id}`, {
        id: id,
        name: name,
        price: price,
        count: count,
        image: imageInput,

      })
      .then((res) => {
        if (res.data.status === "success" || res.status === 200) {
          Success.fire({
            icon: "success",
            title: "Product successfully Updated",
          });
          navigate("/productTable");
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
      setImageInput(result);
    });
  }

  return (
    <div>

      <div className='container'>
        <Form onSubmit={(e) => Updateproduct(e)} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" placeholder="Product Name" onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicNumber">
            <Form.Label>Count</Form.Label>
            <Form.Control type="number" placeholder="Count " onChange={(e) => setCount(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDatetime">
            <Form.Label>Product image</Form.Label>
            <img
              style={{
                width: "200px",
                height: "100px",
                borderRadius: "unset",
                display: "block",
              }}
              src={`data:image/jpeg;base64,${imageInput}`}
              alt=""
            />
            <Form.Control
              type="file"
              onChange={(e) => base64Img(e.target.files[0])}
              defaultValue={imageInput}
            />
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