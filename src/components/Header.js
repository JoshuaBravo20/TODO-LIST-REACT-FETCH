import React from "react";

const Header = () => {
  return (
    <>
      <div className="header animate__animated animate__bounceInDown animate__fast">
        <p id="heading">
          To-Do List
          <i
            className="fas fa-sticky-note animate__animated animate__bounceInDown"
            id="sticky"
          ></i>
        </p>
      </div>
    </>
  );
};

export default Header;
