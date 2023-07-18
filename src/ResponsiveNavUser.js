import React, { Component } from "react";
import "./ResponsiveNavbar.css";

class ResponsiveNavUser extends Component {
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
                  <a href="CreatePlan">Create Plan</a>
                  </li>
                  <li>
                  <a href="ViewPlan">View Plan</a>
                  </li>
                  <li>
                     <a href="DislikeFood">Dislike Food</a>
                  </li>
                  <li>
                  <a href="Userdisease">Disease</a>
                  </li>
                  <li>
                 <a href="Suggestedfoods">Suggested foods</a>
                  </li>
                  <li>
                   <a href="Suggestedplan">Suggested Plan</a>
                  </li>
                  <li>
                    <a href="ActivePlan">Active Plan</a>
                  </li>
                  {/* <li>
                     <a href="SharedPlan">Shared Plan</a>
                  </li> */}
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
export default ResponsiveNavUser;