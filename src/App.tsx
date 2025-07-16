import { useState } from "react";
import "./App.css";
import { useGoogleLogin } from "@react-oauth/google";
import { fetchAuthorized } from "./application/utils";

function App() {
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log("Login Success:", codeResponse);

      const response = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: codeResponse.code,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Server Response:", data);
      // guardar en localStorage por ahora
      localStorage.setItem("accessToken", data.accessToken);
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      // Handle login failure
    },
    flow: "auth-code",
    redirect_uri: "http://localhost:4200",
  });

  const refresh = async () => {
    const res = await fetch("http://localhost:3000/auth/refresh", {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    console.log("Refresh Token Response:", data);
    // Update localStorage with new access token
    localStorage.setItem("accessToken", data.accessToken);
  };

  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState("");

  return (
    <>
      <div>
        <button
          onClick={() => {
            login();
          }}
        >
          Login with Google
        </button>

        <button
          onClick={() => {
            refresh();
          }}
        >
          Refresh token
        </button>

        <button
          onClick={async () => {
            const res = await fetchAuthorized(
              "http://localhost:3000/auth/profile",
              {
                method: "GET",
              },
            );
            if (!res.ok) {
              const errorText = await res.text();
              setError(`Error fetching profile: ${errorText}`);
              console.error("Profile fetch error:", errorText);
              return;
            }
            const data = await res.json();
            setProfile(data);
            console.log("Profile Data:", data);
          }}
        >
          Get profile
        </button>
        {profile && (
          <div>
            <h2>Profile Information</h2>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </>
  );
}

export default App;
