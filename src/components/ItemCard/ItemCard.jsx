import "./ItemCard.css";
import likeButton from "../../assets/card-like-button.svg";

function ItemCard({ item, openCardModal }) {
  const handleCardClick = () => {
    openCardModal(item);
  };
  return (
    <li onClick={handleCardClick} className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        <img
          className="card__like-btn"
          src={likeButton}
          alt="like button"
        ></img>
      </div>

      <img className="card__image" src={item.imageUrl} alt={item.name}></img>
    </li>
  );
}

export default ItemCard;
