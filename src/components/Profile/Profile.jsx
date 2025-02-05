import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({ weatherData, openCardModal }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection weatherData={weatherData} openCardModal={openCardModal} />
    </div>
  );
}

export default Profile;
