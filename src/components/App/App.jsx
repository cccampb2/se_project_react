import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";

import Main from "../Main/Main.jsx";

import Footer from "../Footer/Footer.jsx";
import { coordinates, APIkey } from "../../utils/constants.js";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";
import HeaderModal from "../HeaderModal/HeaderModal.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import DeleteItemCardModal from "../DeleteItemCardModal/DeleteItemCardModal.jsx";
import { getItems, addNewItem, deleteCard } from "../../utils/api.js";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import * as auth from "../../utils/auth.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }

    auth
      .getMe(jwt)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
      })
      .catch(console.error);
  }, []);

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

  const toggleLoginSwitch = () => {
    setActiveModal("log-in");
    setIsMobileMenuOpened(false);
  };

  const toggleSignUpSwitch = () => {
    setActiveModal("sign-up");
    setIsMobileMenuOpened(false);
  };

  function handleSubmit(request) {
    setIsLoading(true);
    request()
      .then(handleModalClose)

      .catch(console.error)

      .finally(() => setIsLoading(false));
  }

  function handleSignUpRequest(request) {
    request()
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        localStorage.setItem("jwt", res.token);
        handleModalClose();
      })

      .catch(console.error);
  }

  function handleLoginRequest(request) {
    request()
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return auth.getMe(res.token);
      })
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        handleModalClose();
      })
      .catch(console.error);
  }

  const handleAddItem = (item) => {
    const makeRequest = () => {
      return addNewItem(item, localStorage.getItem("jwt")).then((item) => {
        setClothingItemsList([item, ...clothingItemsList]);
      });
    };
    handleSubmit(makeRequest);
  };

  const handleLogIn = (data) => {
    const makeRequest = () => {
      return auth.login({
        email: data.email_login,
        password: data.password_login,
      });
    };
    handleLoginRequest(makeRequest);
  };

  const handleRegister = (data) => {
    const makeRequest = () => {
      return auth
        .signUp({
          name: data.name_signUp,
          avatar: data.avatar_signUp,
          email: data.email_signUp,
          password: data.password_signUp,
        })
        .then(() => {
          return auth.login({
            email: data.email_signUp,
            password: data.password_signUp,
          });
        })
        .then((res) => {
          return auth.getMe(res.token).then((userData) => {
            return { token: res.token, user: userData };
          });
        });
    };
    handleSignUpRequest(makeRequest);
  };

  const handleDeleteCard = () => {
    const makeRequest = () => {
      return deleteCard(
        { _id: selectedCard._id },
        localStorage.getItem("jwt")
      ).then((data) => {
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

  const handleSignUpClick = () => {
    setActiveModal("sign-up");
    setIsMobileMenuOpened(false);
  };
  const handleLoginClick = () => {
    setActiveModal("log-in");
    setIsMobileMenuOpened(false);
  };

  const handleEditProfile = (data) => {
    const makeRequest = () => {
      return auth
        .updateProfile(
          {
            name: data.name_edit,
            avatar: data.avatar_edit,
          },
          localStorage.getItem("jwt")
        )
        .then((user) => {
          setCurrentUser(user);
        });
    };
    handleSubmit(makeRequest);
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit");
    setIsMobileMenuOpened(false);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        auth
          // the first argument is the card's id
          .addCardlike(id, token)
          .then((updatedCard) => {
            setClothingItemsList((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        auth
          // the first argument is the card's id
          .removeCardlike(id, token)
          .then((updatedCard) => {
            setClothingItemsList((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch(console.error);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    navigate("/");
    setIsLoggedIn(false);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleSignUpClick={handleSignUpClick}
              handleLoginClick={handleLoginClick}
              isLoggedIn={isLoggedIn}
              onBurgerClick={setIsMobileMenuOpened}
              onAddButtonClick={handleAddClick}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    isLoggedIn={isLoggedIn}
                    onCardLike={handleCardLike}
                    clothingItemsList={clothingItemsList}
                    weatherData={weatherData}
                    openCardModal={handleCardClick}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleLogOut={handleLogOut}
                      isLoggedIn={isLoggedIn}
                      onCardLike={handleCardLike}
                      handleEditProfileClick={handleEditProfileClick}
                      clothingItemsList={clothingItemsList}
                      weatherData={weatherData}
                      openCardModal={handleCardClick}
                      newButtonClick={handleAddClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <LoginModal
            toggleSignUpSwitch={toggleSignUpSwitch}
            isOpen={activeModal === "log-in"}
            onCloseModal={handleModalClose}
            onLogin={handleLogIn}
            isLoading={isLoading}
          />

          <RegisterModal
            toggleLoginSwitch={toggleLoginSwitch}
            isOpen={activeModal === "sign-up"}
            onCloseModal={handleModalClose}
            onRegister={handleRegister}
            isLoading={isLoading}
          />

          <EditProfileModal
            isOpen={activeModal === "edit"}
            onCloseModal={handleModalClose}
            onEdit={handleEditProfile}
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
            handleSignUpClick={handleSignUpClick}
            handleLoginClick={handleLoginClick}
            isLoggedIn={isLoggedIn}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
