import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="hero bg-bgprimary text-neutral h-auto merriweather">
        <div className="hero-content flex flex-col lg:flex-row-reverse items-center gap-8 px-4 lg:px-20">
          <img
            src="https://images.unsplash.com/photo-1580656940647-8854a00547f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-lg shadow-2xl w-full sm:w-3/4 lg:w-3/5 xl:w-2/3 h-auto object-cover card"
            alt="Exclusive Fashion"
          />
          <div className="text-center lg:text-left w-full lg:w-1/2">
            <h1 className="text-3xl md:text-5xl font-bold text-primary">
              Redefine Your Style with Exclusive Fashion!
            </h1>
            <p className="py-6 text-sm sm:text-base lg:text-lg">
              Discover the latest trends and timeless classics in our exclusive clothing collection. From casual wear to elegant outfits, find styles that fit every mood and occasion.
            </p>
            <Link to="/products">
              <button className="btn btn-primary btn-wide">
                Shop the Collection
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
