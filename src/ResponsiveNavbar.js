import React, { Component } from "react";
import "./ResponsiveNavbar.css";

class ResponsiveNavbar extends Component {
  state = {
    clicked: false,
  };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <>
        <nav className="nav">
         <div id="logo"></div>
          <div>
            <ul id="navbar" className={this.state.clicked?"#navbar active" : "#navbar"}>
              <li>
              </li>
              <li>
                <a href="Adddoctor">Add Doctor</a>
              </li>
              <li>
                <a href="AddFoodItem">Add FoodItem</a>
              </li>
              <li>
                <a href="/">Logout</a>
              </li> 
            </ul>
          </div>
          <div id="mobile" onClick={this.handleClick}>
            <i
              id="bar"
              className={
                this.state.clicked ? "fas fa-times" : "fas fa-bars"
              }
            ></i>
          </div>
        </nav>
      </>
    );
  }
}

export default ResponsiveNavbar;
