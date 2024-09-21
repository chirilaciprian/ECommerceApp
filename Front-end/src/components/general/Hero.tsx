import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="hero bg-bgprimary text-neutral h-auto merriweather">
        <div className="hero-content flex flex-col lg:flex-row-reverse items-center">
          <img
            src="https://media.istockphoto.com/id/973117190/photo/luxury-watches-at-showcase.jpg?s=612x612&w=0&k=20&c=52ELH-P1f3kiuN1EX8Lex5Dlprl_X9EsPyH_oh5SAkM="
            className="rounded-lg shadow-2xl w-auto h-auto object-cover card"
            alt="Luxury Watches"
          />
          <div className="text-center lg:text-left w-full lg:w-1/2 px-4 lg:px-8">
            <h1 className="text-3xl md:text-5xl font-bold text-primary">
              Discover Timeless Luxury at Unbeatable Prices!
            </h1>
            <p className="py-6">
              Explore our exclusive collection of premium watches from world-renowned brands. Whether you're after elegance, style, or performance, find the perfect timepiece for every occasion.
            </p>
            <Link to="/products">
              <button className="btn btn-primary btn-wide">Shop Now</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
