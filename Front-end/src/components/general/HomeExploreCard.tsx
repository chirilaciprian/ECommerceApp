import { Link } from "react-router-dom";

interface HomeExploreCardProps {
  image: string;
  title: string;
  link: string;
}

const HomeExploreCard = (props:HomeExploreCardProps) => {
  return (
    <div className="card bg-base-100 image-full w-auto shadow-xl">
      <figure>
        <img src={props.image} />
      </figure>
      <div className="card-body roboto">
        <div className=" flex flex-col justify-center items-center h-full gap-4 ">
          <h2 className="card-title  font-thin md:text-3xl text-2xl">{props.title}</h2>
          <Link to={props.link} className="btn glass text-neutral-content text-lg font-extralight hover:bg-primary">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeExploreCard;
