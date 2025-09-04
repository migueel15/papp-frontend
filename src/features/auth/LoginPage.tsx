import google from "@/assets/google.svg";
import icon from "@/assets/papp.svg";
import { useAuth } from "@/features/auth/auth.hook";

const LoginPage = () => {
	const auth = useAuth();

	return (
		<div className="flex justify-center items-center w-screen h-screen bg-bg-dark">
			<div className="flex flex-col items-center rounded-2xl w-[90%] sm:w-100 px-10 bg-bg shadow-xl">
				<header className="flex flex-col items-center mt-10 mb-auto">
					<img src={icon} alt="papp icon" width={60} />
					<h1 className="font-poppins-semibold text-xl text-text mt-5 mb-10 text-center">
						Log In to your account
					</h1>
				</header>
				<div className="flex flex-col mb-auto gap-2 w-full">
					<input
						type="email"
						className="bg-bg-light rounded-md px-3 h-10 py-2 text-text shadow-sm"
						disabled={true}
						placeholder="Email"
					/>
					<input
						type="password"
						className="bg-bg-light rounded-md px-3 h-10 py-2 text-text shadow-sm"
						disabled={true}
						placeholder="Password"
					/>
					<button
						type="button"
						className="bg-bg-light h-10 shadow-sm w-full rounded-md text-text cursor-pointer hover:bg-highlight hover:text-bg-dark transition duration-200"
					>
						Log in
					</button>
				</div>
				<button
					type="button"
					className="flex justify-center gap-2 shadow-sm bg-bg-light h-12 rounded-md mb-10 mt-5 w-full items-center cursor-pointer px-5 hover:bg-highlight text-text hover:text-bg-dark transition duration-200"
					onClick={() => auth.login()}
				>
					<img src={google} alt="" width={20} className="text-blue-500" />
					<p>Login with Google</p>
				</button>
			</div>
		</div>
	);
};

export default LoginPage;
