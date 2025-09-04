import { useAuth } from "../auth.hook";

export default function UnauthorizedPage() {
	const auth = useAuth();
	return (
		<div className="p-8 bg-bg-dark w-full h-full flex flex-col justify-center items-center">
			<h1 className="text-2xl font-bold">Acceso pendiente</h1>
			<p>
				Tu cuenta está registrada, pero aún no has sido autorizado por un
				administrador.
			</p>
			<p>Vuelve a intentarlo más tarde.</p>
			<div className="flex gap-2 mt-5">
				<button
					type="button"
					className="bg-bg py-2 px-4 rounded-full drop-shadow-sm hover:drop-shadow-md hover:cursor-pointer hover:bg-bg-light"
					onClick={() => {
						window.location.reload();
					}}
				>
					Refresh
				</button>

				<button
					type="button"
					className="bg-bg py-2 px-4 rounded-full drop-shadow-sm hover:drop-shadow-md hover:cursor-pointer hover:bg-bg-light"
					onClick={() => {
						auth.logout();
					}}
				>
					Log out
				</button>
			</div>
		</div>
	);
}
