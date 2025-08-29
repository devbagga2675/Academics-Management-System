import React from "react";
import { NavLink } from "react-router-dom";

const SideNavLink = ({ to, children, end }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: "none",
        color: isActive ? "#4FD1C5" : "#A0B1B0",
        padding: "4px 16px",
        borderRadius: "4px",
        backgroundColor: isActive ? "rgba(79, 209, 197, 0.1)" : "transparent",
        transition: "all 0.2s ease-in-out",
        fontSize: "14px",
        fontWeight: isActive ? 400 : 400,
        "&:hover": {
          backgroundColor: isActive ? "rgba(79, 209, 197, 0.15)" : "#2B394A",
          color: isActive ? "#4FD1C5" : "#E8F3F1",
          cursor: "pointer",
        },
      })}
      end={end}
    >
      {children}
    </NavLink>
  );
};

export default SideNavLink;