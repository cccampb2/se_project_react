import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <aside className="side-bar">
      <img src={avatar} alt="Caleb Campbell" className="side-bar__avatar" />
      <p className="side-bar__username">Caleb Campbell</p>
    </aside>
  );
}

export default SideBar;
