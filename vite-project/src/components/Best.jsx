import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BestSeller() {
  const [shoesProducts, setShoesProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // यहाँ यूआरएल अगर /pro/products पर डेटा न मिले, तो सिर्फ "http://localhost:8080/pro" करके देख लेना
    fetch("http://localhost:8080/pro/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((result) => {
        console.log("बैकएंड से आया हुआ असली डेटा:", result);

        // सेफ चेक: अगर डेटा सीधे एरे है, या result.data में है, या result.products में है
        let allProducts = [];
        if (Array.isArray(result)) {
          allProducts = result;
        } else if (result && Array.isArray(result.data)) {
          allProducts = result.data;
        } else if (result && Array.isArray(result.products)) {
          allProducts = result.products;
        }

        // कैटेगरी 'shoes' के हिसाब से फिल्टर करना
        const filteredShoes = allProducts.filter(
          (item) => item.category && item.category.toLowerCase() === "shoes"
        );

        setShoesProducts(filteredShoes);
        setLoading(false);
      })
      .catch((err) => {
        console.error("डेटा फेच करने में एरर आया भाई:", err);
        setLoading(false);
      });
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
    alert(`${item.title} कार्ट में जुड़ गया! 🛒`);
  };

  return (
    <section className="bestSeller">
      <h1 className="bestseller-title">BEST SELLERS (SHOES)</h1>

      <div className="video-product-grid">
        {loading ? (
          <p className="loading-text">Loading items, please wait...</p>
        ) : shoesProducts.length === 0 ? (
          <p className="no-products-error">
            No shoes available right now. (Check Console if database has products)
          </p>
        ) : (
          shoesProducts.map((item) => (
            <div key={item._id} className="video-product-card">
              
              <div className="card-img-wrapper">
                {/* अगर इमेज का पूरा URL नहीं है तो बैकएंड का पाथ जोड़ने के लिए: http://localhost:8080${item.image} */}
                <img src={item.image} alt={item.title} />
                
                <button className="sliding-cart-btn" onClick={(e) => handleAddToCart(e, item)}>
                  Add to Cart
                </button>

                <div className="card-actions-overlay">
                  <button className="action-icon-btn" onClick={(e) => { e.preventDefault(); alert("Wishlist में जुड़ गया! ❤️"); }}>🤍</button>
                  <button className="action-icon-btn" onClick={(e) => e.preventDefault()}>🔄</button>
                </div>
              </div>

              {/* नीचे का हिस्सा: प्रोडक्ट की जानकारी */}
              <Link to={`/product/${item._id}`} className="bestseller-product-link">
                <p className="bestseller-product-category">{item.category}</p>
                <h2 className="bestseller-product-title">{item.title}</h2>
                <div className="bestseller-product-rating">⭐⭐⭐⭐⭐</div>
                <h3 className="bestseller-product-price">₹{item.price}</h3>
              </Link>

            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default BestSeller;