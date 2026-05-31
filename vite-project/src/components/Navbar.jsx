import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/login"); 
  };

  return (
    <>
      <div className="top-bar">
        Free standard shipping on orders $199+
      </div>

      <nav className="navbar">

        <div className="logo">
          <Link to="/">
            <img
              src="https://boots.oceanwp.org/wp-content/uploads/2021/01/blogo.png"
              alt="Boots"
            />
          </Link>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/home" className="nav-item">HOME</Link>
          <Link to="/our-shoes" className="nav-item">OUR SHOES</Link>
          <Link to="/our-blog" className="nav-item">OUR BLOG</Link>
          <Link to="/contact" className="nav-item">CONTACT</Link>

          <button className="nav-item logout-btn" onClick={logout}>
            LOGOUT
          </button>
        </div>

        <div className="right-icons">
          <Link to="/cart" className="cart">
            🛒 <span className="cart-badge">{cartCount}</span>
          </Link>
        </div>

      </nav>
    </>
  );
}

export default Navbar;