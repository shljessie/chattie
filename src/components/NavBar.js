import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function NavBar() {
  const uuid = uuidv4();

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Chattie: Consistency Evaluation</h1>
      <div className="navbar-uuid">Prolific (UUID for now): {uuid}</div>
    </nav>
  );
}

export default NavBar;
