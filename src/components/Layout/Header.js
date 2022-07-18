import React from "react";
import { Link ,NavLink} from "react-router-dom";
import "../../style/Header.css"
import logo from '../../images/logo.svg'

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-sm-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
          <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink 
                className={`nav-link ${({isActive})=>isActive?"active": " inactiveNav"}`} aria-current="page" to="/">
                  Explore
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={`nav-link ${({isActive})=>isActive?"active": " inactiveNav"}`}to="/offers">
                  Offers
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className= {`nav-link ${({isActive})=>isActive?"active": " inactiveNav"}`}to="/profile">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className= {`nav-link ${({isActive})=>isActive?"active": " inactiveNav"}`}to="/AboutUs">
                  About Us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;