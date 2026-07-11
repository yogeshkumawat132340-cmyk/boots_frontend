import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Arrival() {
  const [luxuryShoes, setLuxuryShoes] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://boots-backend.onrender.com/pro/products");
        
        if (!response.ok) {
          throw new Error(`सर्वर एरर! स्टेटस: ${response.status}`);
        }

        const result = await response.json();
        
        const allProducts = result.data || [];

        const filteredShoes = allProducts.filter(
          (item) => item && item.category && item.category.toLowerCase().trim() === "luxury shoes"
        );

        setLuxuryShoes(filteredShoes);
      } catch (err) {
        console.error("डेटा लोड करने में दिक्कत आई है:", err.message);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (e, item) => {
    e.preventDefault();

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = existingCart.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    alert(`${item.title || "Product"} added to cart 🛒`);
  };

  return (
    <section className="newArrivals">
      <h1 className="arrivals-title">NEW ARRIVALS (LUXURY SHOES)</h1>

      <div className="video-product-grid">
        {luxuryShoes.length === 0 ? (
          <p className="no-products">
            No luxury shoes available right now. 
            <br />
            <span style={{ fontSize: "14px", color: "#888" }}>
            </span>
          </p>
        ) : (
          luxuryShoes.map((item) => (
            <div key={item._id} className="video-product-card">
              <div className="card-img-wrapper">
                <img src={item.image} alt={item.title} />

                <button
                  className="sliding-cart-btn"
                  onClick={(e) => handleAddToCart(e, item)}
                >
                  Add to Cart
                </button>

                <div className="card-actions-overlay">
                  <button
                    className="action-icon-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Added to Wishlist! ❤️");
                    }}
                  >
                    ❤️
                  </button>
                </div>
              </div>

              <Link to={`/product/${item._id}`} className="product-link">
                <p className="product-category">{item.category}</p>
                <h2 className="product-name">{item.title}</h2>
                <div className="product-rating">⭐⭐⭐⭐⭐</div>
                <h3 className="product-price">₹{item.price}</h3>
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Arrival;