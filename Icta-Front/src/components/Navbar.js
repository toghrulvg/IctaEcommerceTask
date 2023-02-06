import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../../src/assets/css/home.css"
import Swal from "sweetalert2";
function Navbar() {
  const navigate = useNavigate();




  

  //Logout function
  let currentToken = localStorage.getItem("token");
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Signed out",
      showConfirmButton: false,
      timer: 1500,
    });
  }


  
  return (
    <div>
      <header>
        <section id="nav-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <div className="logo">
                    <a>
                      <img src="/images/home/logo.png" alt="" />
                    </a>
                  </div>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <Link to={"/"}
                          className="nav-link active"
                          aria-current="page"
                        >
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          aria-current="page"
                        >
                          Shop
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          aria-current="page"
                        >
                          Blog
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          aria-current="page"
                        >
                          Contact
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          aria-current="page"
                        >
                          About
                        </a>
                      </li>
                    </ul>
                    <form className="searchh">
                      <div className="search">
                        <input
                          className="search-txt"
                          type="text"
                          name=""
                          placeholder="Search"
                        />
                        <a className="search-btn" >
                          <i className="fas fa-search" />
                        </a>
                      </div>
                    </form>
                    <div className="basket">
                      <Link to={"/basket"}>
                        <i className="fa-solid fa-basket-shopping">
                        </i>
                      </Link>
                    </div>

                    <div className="account">
                      {currentToken == null ? (
                        <Link to={"/login"} className="nav-link" >
                          Login
                        </Link>
                      ) : (
                        <a onClick={handleLogout}  className="log-out">
                          <i className="fa-solid fa-right-from-bracket" />
                        </a>
                      )}
                    </div>
                  </div>
                </nav>
                <div className="line" />
              </div>
            </div>
          </div>
        </section>

      </header>

    </div>

  )
}

export default Navbar