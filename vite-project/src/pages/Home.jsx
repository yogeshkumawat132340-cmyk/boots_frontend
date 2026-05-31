import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Logo from "../components/Logo";
import Best from "../components/Best";
import Service from "../components/Service";
import Arrival from "../components/Arrival"
import Review from "../components/Review";
import Articals from "../components/Articals";
import Footer from "../components/Footer"


function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Logo />
      <Best/>
      <Service/>
      <Arrival/>
      <Review/>
      <Articals/>
      <Footer/>
    </>
  );
}

export default Home;