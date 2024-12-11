import { BiHome } from "react-icons/bi";
import { GrGift } from "react-icons/gr";
import { MdFastfood } from "react-icons/md";
import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <div className="Navbar-container">
        <Link to={"/"}>
          <BiHome className="buttonNavbar"></BiHome> {/* HOME */}
        </Link>
        <Link to={"/secretsanta"}>
          <GrGift className="buttonNavbar"></GrGift> {/* Secret santa */}
        </Link>
        <Link to={"/repas"}>
          <MdFastfood className="buttonNavbar"></MdFastfood>
          {/* Repas ahead + soirée */}
        </Link>
      </div>
    </>
  );
};

export default NavBar;
