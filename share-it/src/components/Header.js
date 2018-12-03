import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../constants';

class Header extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
          <div className="flex pa1 justify-between nowrap lightblue">
            <div className="flex flex-fixed black">
              <div className="fw7 mr1">DIYe</div>
              <Link to="/" className="ml1 no-underline black">
                Home
              </Link>
              <div className="ml1">|</div>
              <Link to="/top" className="ml1 no-underline black">
                Top 10
              </Link>
              <div className="ml1">|</div>
              <Link to="/search" className="ml1 no-underline black">
                Search
              </Link>
              {authToken && (
                <div className="flex">
                  <div className="ml1">|</div>
                  <Link to="/create" className="ml1 no-underline black">
                    Post
                  </Link>
                </div>
              )}
            </div>
            <div className="flex flex-fixed">
            {authToken && (
                <div className="flex">
                  <Link to="/myaccount" className="ml1 no-underline black">
                    My account
                  </Link>
                </div>
              )}
              {authToken ? (
                <div>
                <div className="ml1">|</div>
                <div
                  className="ml1 pointer black"
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN)
                    this.props.history.push(`/`)
                  }}
                >
                  Logout
                </div>
                </div>
              ) : (
                <Link to="/login" className="ml1 no-underline black">
                  Login/SignUp
                </Link>
              )}
            </div>
          </div>
        )
      }
};

export default withRouter(Header);