import { useEffect, useState } from "react";
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 

function OurShoes() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0); 

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));

    fetch("https://boots-backend.onrender.com/pro/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []))
      .catch((err) => console.log("Error:", err));
  }, []);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = existingCart.find((item) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1; 
    } else {
      existingCart.push({ ...product, quantity: 1 }); 
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    
    setCartCount(existingCart.reduce((acc, item) => acc + item.quantity, 0));
    alert(`${product.name} added to cart! 🛒`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar cartCount={cartCount} />

      <div className="shop-page-container" style={{ flex: 1 }}>
        <h1>Shop</h1>
        <p className="shop-subtitle">This is where you can browse products in this store.</p>

        <div className="products-grid">
          {products.map((item) => (
            <div key={item._id} className="product-card">
              
              <div className="product-img-wrapper">
                <img src={item.image} alt={item.name} />
                
                <button className="shop-add-to-cart-btn" onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </button>
              </div>

              <div className="product-info">
                <p className="category">{item.category || "Shoes"}</p>
                <h4>{item.name}</h4>
                <div className="stars">⭐⭐⭐⭐⭐</div>
                <p className="price">₹{item.price}</p>
              </div>

            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default OurShoes;