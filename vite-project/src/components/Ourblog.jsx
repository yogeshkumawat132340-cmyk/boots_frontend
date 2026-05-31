import { useEffect, useState } from "react";
import Navbar from "./Navbar"; 
import Footer from "./Footer"; 

function OurBlog() {
  const [cartCount, setCartCount] = useState(0);

  const blogPosts = [
    {
      id: 1,
      category: "Tips",
      title: "Duis sagittis ipsum prasent",
      date: "February 20, 2026",
      comments: "0 Comments",
      image: "https://boots.oceanwp.org/wp-content/uploads/2021/01/IMG6545678.png",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum..."
    },
    {
      id: 2,
      category: "Tips",
      title: "Tortor neque adipiscing diam",
      date: "February 18, 2026",
      comments: "2 Comments",
      image: "https://boots.oceanwp.org/wp-content/uploads/2021/01/img198765.png",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Tortor neque..."
    },
    {
      id: 3,
      category: "Fashion",
      title: "Premium Leather Maintenance Guide",
      date: "February 12, 2026",
      comments: "5 Comments",
      image: "https://boots.oceanwp.org/wp-content/uploads/2021/01/img9876543.png",
      excerpt: "Discover the best kept secrets of shoe cobblers. Learn how a simple condition-and-shine routine can expand your luxury leather boot life by a decade easily..."
    },
    {
      id: 4,
      category: "Trends",
      title: "The Rise of Minimalist Sneakers",
      date: "February 05, 2026",
      comments: "0 Comments",
      image: "https://boots.oceanwp.org/wp-content/uploads/2021/01/IMG9876789.png",
      excerpt: "Fashion meets absolute comfort. This week we break down why modern office culture is quickly adopting plain white custom sole sneakers over traditional oxfords..."
    },
    {
      id: 5,
      category: "Lifestyle",
      title: "Choosing the Right Sole for Adventure",
      date: "January 28, 2026",
      comments: "1 Comment",
      image: "https://boots.oceanwp.org/wp-content/uploads/2021/01/IMG65456789.png",
      excerpt: "Heading to the mountains or concrete jungles? Read our comprehensive review of grip physics, rubber density, and vulcanized soles before your next big buy..."
    },
    {
      id: 6,
      category: "Tips",
      title: "How to Spot Fake Luxury Footwear",
      date: "January 20, 2026",
      comments: "8 Comments",
      image: "https://boots.oceanwp.org/wp-content/uploads/2017/02/img098767890.png",
      excerpt: "Don't fall into the replica trap. Check these 5 crucial indicators—from stitch thread counts to genuine leather smell—to verify your premium brand authenticity..."
    },
    {
      id: 7,
      category: "Fashion",
      title: "Suede Shoes Care Protocol",
      date: "January 14, 2026",
      comments: "3 Comments",
      image: "https://boots.oceanwp.org/wp-content/uploads/2016/08/mocassins-alessandro-201431ZHP7-600x600.png",
      excerpt: "Suede looks spectacular but hates rain and dust. Master the art of liquid-proofing sprays, brass wire brushing, and erasing scuffs without ruining the delicate nap..."
    },
    {
      id: 8,
      category: "History",
      title: "Evolution of the Classic Chelsea Boot",
      date: "January 02, 2026",
      comments: "12 Comments",
      image: "https://boots.oceanwp.org/wp-content/uploads/2016/08/mocassins-alessandro-201431ZHAB-600x600.png",
      excerpt: "From Victorian horse-riding courts to the iconic rock & roll bands of the 1960s. Trace the timeline of the most versatile slip-on boot ever crafted by human hands..."
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar cartCount={cartCount} />

      <div className="blog-page-container" style={{ flex: 1 }}>
        <h1>Our Blog</h1>
        <p className="blog-subtitle">Read the latest insights and shoe care guides from our team.</p>

        <div className="blog-list">
          {blogPosts.map((post) => (
            <div key={post.id} className="blog-post-row">
              
              <div className="blog-img-side">
                <img src={post.image} alt={post.title} />
              </div>

              <div className="blog-content-side">
                <p className="blog-meta-category">{post.category}</p>
                <h2>{post.title}</h2>
                <p className="blog-text-excerpt">{post.excerpt}</p>
                
                <div className="blog-footer-meta">
                  <span className="blog-comments">💬 {post.comments}</span>
                  <span>{post.date}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default OurBlog;