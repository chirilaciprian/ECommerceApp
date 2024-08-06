// src/components/pages/AboutPage.jsx

import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-gray-700 mb-4">
        Welcome to C-Shop, your premier destination for cutting-edge electronics and the latest tech innovations. Established in 2024, we are dedicated to bringing you the highest quality electronics, from smart TVs and smartphones to laptops and gaming consoles.
      </p>
      <p className="text-gray-700 mb-4">
        At C-Shop, we believe that technology enhances our lives and empowers our daily routines. Our team of tech enthusiasts meticulously curates our collection to ensure that you have access to the most advanced and reliable electronics on the market.
      </p>
      <p className="text-gray-700 mb-4">
        Our mission is to offer an exceptional shopping experience combined with outstanding customer service. Whether you're upgrading your home entertainment system, looking for the latest smartphone, or finding the perfect gaming console, we have you covered. We take pride in our fast shipping, competitive prices, and hassle-free returns to guarantee your satisfaction.
      </p>
      <p className="text-gray-700 mb-4">
        Thank you for choosing C-Shop. We’re excited to help you explore the future of technology. Stay tuned for new arrivals and exclusive deals!
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
      <ul className="list-disc list-inside mb-4">
        <li className="text-gray-700">Quality: We prioritize top-notch electronics and superior craftsmanship.</li>
        <li className="text-gray-700">Innovation: We offer the latest and most advanced technology in electronics.</li>
        <li className="text-gray-700">Customer Service: We aim to provide exceptional support and a seamless shopping experience.</li>
        <li className="text-gray-700">Sustainability: We are committed to eco-friendly practices and sustainable products.</li>
      </ul>
      <p className="text-gray-700 mt-8">
        <Link to="/" className="text-blue-500 hover:underline">Back to Homepage</Link>
      </p>
    </div>
  );
};

export default AboutPage;
