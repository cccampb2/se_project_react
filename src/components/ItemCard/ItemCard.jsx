import "./ItemCard.css";
import unliked from "../../assets/unliked.svg";
import liked from "../../assets/liked.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useEffect } from "react";

function ItemCard({ item, openCardModal, onCardLike, isLoggedIn }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isLiked = item.likes.includes(currentUser._id);

  const handleCardClick = () => {
    openCardModal(item);
  };

  useEffect(() => {}, [isLiked]);

  const handleLike = (event) => {
    event.stopPropagation();
    onCardLike({ id: item["_id"], isLiked });
  };
  return (
    <li onClick={handleCardClick} className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <img
            onClick={handleLike}
            className="card__like-btn"
            src={isLiked ? liked : unliked}
            alt="like button"
          ></img>
        )}
      </div>

      <img className="card__image" src={item.imageUrl} alt={item.name}></img>
    </li>
  );
}

export default ItemCard;
