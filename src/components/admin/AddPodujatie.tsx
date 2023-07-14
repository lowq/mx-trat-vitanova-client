import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

interface ModalProps {
  isOpen: boolean;
  onClose: (good: boolean) => void;
}

const AddPodujatie: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [cookies] = useCookies(["token"]);

  const [name, setName] = useState<string>("");
  const [maxCapacity, setMaxCapacity] = useState<number>(0);
  const [date, setDate] = useState<Date>({} as Date);
  const [description, setDescription] = useState<string>("");

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleMaxCapacityChange = (e: any) => {
    setMaxCapacity(e.target.value);
  };

  const handleDateChange = (e: any) => {
    setDate(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Create a FormData object to store the form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("maxCapacity", maxCapacity.toString());
    const dateLocal = new Date(date);
    formData.append("date", dateLocal.toISOString());
    formData.append("description", description);

    try {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/podujatia/`, formData, {
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
    setName("");
    setDescription("");
    setMaxCapacity(0);
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
              <h2 className="text-2xl font-bold mb-4">Vytvor podujatie</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block font-bold mb-2">
                    Názov
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-neutral-focus"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="title" className="block font-bold mb-2">
                    Popis
                  </label>
                  <textarea
                    id="description"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-neutral-focus"
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="content" className="block font-bold mb-2">
                    Max kapacita - {maxCapacity}
                  </label>
                  <input
                    id="maxCapacity"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 range range-primary-content text-neutral-focus"
                    value={maxCapacity}
                    onChange={handleMaxCapacityChange}
                    min={0}
                    max="100"
                    type="range"
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
                    required
                  />
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

export default AddPodujatie;
