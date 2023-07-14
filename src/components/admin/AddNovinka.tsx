import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

interface ModalProps {
  isOpen: boolean;
  onClose: (good: boolean) => void;
}

const AddNovinka: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [cookies] = useCookies(["token"]);


  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [images, setImages] = useState<File[]>([]);

  const imageInput = useRef(null);

  const handleDateChange = (e: any) => {
    setDate(e.target.value);
  };

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: any) => {
    setContent(e.target.value);
  };

  const handleImagesChange = (e: any) => {
    const file = e.target.files;
    setImages([...images, file[0]]);
  };

  const handleImageDelete = (id: number) => {
    const newArray = images;
    newArray.splice(id, 1);
    setImages(newArray);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Create a FormData object to store the form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date.toUTCString());
    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/news/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            clearData();
          }
        });
    } catch (error: any) {
      toast.warning(error.message);
    }
  };

  const clearData = () => {
    setTitle("");
    setContent("");
    setImages([]);
    onClose(true);
  };

  return (
    <>
      <input
        checked={isOpen}
        type="checkbox"
        id="modalOpen"
        className="modal-toggle"
        readOnly
      />
      <div
        className={`modal fixed left-0 top-0 flex h-full w-full items-center justify-center`}
      >
        <div className="modal-box z-50 mx-auto w-11/12 overflow-y-auto rounded bg-neutral shadow-lg md:max-w-md">
          <div className="modal-content px-6 py-4 text-left text-primary-content">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Vytvor novinku</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block font-bold mb-2">
                    Názov
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-neutral-focus"
                    value={title}
                    onChange={handleTitleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="content" className="block font-bold mb-2">
                    Popis
                  </label>
                  <textarea
                    id="content"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-neutral-focus"
                    value={content}
                    onChange={handleContentChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="content" className="block font-bold mb-2">
                    Date
                  </label>
                  <input
                    id="date"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-neutral-focus"
                    onChange={handleDateChange}
                    type="date"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="content" className="block font-bold mb-2">
                    Obrázky
                  </label>
                  <input
                    name="images"
                    className="file-input w-full max-w-xs text-primary-content"
                    ref={imageInput}
                    onChange={handleImagesChange}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                  />
                  <ul className="m-4">
                    {images.length > 0 &&
                      images.map((image, id) => (
                        <>
                          <li className="flex" key={id}>
                            <h1 className="truncate w-64">{image?.name}</h1>

                            <button
                              className="w-6 h-6 mx-4 bg-accent rounded-md m-1 text-primary-content"
                              onClick={(e) => {
                                e.preventDefault();
                                handleImageDelete(id);
                              }}
                            >
                              X
                            </button>
                          </li>
                        </>
                      ))}
                  </ul>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn bg-accent hover:bg-accent-focus"
                  >
                    Create
                  </button>
                  <div className="grow"></div>
                  <button
                    onClick={() => clearData()}
                    className="btn bg-accent hover:bg-accent-focus left-full"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
            <div className="flex"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNovinka;
