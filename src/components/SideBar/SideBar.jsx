import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <aside className="side-bar">
      <img src={avatar} alt="Caleb Campbell" className="side-bar__avatar" />
      <div className="side-bar__text">
        <p className="side-bar__username">Caleb Campbell</p>
        <div className="side-bar__logout-edit-data">
          <p className="side-bar__edit-profile">Change profile data</p>
          <p className="side-bar__logout">Log out</p>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
