import { useEffect, useState } from "react";

function Reviews() {
  const reviews = [
    { 
      id: 1, 
      name: "MARK KERR", 
      text: "Proin at hendrerit nibh. Fusce eget velit nec quam tempus auctor. Pellentesque ut felis a arcu mattis. Vivamus blandit sagittis placerat.", 
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
    },
    { 
      id: 2, 
      name: "MIKE JOHNSON", 
      text: "Proin at hendrerit nibh. Fusce eget velit nec quam tempus auctor. Pellentesque ut felis a arcu mattis. Vivamus blandit sagittis placerat.", 
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" 
    },
    { 
      id: 3, 
      name: "GERARD LOPEZ", 
      text: "Proin at hendrerit nibh. Fusce eget velit nec quam tempus auctor. Pellentesque ut felis a arcu mattis. Vivamus blandit sagittis placerat.", 
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" 
    },
    { 
      id: 4, 
      name: "JUAN SILVA", 
      text: "Proin at hendrerit nibh. Fusce eget velit nec quam tempus auctor. Pellentesque ut felis a arcu mattis. Vivamus blandit sagittis placerat.", 
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80" 
    },
    { 
      id: 5, 
      name: "ERIC NOLTE", 
      text: "Proin at hendrerit nibh. Fusce eget velit nec quam tempus auctor. Pellentesque ut felis a arcu mattis. Vivamus blandit sagittis placerat.", 
      img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80" 
    },
    { 
      id: 6, 
      name: "JONATHAN MARSH", 
      text: "Proin at hendrerit nibh. Fusce eget velit nec quam tempus auctor. Pellentesque ut felis a arcu mattis. Vivamus blandit sagittis placerat.", 
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80" 
    },
  ];

  return (
    <section className="review-section">
      <h2 className="review-heading">WHAT OUR CLIENTS SAY</h2>
      
      <div className="review-container">
        {reviews.map((review) => (
          <div className="review-card" key={review.id}>
            
            <span className="quote-icon">❝</span>
            
            <p className="review-text">{review.text}</p>
            
            <div className="user-info">
              <div className="img-wrapper">
                <img src={review.img} alt={review.name} className="user-img" />
              </div>
              <h4 className="user-name">{review.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;