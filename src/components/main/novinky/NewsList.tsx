import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import moment from "moment";
import ImageSlideshow from "./ImageSlideShow";
import { toast } from "react-toastify";

interface NewsItem {
  title: string;
  content: string;
  date: Date;
  images: string[];
}

const NewsList = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  const [cookies] = useCookies(["token"]);

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  const handleCardHover = (itemId: number | null) => {
    setHoveredItemId(itemId);
  };

  useEffect(() => {
    fetchBlogItems();
  }, []);

  const fetchBlogItems = async () => {
    try {
      axios
        .get("${import.meta.env.VITE_BACKEND_URL}/news/", {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200 && response.data.status === true) {
            setNewsItems(response.data.data);
          }
        });
    } catch (error) {
      toast.warning("Nepodarilo sa");
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      handleCardHover(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`max-w-4xl mx-auto grid ${
        newsItems.length > 2 ? "grid-cols-2" : "grid-cols-1"
      }`}
      ref={componentRef}
    >
      {newsItems.length !== 0 ? (
        newsItems.map((newsItem, id) => (
          <div
            key={id}
            className="shadow-md rounded-md p-4 text-center m-4 max-h-64"
            onMouseEnter={() => handleCardHover(id)}
            onMouseLeave={() => handleCardHover(null)}
            onClick={() => handleCardHover(id)}
          >
            <p>{moment(newsItem.date).format("DD.MM.YYYY")}</p>
            <h3 className="text-2xl font-semibold mb-2 text-accent">
              {newsItem.title}
            </h3>
            <p className="mb-4 h-36 overflow-hidden">{newsItem.content}</p>
            {hoveredItemId === id && newsItem.images.length > 0 && (
              <div className="">
                <ImageSlideshow
                  images={newsItem.images}
                  newName={newsItem.title}
                />
              </div>
            )}
            {/* {newsItem.images && newsItem.images.map((image, id) => (
            <img src={`data:image/jpeg;base64,${image}`}
            alt={`Image ${id}`}
            key={id} />
          ))} */}
          </div>
        ))
      ) : (
        <h1 className="text-6xl m-10 text-center text-accent">
          Zatiaľ sa tu nenachádazú žiadne novinky
        </h1>
      )}
    </div>
  );
};

export default NewsList;
