import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Articles() {
  const articles = [
    { id: 1, title: "Neque Adipiscing An Cursus", text: "Lorem ipsum dolor sit amet...", img: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500" },
    { id: 2, title: "Litora Torquent Per Conubia", text: "Lorem ipsum dolor sit amet...", img: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500" },
    { id: 3, title: "Praesent Libero Se Cursus Ante", text: "Lorem ipsum dolor sit amet...", img: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500" },
    { id: 4, title: "Duis Sagitis Ipsum Prasent", text: "Lorem ipsum dolor sit amet...", img: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500" },
    { id: 5, title: "Tortor Neque Adipiscing Diam", text: "Lorem ipsum dolor sit amet...", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRfHicSfscrhdnWoM10JFMTf_wYARyH4tYGW3O_zrNsyMipsDAtj51s3JaJDP2o4gLKzGjIQA38O1Ha0xNACiVbcnRGyJIaCzTnBCrYNeNpqoOak0mTfZ1tyA&usqp=CAc" },
    { id: 6, title: "Vestibulum Sapien Pin Quam", text: "Lorem ipsum dolor sit amet...", img: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=500" },
  ];

  return (
    <section className="articles-section">
      <h2 className="articles-heading">LATEST ARTICLES</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="articles-swiper"
      >
        {articles.map((item) => (
          <SwiperSlide key={item.id}>
            {/* Pure article card ko ek dynamic Link bana diya */}
            <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="article-card" style={{ cursor: 'pointer' }}>
                <div className="article-img-box">
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="article-content">
                  <h3 className="article-title">{item.title}</h3>
                  <p className="article-text">{item.text}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Articles;