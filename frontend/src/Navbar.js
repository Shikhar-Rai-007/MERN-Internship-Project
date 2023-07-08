import React from 'react'
import "./Navbar.css";
//import Logo from "../assets/Logo.svg";

function Navbar() {
  return (
    <nav>
      {/* <img src={Logo} alt="Little lemon"/> */}
      <ul>
        <li>
          <a href="/">Home</a>
        </li>

        <li>
          <a href="signup">SignUp</a>
        </li>

        <li>
          <a href="login">Login</a>
        </li>

        <li>
          <a href="students">Students</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar