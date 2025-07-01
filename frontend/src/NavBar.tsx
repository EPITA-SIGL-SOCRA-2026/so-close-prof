import "./NavBar.css";
import type { GithubUser } from "./types";

export function Navbar({
  onLoginWithGithub,
  user,
}: {
  onLoginWithGithub?: () => Promise<void>;
  user?: GithubUser | null;
}) {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="#todo">À faire</a>
        </li>
        <li>
          <a href="#planifier">Planifier</a>
        </li>
        <li>
          {user ? (
            <span>{user.username}</span>
          ) : (
            <button onClick={() => onLoginWithGithub?.()}>
              Se connecter avec Gihtub
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
