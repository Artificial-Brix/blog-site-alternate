import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "antd";

const navLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Contact Us",
    path: "/contact-us",
  },
  {
    title: "Login",
    path: "/login",
  },
];

export default function Navigation({ user }) {
  const [menuActive, setMenuActive] = useState(false);
  return (
    <div>
      <nav className="site-navigation">
        <span className="menu-title">BLOGS</span>
        <div className={`menu-content-container ${menuActive && "active"}`}>
          <ul>
            {navLinks.map((link, index) => (
              <Link to={link.path}>
                <li key={index}>{link.title}</li>
              </Link>
            ))}
          </ul>
          <span className="menu-avatar-container">
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              size={38}
            />
            <span className="menu-avatar-name">{`${user.firstName} ${user.lastName}`}</span>
          </span>
        </div>
        <i
          className="ionicons icon ion-ios-menu"
          onClick={() => setMenuActive(!menuActive)}
        />
      </nav>
    </div>
  );
}
