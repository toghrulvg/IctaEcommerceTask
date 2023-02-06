import React from 'react'
import "../../src/assets/css/home.css"

function Category() {
  return (
    <div>
    <section id="category">
  <div className="container">
    <div className="row">
      <div className="col-lg-4 col-md-12 col-sm-12">
        <div className="categories">
          <img src="/images/home/bg-2.jpg.webp" alt="" />
          <a >MEN</a>
        </div>
      </div>
      <div className="col-lg-4 col-md-12 col-sm-12">
        <div className="categories">
          <img src="/images/home/bg-3.jpg.webp" alt="" />
          <a >WOMEN</a>
        </div>
      </div>
      <div className="col-lg-4 col-md-12 col-sm-12">
        <div className="categories">
          <img src="/images/home/bg-4.jpg.webp" alt="" />
          <a >ACCESSORIES</a>
        </div>
      </div>
    </div>
  </div>
</section>


  </div>
  
  )
}

export default Category