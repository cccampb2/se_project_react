import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({ clothingItemsList, openCardModal, newButtonClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItemsList={clothingItemsList}
        newButtonClick={newButtonClick}
        openCardModal={openCardModal}
      />
    </div>
  );
}

export default Profile;
