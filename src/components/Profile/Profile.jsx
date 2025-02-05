import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({ clothingItemsList, openCardModal }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItemsList={clothingItemsList}
        openCardModal={openCardModal}
      />
    </div>
  );
}

export default Profile;
