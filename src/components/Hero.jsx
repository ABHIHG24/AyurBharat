import { Link } from "react-router-dom";
import img4 from "../assets/ayur8.jpg";
import img2 from "../assets/ayur10.jpg";
import img3 from "../assets/ayur9.jpg";
import img1 from "../assets/ayur7.webp";

const Hero = () => {
  const Images = [img1, img2, img3, img4];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          "Discover AyurBharat: Where Ancient Wisdom Meets Modern Wellness"
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8">
          "Welcome to AyurBharat – your gateway to authentic Ayurvedic remedies,
          natural healing, and vibrant living."
        </p>
        <div className="flex flex-wrap w-32 gap-2">
          <Link to="/products" className="btn btn-primary">
            Our Products
          </Link>
          <Link to="/service" className="btn btn-success">
            Book an Appointment
          </Link>
        </div>
      </div>
      <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        {Images.map((image) => {
          return (
            <div key={image} className="carousel-item">
              <img
                src={image}
                className="rounded-box h-full w-80 object-cover"
                alt="Ayur image"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Hero;
