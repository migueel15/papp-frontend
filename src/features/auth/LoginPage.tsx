import useAuth from "@/features/auth/auth.service";
import icon from "@/assets/papp.svg";
import google from "@/assets/google.svg";

const LoginPage = () => {
  const auth = useAuth();

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-bg-dark">
      <div className="flex flex-col items-center text-center rounded-2xl w-100 h-100 bg-bg">
        <img src={icon} alt="papp icon" width={60} className="mt-10" />
        <h1 className="font-poppins-semibold text-xl text-text mt-5 mb-10">
          Log In to your account
        </h1>
        <button
          className="bg-bg-light h-12 rounded-2xl text-bg mb-5 flex items-center cursor-pointer"
          onClick={() => auth.login()}
        >
          <img src={google} alt="" width={20} className="mx-2" />
          <p className="mr-2 text-text">Login with Google</p>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
