import React from "react";

const Navbar = ({ onLogout, appTitle }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.title}>{appTitle}</div> {/* Display app title */}
      <button onClick={onLogout} style={styles.logoutButton}>
        Logout
      </button>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between", // Space between title and logout button
    padding: "10px",
    backgroundColor: "#333",
    color: "white",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  logoutButton: {
    padding: "8px 16px",
    fontSize: "16px",
    backgroundColor: "#f44336", // Red background color for logout
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Navbar;
