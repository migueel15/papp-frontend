import "./App.css";
import { useGoogleLogin } from "@react-oauth/google";

function App() {
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log("Login Success:", codeResponse);

      const response = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
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
      localStorage.setItem("access_token", data.access_token);
    },
    onError: (error) => {
      console.error("Login Failed:", error);
      // Handle login failure
    },
    flow: "auth-code",
    redirect_uri: "http://localhost:4200",
  });

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
      </div>
    </>
  );
}

export default App;
