import "./NavBar.css";

export function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="#todo">À faire</a>
        </li>
        <li>
          <a href="#planifier">Planifier</a>
        </li>
      </ul>
    </nav>
  );
}
