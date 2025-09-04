import { useAuth } from "../auth/auth.hook"
import UserManagementPanel from "./components/UserManagementPanel"

const SettingsPage = () => {

	const auth = useAuth()
	const isAdmin = auth.user?.isAdmin || false


	return (
		<div className="flex flex-col">
			<h1 className="">Settings</h1>
			{isAdmin && <UserManagementPanel />}
		</div>
	)
}

export default SettingsPage
