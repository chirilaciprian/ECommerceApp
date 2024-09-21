import { Navbar } from "../general/Navbar";
import Hero from "../general/Hero";
import HomeExploreCard from "../general/HomeExploreCard";

export const HomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

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
        />
        <HomeExploreCard
          image={
            "https://images.unsplash.com/photo-1721719698251-402fbc325d22?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          title={"Best Sellers"}
        />
        <HomeExploreCard
          image={
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          title={"Men's Watches"}
        />
        <HomeExploreCard
          image={
            "https://images.unsplash.com/photo-1541778480-fc1752bbc2a9?q=80&w=1896&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          title={"Women's Watches"}
        />
      </div>
    </div>
  );
};
