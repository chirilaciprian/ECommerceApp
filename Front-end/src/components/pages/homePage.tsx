import { Navbar } from "../general/Navbar";
import Hero from "../general/Hero";
import HomeExploreCard from "../general/HomeExploreCard";
import { getCategoryByName } from "../../services/categoryService";
import { useEffect, useState } from "react";

const HomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [casual, setCasual] = useState<string>("");
  const [smartWatch, setSmartWatch] = useState<string>("");
  const fetchCategoriesName = async () => {
    const smartWatchId = await getCategoryByName("Smartwatch");
    const casualId = await getCategoryByName("Casual");
    return { smartWatchId, casualId };
  }
  useEffect(() => {
    fetchCategoriesName().then((res) => {
      setCasual(res.casualId);
      setSmartWatch(res.smartWatchId);
    });
  },[])

  
  return (
    <div className="bg-base-200 text-neutral">
      {/* Navbar and Hero */}
      <Navbar />
      <Hero />

      {/* Category Section */}
      <div className="text-center py-8 roboto font-thin">
        <h2 className="text-xl md:text-4xl lg:text-5xl playfair uppercase">
          Explore Our Collections
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl mt-4">
          Find the perfect watch for any occasion.
        </p>
      </div>

      {/* Cards for each category */}
      <div className="grid gap-8 mr-10 ml-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 py-10">
        <HomeExploreCard
          image={
            "https://images.unsplash.com/photo-1708647585535-c3f3317e9088?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          title={"On Discount"}
          link="/products?onSale=true"
        />
        <HomeExploreCard
          image={
            "https://images.unsplash.com/photo-1721719698251-402fbc325d22?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          title={"Best Sellers"}
          link="/products"
        />
        <HomeExploreCard
          image={
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          title={"Men's Watches"}
          link="/products?genre=Men"
        />
        <HomeExploreCard
          image={
            "https://images.unsplash.com/photo-1541778480-fc1752bbc2a9?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          title={"Women's Watches"}
          link="/products?genre=Women"
          
        />
        <HomeExploreCard
          image={
            "https://images.unsplash.com/photo-1698729616509-060e8f58e6c0?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          title="Smart Watches"
          link = {`/products/?category=${smartWatch}`}
        />
        <HomeExploreCard
          image={
            "https://images.unsplash.com/photo-1451859757691-f318d641ab4d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          title="Casual Watches"
          link = {`/products?category=${casual}`}
        />
      </div>
    </div>
  );
};

export default HomePage;