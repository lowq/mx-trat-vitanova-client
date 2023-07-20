import React, { useEffect, useState } from 'react';

interface ImageSlideshowProps {
  images: newsUrls[];
  newName: string;
}

interface newsUrls {
  id: number;
  url: string;
}

const ImageSlideshow: React.FC<ImageSlideshowProps> = ({ images, newName }) => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fotos, setFotos] = useState<newsUrls[]>([]);

  useEffect(() => {
    setFotos(images);
  }, []);

  useEffect(() => {
    if (fotos.length > 0) {
      const interval = setInterval(goToNextImage, 1500);

      return () => {
        clearInterval(interval);
      };
    }
  }, [fotos]);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      if(prevIndex !== fotos.length) {
        (prevIndex + 1) % fotos.length
      } else {
        0
      }
    });
  };
 /*
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? fotos.length - 1 : prevIndex - 1
    );
  };*/

  return (
    <>
    {fotos.length > 0 && (
      <div className="absolute md:w-1/2 md:h-1/2 w-screen transition-opacity rounded-xl border-primary-content border z-50 top-1/4 md:right-1/4 right-0 bg-neutral">
        {/*<button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 px-2 py-1 rounded z-50 ml-2"
          onClick={goToPreviousImage}
        >
          Previous
        </button>*/}
        <span className='text-2xl text-primary-content'>{newName}</span>  
          <img
            className='mx-auto w-full shadow-xl fade-slide rounded-xl bg-neutral border-2'
            src={fotos[currentImageIndex].url}
            alt={newName}
          />
        {/*<button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 px-2 py-1 rounded z-50 mr-2"
          onClick={goToNextImage}
        >
          Next
        </button>*/}
      </div>
    )}
  </>
  )
};

export default ImageSlideshow;
