import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { Podujatie } from "../../../models/podujatia";
import PodujatieInfo from "./PodujatieInfo";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const PodujatiaTable = () => {
  const [cookies] = useCookies(["token"]);

  const [podujatia, setPodujatia] = useState<Podujatie[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchPodujatia();
  }, []);

  const fetchPodujatia = () => {
    try {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/podujatia/`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200 && response.data.status === true) {
            setPodujatia(response.data.data);
          }
        });
    } catch (error) {
      toast.warning("Nepodarilo sa");
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)"); // Adjust the media query as needed

    const handleDeviceChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Set initial device type
    setIsMobile(mediaQuery.matches);

    // Add listener for device type changes
    mediaQuery.addEventListener("change", handleDeviceChange);

    // Cleanup on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleDeviceChange);
    };
  }, []);

  const [isModalPodujatieInfoOpen, setIsModalPodujatieInfoOpen] =
    useState(false);

  const openModalPodujatieInfo = () => {
    setIsModalPodujatieInfoOpen(true);
  };

  const closeModalPodujatieInfo = (good: boolean) => {
    if (good) {
      setIsModalPodujatieInfoOpen(false);
    } else {
      setIsModalPodujatieInfoOpen(false);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        {podujatia.length !== 0 ? (
          isMobile ? (
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr className="text-base text-primary-content">
                  <th>Názov</th>
                  <th>Dátum</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {podujatia.length !== 0 &&
                  podujatia.map((podujatie: Podujatie) => {
                    return (
                      <tr key={podujatie.id}>
                        <td>{podujatie.name}</td>
                        <td>
                          {moment(podujatie.date).format("DD.MM.YYYY hh:mm:ss")}
                        </td>
                        <td>
                          <button
                            className="btn"
                            onClick={openModalPodujatieInfo}
                          >
                            Info
                          </button>
                          <PodujatieInfo
                            isOpen={isModalPodujatieInfoOpen}
                            onClose={closeModalPodujatieInfo}
                            podujatie={podujatie}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr className="text-base text-primary-content">
                  <th>Názov</th>
                  <th>Dátum</th>
                  <th>Aktuálne prihlásených</th>
                  <th>Max kapacita</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {podujatia.length !== 0 &&
                  podujatia.map((podujatie: Podujatie) => {
                    return (
                      <tr key={podujatie.id}>
                        <td>{podujatie.name}</td>
                        <td>
                          {moment(podujatie.date).format("DD.MM.YYYY hh:mm:ss")}
                        </td>
                        <td>{podujatie.users.length}</td>
                        <td>{podujatie.maxCapacity}</td>
                        <td>
                          <button
                            className="btn"
                            onClick={openModalPodujatieInfo}
                          >
                            Info
                          </button>
                          <PodujatieInfo
                            isOpen={isModalPodujatieInfoOpen}
                            onClose={closeModalPodujatieInfo}
                            podujatie={podujatie}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )
        ) : (
          <h1 className="md:text-6xl text-4xl  m-10 text-center text-primary-content">
            Podujatia čoskoro
          </h1>
        )}
      </div>
    </>
  );
};

export default PodujatiaTable;
