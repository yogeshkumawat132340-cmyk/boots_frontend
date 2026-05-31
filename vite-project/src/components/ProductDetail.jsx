import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 

function ProductDetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description"); 
  const [thumbnails, setThumbnails] = useState([]);
  const [cartCount, setCartCount] = useState(0); 

  useEffect(() => {
    window.scrollTo(0, 0); 

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(total);

    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = data.data || [];
        const found = allProducts.find((item) => item._id === id);
        
        if (found) {
          setProduct(found);
          setMainImage(found.image); 
          
          const categoryImages = allProducts
            .filter((item) => item.category === found.category)
            .map((item) => item.image)
            .slice(0, 3);
          setThumbnails([found.image, ...categoryImages]);

          const related = allProducts.filter(
            (item) => item.category === found.category && item._id !== found._id
          );
          setRelatedProducts(related.slice(0, 4)); 
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = existingCart.find((cartItem) => cartItem._id === product._id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      existingCart.push({ ...product, quantity: quantity });
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
        const total = existingCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(total);

    alert(`Product added to cart 🛒`);
  };

  if (loading) return <h2 className="detail-status-text">Loading...</h2>;
  if (!product) return <h2 className="detail-status-text">Product Not Found!</h2>;

  return (
    <div className="product-detail-page">
      
      <Navbar cartCount={cartCount} />

      <div className="detail-container">
        
        <div className="detail-upper-section">
          
          {/* LEFT: IMAGES */}
          <div className="detail-images-wrapper">
            <div className="main-image-box">
              <img src={mainImage} alt={product.name} />
            </div>
            
            <div className="thumbnails-grid">
              {thumbnails.map((imgUrl, idx) => (
                <img 
                  key={idx} 
                  src={imgUrl} 
                  alt="thumb"
                  onClick={() => setMainImage(imgUrl)}
                  className={`thumb-img ${mainImage === imgUrl ? "active-thumb" : ""}`}
                />
              ))}
            </div>
          </div>

          <div className="detail-info-wrapper">
            <h1 className="p-detail-title">{product.name}</h1>
            <h2 className="p-detail-price">₹{product.price}</h2>
            <p className="p-detail-category">Category: {product.category}</p>
            <hr className="detail-divider" />

            <p className="product-highlights">
              Premium quality design, crafted for ultimate everyday comfort and perfect durability.
            </p>

            <div className="qty-cart-row">
              <div className="qty-selector-box">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span className="qty-num">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>

              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* MID SECTION: DESCRIPTION TABS */}
        <div className="tabs-section">
          <div className="tabs-header-row">
            <span 
              onClick={() => setActiveTab("description")} 
              className={`tab-trigger ${activeTab === "description" ? "tab-active" : ""}`}
            >
              Description
            </span>
            <span 
              onClick={() => setActiveTab("reviews")} 
              className={`tab-trigger ${activeTab === "reviews" ? "tab-active" : ""}`}
            >
              Reviews
            </span>
          </div>
          <div className="tab-content-area">
            {activeTab === "description" ? (
              <p>Discover the perfect blend of luxury and comfort with our premium shoes. Meticulously crafted using high-quality materials.</p>
            ) : (
              <p><strong>Rahul S.</strong> - ⭐⭐⭐⭐⭐ "Amazing fit! Highly recommended."</p>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h3 className="related-title">Related products</h3>
            <div className="video-related-grid">
              {relatedProducts.map((item) => (
                <div key={item._id} className="video-product-card">
                  <Link to={`/product/${item._id}`} className="related-product-link">
                    <div className="card-img-wrapper">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <h4 className="related-item-title">{item.name}</h4>
                    <p className="related-item-price">₹{item.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <Footer />

    </div>
  );
}

export default ProductDetail;