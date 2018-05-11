import React from "react";

export class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          ReactJS Basics
        </a>
        <div className="container">
          <div className="navbar-header">
            <ul className="nav navbar-nav">
              <li>
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
