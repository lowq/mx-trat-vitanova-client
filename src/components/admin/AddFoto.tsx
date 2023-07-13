import React, {  useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

interface ModalProps {
  isOpen: boolean;
  onClose: (good: boolean) => void;
}

const AddFoto: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [cookies] = useCookies(["token"]);

  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const imageInput = useRef<HTMLInputElement | null>(null);

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleImagesChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Create a FormData object to store the form data
    const formData = new FormData();
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      axios
        .post("${import.meta.env.VITE_BACKEND_URL}/fotos/", formData, {
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
    setDescription("");
    setImage(null);
    if (imageInput.current) imageInput.current.value = "";
    onClose(true);
  };

  return (
    <>
      <input
        checked={isOpen}
        type="checkbox"
        id="modalOpen"
        className="modal-toggle"
      />
      <div
        className={`modal fixed left-0 top-0 flex h-full w-full items-center justify-center`}
      >
        <div className="modal-box z-50 mx-auto w-11/12 overflow-y-auto rounded bg-neutral shadow-lg md:max-w-md">
          <div className="modal-content px-6 py-4 text-left text-accent">
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Vytvor novinku</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block font-bold mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-neutral-focus"
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="block font-bold mb-2">
                    Obrázok
                  </label>
                  <input
                    name="images"
                    className="file-input w-full max-w-xs text-accent"
                    ref={imageInput}
                    onChange={handleImagesChange}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn bg-primary hover:bg-primary-focus"
                  >
                    Create
                  </button>
                  <div className="grow"></div>
                  <button
                    onClick={() => clearData()}
                    className="btn bg-primary hover:bg-primary-focus left-full"
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

export default AddFoto;
