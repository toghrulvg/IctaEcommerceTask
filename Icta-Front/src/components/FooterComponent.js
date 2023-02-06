import React from 'react'
import "../../src/assets/css/home.css"

function FooterComponent() {
  return (
    <div>
        <footer>
  <section id="footer-part">
    <div className="container">
      <div className="row">
        <div className="col-3">
          <h4>Company</h4>
          <ul>
            <li>
              <a >About us</a>
            </li>
            <li>
              <a >Blog</a>
            </li>
            <li>
              <a >Privacy policy</a>
            </li>
          </ul>
          <div className="copy" />
        </div>
        <div className="col-3">
          <h4>Get Help</h4>
          <ul>
            <li>
              <a>FAQ</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>
        <div className="col-3">
          <h4>Online Shop</h4>
          <ul>
            <li>
              <a>Men</a>
            </li>
            <li>
              <a>Women</a>
            </li>
            <li>
              <a >Accessories</a>
            </li>
          </ul>
        </div>
        <div className="col-3">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a>
              <i className="fa-brands fa-facebook" />
            </a>
            <a>
              <i className="fa-brands fa-instagram" />
            </a>
            <a>
              <i className="fa-brands fa-twitter" />
            </a>
            <br />
            <a >
              <i className="fa-brands fa-linkedin" />
            </a>
            <a>
              <i className="fa-brands fa-youtube" />
            </a>
            <a>
              <i className="fa-brands fa-pinterest" />
            </a>
          </div>
        </div>
        <span>
          Copyright ©2022 All rights reserved 
        </span>
      </div>
    </div>
  </section>
</footer>

    </div>
  )
}

export default FooterComponent
