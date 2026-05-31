import React from "react";
import { useNavigate } from "react-router-dom";
function Hero() {
  const navigate = useNavigate()
  return (
    <div className="hero">

      <div className="hero-left">
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
          alt="shoes"
        />
      </div>

      <div className="hero-right">
        <p className="small-text">NEW COLLECTION</p>

        <h1>BEST SHOES</h1>

        <div className="dots">
          {Array(12).fill().map((_, i) => (
            <span key={i}></span>
          ))}
        </div>

        <p className="desc">
          Best saleable shoes in india and cheap price with best quality .
        </p>

       <button 
  type="button" 
  onClick={() => navigate("/our-shoes")}
>
  VIEW ALL SHOES
</button>
      </div>

    </div>
  );
}

export default Hero;