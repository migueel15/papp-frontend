import {
	createContext,
	type ReactNode,
	useCallback,
	useEffect,
	useState,
} from "react";
import * as AuthService from "@/features/auth/auth.service";

export interface User {
	id: string;
	name: string;
	email: string;
	picture?: string;
	isAuthorized?: boolean;
	isAdmin?: boolean;
}

interface AuthContextType {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	initAuth: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	const initAuth = useCallback(async () => {
		setLoading(true);
		try {
			const { user } = await AuthService.getProfile();
			setUser(user);
			setIsAuthenticated(true);
		} catch (error) {
			setUser(null);
			setIsAuthenticated(false);
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		initAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				isAuthenticated,
				setIsAuthenticated,
				loading,
				setLoading,
				initAuth,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
