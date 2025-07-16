import useAuth from "../auth.service";

const LoginPage = () => {
  const auth = useAuth();

  return (
    <div>
      <h1>Este es el login</h1>
      <button onClick={() => auth.login()}>Login</button>
    </div>
  );
};

export default LoginPage;
