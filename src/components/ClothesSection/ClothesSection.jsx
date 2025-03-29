import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
function ClothesSection({
  openCardModal,
  clothingItemsList,
  newButtonClick,
  onCardLike,
  isLoggedIn,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-sections__header-items">
        <p className="clothes-sections__your-items">Your items</p>
        <button
          onClick={newButtonClick}
          className="clothes-section__add-new-btn"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItemsList.map((item) => {
          const isOwn = item.owner === currentUser._id;
          if (isOwn) {
            return (
              <ItemCard
                isLoggedIn={isLoggedIn}
                onCardLike={onCardLike}
                key={item._id}
                item={item}
                openCardModal={openCardModal}
              />
            );
          }
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
