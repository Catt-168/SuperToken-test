import axios from "axios";
import React, { useEffect } from "react";
import { redirectToAuth } from "supertokens-auth-react";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

export default function Home() {
  const userId = useSessionContext().userId;

  const handleSignOut = async () => {
    await signOut();
    redirectToAuth();
  };

  useEffect(() => {
    async function getAPICall() {
      const apiCall = await axios.get("http://localhost:3000");
      console.log("API", apiCall);
    }
    getAPICall();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>User id is {userId}</p>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}
