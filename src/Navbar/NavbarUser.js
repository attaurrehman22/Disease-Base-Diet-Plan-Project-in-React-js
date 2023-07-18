import React, { useState } from "react";
import { HiMenuAlt4, HiX, HiSearch } from "react-icons/hi";
import { motion } from "framer-motion";
import './Navbar.css'
const NavbarUser = () => {
    const [toggle, setToggle] = useState(false);
  
    return (
      <nav className="app__navbar">
        <div className="app__navbar-left">
          <div className="app__navbar-logo">
            {/* <img
              style={{ width: "70px", height: "70px" }}
              src="F:\Disease Base Diet Plan\Source Code\d_b_d_p\src\Images\th.jpg"
              alt="logo"
            /> */}
          </div>
          {/* <ul className="app__navbar-links-right">
            {["home", "About", "contact"].map((item) => (
              <li className="app__flex p-text" key={`link-${item}`}>
                <div>
                  <a href={`${item}`}>{item}</a>
                </div>
              </li>
            ))}
          </ul> */}
        </div>
  
        <div className="app__navbar-mid">
          {/* <input
            className="app__navbar-search-input"
            type="search"
            placeholder="Search Here"
          />
          <button className="app__navbar-search-btn">
            <HiSearch />
          </button> */}
        </div>
  
        <div className="app__navbar-right">
          <ul className="app__navbar-links-right">
            <li className="app__flex_p-text">
              <div className="text-a">
                {/* <a href="Adddoctor">Add Doctor</a>
                <a href="AddFoodItem">Add AddFoodItem</a> */}
              </div>
              <div className="text-b">
                <a href="CreatePlan">Create Plan</a>
                <a href="ViewPlan">View Plan</a>
                <a href="Userdisease">Disease</a>
                {/* <a href="Suggestedplan">Suggestedplan</a> */}
                {/* <a href="ActivePlan">Active Plan</a> */}
                {/* <a href="Suggestedfoods">Suggested foods</a> */}
                {/* <a href="SharedPlan">Shared Plan</a> */}
                
                
                {/* <a href="Userdisease">Update Disease</a> */}
                
                <a href="Login">Logout</a>
              </div>
              
            </li>
            
  
            <li>
              
            </li>
          </ul>
        </div>
  
        {/* <div className="app__navbar-menu">
          <HiMenuAlt4 onClick={() => setToggle(true)} />
          {toggle && (
            <motion.div
              whileInView={{ x: [300, 0] }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <HiX onClick={() => setToggle(false)} />
              <ul>
                {["home", "categories", "contact", "about", "login"].map(
                  (item) => (
                    <li key={item}>
                      <a href={`${item}`} onClick={() => setToggle(false)}>
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </motion.div>
          )}
        </div> */}
      </nav>
    );
};
export default NavbarUser;