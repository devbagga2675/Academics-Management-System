import React from "react";
import { NavLink } from "react-router-dom";

const SideNavLink = ({to, children, end}) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: "none",
        color: isActive ? "#1976d2" : "inherit",
        padding: "4px 12px",
        borderRadius: "4px",
        backgroundColor: isActive ? "#e2e4ea" : "transparent",
      })}
      end={end}
    >
      {children}
    </NavLink>
  );
};

export default SideNavLink;
