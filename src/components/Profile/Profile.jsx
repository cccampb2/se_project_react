import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({
  handleLogOut,
  onCardLike,
  clothingItemsList,
  openCardModal,
  newButtonClick,
  handleEditProfileClick,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <SideBar
        handleLogOut={handleLogOut}
        handleEditProfileClick={handleEditProfileClick}
      />
      <ClothesSection
        isLoggedIn={isLoggedIn}
        onCardLike={onCardLike}
        clothingItemsList={clothingItemsList}
        newButtonClick={newButtonClick}
        openCardModal={openCardModal}
      />
    </div>
  );
}

export default Profile;
