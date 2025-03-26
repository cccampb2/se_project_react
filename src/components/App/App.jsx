import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";

import Main from "../Main/Main.jsx";

import Footer from "../Footer/Footer.jsx";
import { coordinates, APIkey } from "../../utils/constants.js";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";
import HeaderModal from "../HeaderModal/HeaderModal.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import DeleteItemCardModal from "../DeleteItemCardModal/DeleteItemCardModal.jsx";
import { getItems, addNewItem, deleteCard } from "../../utils/api.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: "999", C: "999" },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItemsList, setClothingItemsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
    setIsMobileMenuOpened(false);
  };

  const handleAddClick = () => {
    setActiveModal("new-garment");
    setIsMobileMenuOpened(false);
  };

  const handleModalClose = () => {
    setActiveModal("");
    setIsMobileMenuOpened(false);
  };

  const handleCancelDelete = () => {
    handleModalClose();
    setSelectedCard({});
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(handleModalClose)

      .catch(console.error)

      .finally(() => setIsLoading(false));
  }

  const handleAddItem = (item) => {
    const makeRequest = () => {
      return addNewItem(item).then((item) => {
        setClothingItemsList([...clothingItemsList, item]);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleLogIn = (data) => {
    const makeRequest = () => {
      return;
    };
    handleSubmit(makeRequest);
  };

  const handleDeleteCard = () => {
    const makeRequest = () => {
      return deleteCard({ _id: selectedCard._id }).then((data) => {
        setClothingItemsList(
          clothingItemsList.filter((card) => {
            return card._id != selectedCard._id;
          }),
          ...clothingItemsList
        );
      });
    };
    handleSubmit(makeRequest);
  };

  const openConfirmationModal = (card) => {
    setActiveModal("confirmation");
    setSelectedCard(card);
    setIsMobileMenuOpened(false);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItemsList(data);
      })
      .catch(console.error);
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            onBurgerClick={setIsMobileMenuOpened}
            onAddButtonClick={handleAddClick}
            weatherData={weatherData}
            isMobileMenuOpened={isMobileMenuOpened}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  clothingItemsList={clothingItemsList}
                  weatherData={weatherData}
                  openCardModal={handleCardClick}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  clothingItemsList={clothingItemsList}
                  weatherData={weatherData}
                  openCardModal={handleCardClick}
                  newButtonClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <RegisterModal
          isOpen={activeModal === "log-in"}
          onCloseModal={handleModalClose}
          onLogin={handleLogIn}
          isLoading={isLoading}
        />
        <AddItemModal
          isOpen={activeModal === "new-garment"}
          onCloseModal={handleModalClose}
          onAddItem={handleAddItem}
          isLoading={isLoading}
        />
        <ItemModal
          openConfirmationModal={openConfirmationModal}
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onExitButtonClick={handleModalClose}
        />

        <HeaderModal
          isMobileMenuOpened={isMobileMenuOpened}
          onClose={setIsMobileMenuOpened}
          onAddButtonClick={handleAddClick}
        />
        <DeleteItemCardModal
          isLoading={isLoading}
          handleCardDelete={handleDeleteCard}
          onExitButtonClick={handleModalClose}
          handleCancelDelete={handleCancelDelete}
          isOpen={activeModal === "confirmation"}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
