import React from "react";
import { Navbar } from "./NavBar";
import type { GithubUser } from "./types";

export function Layout({ children }: React.PropsWithChildren<{}>) {
  const [githubUser, setGithubUser] = React.useState<GithubUser | null>(null);
  const [isAuthenticating, setIsAuthenticating] = React.useState(false);
  const [authError, setAuthError] = React.useState<string | null>(null);

  async function grantAuthrizationCode() {
    const CLIENT_ID = "VOTRE CLIENT_ID ICI"; // Remplacez par votre client ID GitHub
    const loginUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;
    window.location.href = loginUrl;
  }

  async function getUserInfo(code: string) {
    const response = await fetch("/api/auth/github/callback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    return await response.json();
  }

  async function loginFlow() {
    if (isAuthenticating) {
      return; // Prevent multiple clicks
    }
    setIsAuthenticating(true);
    try {
      await grantAuthrizationCode(); // this will redirect the user to GitHub for authorization
    } catch (error) {
      setAuthError("Échec de la connexion avec GitHub");
      setIsAuthenticating(false);
    }
  }

  const isCallbackUrl = window.location.search.includes("code=");

  React.useEffect(() => {
    const handleAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) {
        try {
          const userData = await getUserInfo(code);

          setGithubUser({
            username: userData.login,
            avatarUrl: userData.avatar_url,
          });
        } catch (error) {
          setAuthError("Échec de la récupération des informations utilisateur");
        } finally {
          setIsAuthenticating(false);
        }
      }
    };

    if (isCallbackUrl) {
      handleAuthCallback();
    }
  }, [isCallbackUrl]);

  return (
    <>
      <header>
        {isAuthenticating ? (
          <span>Connexion en cours...</span>
        ) : (
          <Navbar onLoginWithGithub={loginFlow} user={githubUser} />
        )}
        {authError && <div className="error">{authError}</div>}
      </header>
      <main>{children}</main>
    </>
  );
}
