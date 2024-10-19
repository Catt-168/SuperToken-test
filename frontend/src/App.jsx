import * as reactRouterDom from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import "./App.css";
import Home from "./Home";

SuperTokens.init({
  appInfo: {
    appName: "auth-test",
    apiDomain: "http://localhost:3000",
    websiteDomain: "http://localhost:5173",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [EmailPassword.init(), Session.init()],
});

function App() {
  return (
    <SuperTokensWrapper>
      <BrowserRouter>
        <Routes>
          {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
            EmailPasswordPreBuiltUI,
          ])}
          <Route
            path="/"
            element={
              <SessionAuth>
                <Home />
              </SessionAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </SuperTokensWrapper>
  );
}

export default App;
