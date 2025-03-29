import "./SideBar.css";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar() {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <aside className="side-bar">
      {currentUser && (
        <img
          src={currentUser.avatar}
          alt={currentUser ? currentUser.name : "User name"}
          className="side-bar__avatar"
        />
      )}
      {!currentUser.avatar && (
        <div className="sidebar__placeholder-avatar">{currentUser.name[0]}</div>
      )}
      <div className="side-bar__text">
        <p className="side-bar__username">
          {currentUser ? currentUser.name : "User name"}
        </p>
        <div className="side-bar__logout-edit-data">
          <p className="side-bar__edit-profile">Change profile data</p>
          <p className="side-bar__logout">Log out</p>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
