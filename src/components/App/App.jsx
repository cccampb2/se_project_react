import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { coordinates, APIkey } from "../../utils/constants.js";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";
import HeaderModal from "../HeaderModal/HeaderModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: "999", C: "999" },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = (value) => {
    setIsMobileMenuOpened(value);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleModalClose = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          onBurgerClick={setIsMobileMenuOpened}
          onAddButtonClick={handleAddClick}
          weatherData={weatherData}
        />
        <Main weatherData={weatherData} openCardModal={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title={"New Garment"}
        buttonText={"Add garment"}
        activeModal={activeModal}
        onExitButtonClick={handleModalClose}
      >
        <label htmlFor="name" className="modal__label">
          <div>
            Name <span id="name-error"></span>
          </div>
          <input
            className="modal__input"
            type="text"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          <div>
            Image <span id="image-error"></span>
          </div>

          <input
            className="modal__input"
            type="url"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-btns">
          <div>
            <legend className="modal__legend">Select the weather type:</legend>
            <span id="radio-error"></span>
          </div>

          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              name="weather-type"
              type="radio"
              id="hot"
              className="modal__radio-input"
            />{" "}
            <span className="custom-radio"></span>
            <span>Hot</span>
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              name="weather-type"
              type="radio"
              id="warm"
              className="modal__radio-input"
            />{" "}
            <span className="custom-radio"></span>
            <span>Warm</span>
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              name="weather-type"
              type="radio"
              id="cold"
              className="modal__radio-input"
            />{" "}
            <span className="custom-radio"></span>
            <span>Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onExitButtonClick={handleModalClose}
      />
      <HeaderModal
        isMobileMenuOpened={isMobileMenuOpened}
        onClose={setIsMobileMenuOpened}
        onAddButtonClick={handleAddClick}
      />
    </div>
  );
}

export default App;
