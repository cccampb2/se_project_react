import "./ClothesSection.css";

import ItemCard from "../ItemCard/ItemCard.jsx";

function ClothesSection({ openCardModal, clothingItemsList }) {
  return (
    <div className="clothes-section">
      <div className="clothes-sections__header-items">
        <p className="clothes-sections__your-items">Your items</p>
        <button className="clothes-section__add-new-btn">+ Add New</button>
      </div>
      <ul className="clothes-section__list">
        {clothingItemsList.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              openCardModal={openCardModal}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
