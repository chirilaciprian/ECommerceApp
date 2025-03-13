import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (    
    <div className="sm:flex justify-center items-center w-screen h-screen bg-base-200">
      <div className="sm:w-1/2 p-10">
        <div className="image object-center text-center">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Clothing"
          />
        </div>
      </div>
      <div className="sm:w-1/2 p-5">
        <div className="text">
          <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">About Us</span>
          <h2 className="my-4 font-bold text-3xl sm:text-4xl">
            About <span className="text-indigo-600">Our Clothing Store</span>
          </h2>
          <p className="text-gray-700">
            At <strong>ClothingStore</strong>, we believe that fashion is more than just clothing — it's a way to express individuality and confidence. 
            Our mission is to provide a wide range of high-quality, stylish apparel that suits every occasion and personality.
          </p>
          <p className="text-gray-700 mt-4">
            From timeless classics to the latest trends, we strive to offer clothing that meets your unique preferences and needs. 
            Explore our collection and find the perfect outfit for any event.
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
