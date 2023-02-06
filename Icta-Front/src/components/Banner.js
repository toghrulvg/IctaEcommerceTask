import React from 'react'
function
  Banner() {
  return (
    <div>
      <section
        id="banner"
        style={{ backgroundImage: 'url("/images/home/bg-1.jpg")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
              <div className="banner-detail">
                <span>Assos</span>
                <h1>New Collection</h1>
                <button>
                  <a >Shop Now</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}

export default Banner
