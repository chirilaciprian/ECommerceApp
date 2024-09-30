import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="sm:flex justify-center items-center w-screen h-screen bg-base-200">
      <div className="sm:w-1/2 p-10">
        <div className="image object-center text-center">
          <img src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Watches" />
        </div>
      </div>
      <div className="sm:w-1/2 p-5">
        <div className="text">
          <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About Us</span>
          <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">About <span className="text-indigo-600">Our Watch Store</span></h2>
          <p className="text-gray-700">
            At <strong>WatchStore</strong>, we believe that a watch is more than just a timepiece — it's a statement of style, precision, and craftsmanship. 
            We curate a selection of high-quality watches that cater to every style, from classic elegance to modern trends.
          </p>
          <p className="text-gray-700 mt-4">
            Whether you're looking for a luxury brand or an affordable everyday watch, we are dedicated to helping you find the perfect match.
          </p>
        </div>
        <div className="mt-8">
          <Link 
            to="/" 
            className="text-indigo-600 hover:text-indigo-800 font-semibold text-lg"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
