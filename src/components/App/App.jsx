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
  };

  const handleCancelDelete = () => {
    setActiveModal("");
    setSelectedCard({});
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    addNewItem({ name, imageUrl, weather })
      .then((item) => {
        setClothingItemsList([item, ...clothingItemsList]);
      })
      .catch(console.error);
  };

  const openConfirmationModal = (card) => {
    setActiveModal("confirmation");
    setSelectedCard(card);
    setIsMobileMenuOpened(false);
  };

  const handleCardDelete = () => {
    deleteCard({ _id: selectedCard._id })
      .then((data) => {
        setClothingItemsList(
          clothingItemsList.filter((card) => {
            return card._id != selectedCard._id;
          }),
          ...clothingItemsList
        );
        handleModalClose();
      })
      .catch(console.error);
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
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "new-garment"}
          onCloseModal={handleModalClose}
          onAddItem={handleAddItemSubmit}
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
          handleCardDelete={handleCardDelete}
          onExitButtonClick={handleModalClose}
          handleCancelDelete={handleCancelDelete}
          isOpen={activeModal === "confirmation"}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
