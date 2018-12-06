import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../constants";

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <div className="headerContainer">
        <div className="headerName">DIYe</div>
        <div className="headerNav">
          <div className="headerLinks">
            <Link to="/" className="navLink">
              Home
            </Link>

            <Link to="/top" className="navLink">
              Top 10
            </Link>

            <Link to="/search" className="navLink">
              Search
            </Link>
            {authToken && (
              <Link to="/create" className="navLink">
                Post
              </Link>
            )}
          </div>
          <div className="authDiv">
            {authToken && (
              <div className="authLinkDiv">
                <Link to="/myaccount" className="authLink">
                  My collection
                </Link>
              </div>
            )}
            {authToken ? (
              <div
                className="authLink logout"
                onClick={() => {
                  localStorage.removeItem(AUTH_TOKEN);
                  this.props.history.push(`/`);
                }}
              >
                Logout
              </div>
            ) : (
              <Link to="/login" className="authLink">
                Login/SignUp
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
