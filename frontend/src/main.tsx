import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Authenticated } from "./Authenticated.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain="so-close-groupe-30.eu.auth0.com"
      clientId="RVdFkvelyFPVsR6QbcxJPmqPzfLFoMor"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://api.so-close.groupe30.socra-sigl.fr",
      }}
    >
      <Authenticated>
        <App />
      </Authenticated>
    </Auth0Provider>
  </StrictMode>
);
