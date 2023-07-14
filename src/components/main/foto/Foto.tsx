import { useEffect, useState } from "react";
import "react-slideshow-image/dist/styles.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

interface Foto {
  id: number;
  description: string;
  image: string;
  date: Date;
}

const Foto = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cookies] = useCookies(["token"]);
  const [fotos, setFotos] = useState<Foto[]>([]);

  useEffect(() => {
    fetchFotos();
  }, []);

  useEffect(() => {
    if (fotos.length > 0) {
      const interval = setInterval(goToNextImage, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [fotos]);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % fotos.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? fotos.length - 1 : prevIndex - 1
    );
  };

  const fetchFotos = () => {
    try {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/fotos/`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200 && response.data.status === true) {
            setFotos(response.data.data);
          }
        });
    } catch (error) {
      toast.warning("Nepodarilo sa");
    }
  };

  return (
    <>
      {fotos.length > 0 ? (
        <div className="relative transition-opacity">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 px-2 py-1 rounded z-50 ml-2"
            onClick={goToPreviousImage}
          >
            Previous
          </button>
          <div className="card mx-auto bg-base-100 shadow-xl fade-slide">
            <div className="card-body">
              <h2 className="card-title text-center">
                {fotos[currentImageIndex].description}
              </h2>
            </div>
            <figure>
              <img
                src={`data:image/jpeg;base64,${fotos[currentImageIndex].image}`}
                alt="Shoes"
              />
            </figure>
          </div>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 px-2 py-1 rounded z-50 mr-2"
            onClick={goToNextImage}
          >
            Next
          </button>
        </div>
      ) : (
        <h1 className="md:text-6xl text-4xl  m-10 text-center text-primary-content">
          Zatiaľ sa tu nenachádazú žiadne fotky
        </h1>
      )}
    </>
  );
};

export default Foto;
