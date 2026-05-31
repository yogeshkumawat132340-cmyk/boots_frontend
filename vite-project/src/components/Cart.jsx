import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [tempCart, setTempCart] = useState([]); 
  const [isUpdated, setIsUpdated] = useState(false); 
  const [hasChanges, setHasChanges] = useState(false); 
  const [recommendedProducts, setRecommendedProducts] = useState([]); 
  const [cartCount, setCartCount] = useState(0); 

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCart);
    setTempCart(savedCart);

    const totalCount = savedCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount);

    fetch("http://localhost:8080/pro/products")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = data.data || [];
        setRecommendedProducts(allProducts.slice(2, 4)); 
      })
      .catch((err) => console.log(err));
  }, []);

  const handleTempQtyChange = (id, amount) => {
    const updatedTemp = tempCart.map(item =>
      item._id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    );
    setTempCart(updatedTemp);
    setHasChanges(true); 
  };

  const handleUpdateCart = () => {
    setCartItems(tempCart);
    localStorage.setItem("cartItems", JSON.stringify(tempCart));
    
    const totalCount = tempCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount);

    setHasChanges(false);
    setIsUpdated(true);
    setTimeout(() => setIsUpdated(false), 3000);
  };

  const removeItem = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      const updatedCart = cartItems.filter(item => item._id !== id);
      setCartItems(updatedCart);
      setTempCart(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      const totalCount = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalCount);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="page-wrapper">
      <Navbar cartCount={cartCount} />

      <div className="cart-page-container">
        {isUpdated && <div className="cart-updated-alert">✓ Cart updated.</div>}

        <h1>Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart-message">
            <h2>Your cart is currently empty.</h2>
            <Link to="/our-shoes" className="return-shop-btn">Return to Shop</Link>
          </div>
        ) : (
          <div className="cart-main-layout">
            
            <div className="cart-left-section">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {tempCart.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <button className="remove-item-btn" onClick={() => removeItem(item._id)}>✕</button>
                      </td>
                      <td>
                        <div className="cart-product-info">
                          <img src={item.image} alt={item.name} className="cart-product-img" />
                          <Link to={`/product/${item._id}`} className="cart-product-name">{item.name}</Link>
                        </div>
                      </td>
                      <td>₹{item.price}</td>
                      <td>
                        <div className="cart-qty-box">
                          <button className="cart-qty-btn" onClick={() => handleTempQtyChange(item._id, -1)}>-</button>
                          <span className="cart-qty-value">{item.quantity}</span>
                          <button className="cart-qty-btn" onClick={() => handleTempQtyChange(item._id, 1)}>+</button>
                        </div>
                      </td>
                      <td className="item-subtotal">₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="cart-actions-row">
                <div className="coupon-box">
                  <input type="text" placeholder="Coupon code" className="coupon-input" />
                  <button className="apply-coupon-btn">Apply coupon</button>
                </div>
                <button 
                  className={`update-cart-btn ${hasChanges ? "active-ready" : ""}`}
                  onClick={handleUpdateCart}
                  disabled={!hasChanges}
                >
                  Update cart
                </button>
              </div>

              {/* रिकमेंडेड प्रोडक्ट्स */}
              <div className="cross-sells-section">
                <h3 className="cross-sells-title">You may be interested in…</h3>
                <div className="cross-sells-grid">
                  {recommendedProducts.map((prod) => (
                    <Link key={prod._id} to={`/product/${prod._id}`} className="cross-product-card">
                      <img 
                        src={prod.image} 
                        className="cross-product-img" 
                        alt={prod.name} 
                        onError={(e) => e.target.src = "https://boots.oceanwp.org/wp-content/uploads/2021/01/product-3.jpg"}
                      />
                      <div>
                        <h4>{prod.name}</h4>
                        <span>₹{prod.price}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* राइट टोटल सेक्शन */}
            <div className="cart-right-section">
              <div className="cart-totals-box">
                <h2>Cart totals</h2>
                <div className="totals-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="totals-row grand-total">
                  <span>Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <button className="checkout-btn" onClick={() => alert("Proceeding to Checkout... 💳")}>
                  Proceed to checkout
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* 2. आपका इम्पोर्टेड फुटर */}
      <Footer />
    </div>
  );
}

export default Cart;