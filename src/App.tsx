import "./App.css";
import { useAuth } from "./features/auth/auth.hook";

function App() {
  const auth = useAuth();
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">
          Hello, {auth.user?.name}
        </h1>

        <button
          type="button"
          onClick={() => {
            auth.logout();
          }}
        >
          LOG OUT
        </button>
      </div>
    </>
  );
}

export default App;
