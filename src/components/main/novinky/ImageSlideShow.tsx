import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import 'react-slideshow-image/dist/styles.css'
import 'react-slideshow-image/dist/styles.css'

interface ImageSlideshowProps {
  images: string[];
  newName: string;
}

const ImageSlideshow: React.FC<ImageSlideshowProps> = ({ images, newName }) => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cookies] = useCookies(["token"]);
  const [fotos, setFotos] = useState<string[]>([]);

  useEffect(() => {
    setFotos(images);
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

  return (
    <>
    {fotos.length > 0 && (
      <div className="absolute md:w-1/2 md:h-1/2 w-screen transition-opacity rounded-xl border-accent border z-50 top-1/4 md:right-1/4 right-0 bg-neutral">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 px-2 py-1 rounded z-50 ml-2"
          onClick={goToPreviousImage}
        >
          Previous
        </button>
        <span className='text-2xl text-accent'>{newName}</span>  
          <img
            className='mx-auto h-full w-full shadow-xl fade-slide rounded-xl py-2 bg-neutral'
            src={`data:image/jpeg;base64,${fotos[currentImageIndex]}`}
            alt="Shoes"
          />
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 px-2 py-1 rounded z-50 mr-2"
          onClick={goToNextImage}
        >
          Next
        </button>
      </div>
    )}
  </>
  )
};

export default ImageSlideshow;
