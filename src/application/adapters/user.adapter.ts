import type { User } from "@/features/auth/auth.context";
import type { UserDTO } from "../models/user.dto";

export function parseUserFromApi(dto: UserDTO): User {
	return {
		email: dto.email,
		id: dto.id,
		name: dto.name,
		isAdmin: dto.isAdmin,
		isAuthorized: dto.isAuthorized,
	}

}
