import { NavLink } from 'react-router-dom';

export function Navigation() {
  return (
    <header className="header">
      <nav className="navigation">
        <NavLink to="/" className="logo-container">
          <img src="./logo.png" className="logo" alt="mopobank logo" />

          <h2 className="title" style={{ textDecoration: 'none'}}>
            mopoBank
          </h2>
        </NavLink>

        <div>
          <div className="link-container">
            <NavLink to="/" className="link">
              Home
            </NavLink>

            <NavLink to="/add" className="link">
              Add
            </NavLink>

            <NavLink to="/history" className="link">
              History
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}