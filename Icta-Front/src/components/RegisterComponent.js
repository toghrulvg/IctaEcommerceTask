import React, { useState } from "react";
import axios from "axios";
import "../../src/assets/css/login-register.css"
import FooterComponent from './FooterComponent'
import Swal from "sweetalert2";
import Navbar from "./Navbar"



function RegisterComponent() {

  const url = "https://localhost:7139";


  //Prop for api start
  const [fullname, setFullname] = useState();
  const [username, setUsername] = useState();
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();

  async function register(e) {
    e.preventDefault();
    await axios
      .post(
        `${url}/api/Account/Register`,
        {
          email: mail,
          password: password,
          fullname: fullname,
          username: username,
        },
        { "Content-Type": "multipart/form-data" }
      )
      .then(function (response) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You registered succesfully",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(response);
      })
      .catch(function (error) { });
  }
  return (
    <>
      <Navbar />
      <section
        id="register-area"
        style={{
          backgroundImage: "url(/images/Register-image.jpg)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12  col-sm-12">
              <div className="main">
                <div className="box">
                  <div className="form">
                    <h2>Register</h2>
                    <form onSubmit={(e) => register(e)}>
                      <div className="inputBox">
                        <input
                          type="text"
                          required="required"
                          onChange={(e) => setFullname(e.target.value)}
                        />
                        <p>Fullname *</p>
                        <i />
                      </div>
                      <div className="inputBox">
                        <input
                          type="text"
                          required="required"
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <p>Username *</p>
                        <i />
                      </div>
                      <div className="inputBox">
                        <input
                          type="text"
                          required="required"
                          onChange={(e) => setMail(e.target.value)}
                        />
                        <p>Email *</p>
                        <i />
                      </div>
                      <div className="inputBox">
                        <input
                          type="password"
                          required="required"
                          id="passwordId"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <p>Password *</p>
                        <i />
                      </div>


                      <input type="submit" defaultValue="Sign up" style={{ marginTop: "27px" }} />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterComponent />
    </>
  );






}

export default RegisterComponent