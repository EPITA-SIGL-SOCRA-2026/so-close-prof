import { useAuth0 } from "@auth0/auth0-react";

export function Authenticated({ children }: { children?: React.ReactNode }) {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome, {user?.name}!</h1>
          <p>Email: {user?.email}</p>
          {children}
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      )}
    </div>
  );
}
