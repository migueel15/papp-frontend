import { useState } from "react";
import type { User } from "@/features/auth/auth.context";
import { updateUser, deleteUser } from "../user.service";
import DeleteIcon from "@/assets/icons/trash.svg?react";
import ConfirmDeleteUserModal from "./ConfirmDeleteUserModal";

interface UserCardProps {
	user: User;
	onUserUpdate: (updatedUser: User) => void;
	onUserDelete: (userId: string) => void;
}

const AdminIcon = ({
	isAdmin,
	onClick,
}: {
	isAdmin: boolean;
	onClick: () => void;
}) => {
	const colorRadius = isAdmin ? "border-success" : "border-danger";
	return (
		<div
			className={`rounded-full px-2 border-1 ${colorRadius} cursor-pointer hover:opacity-80 transition-opacity`}
			onClick={onClick}
		>
			<span className="text-text-muted">Admin: </span>
			{isAdmin ? (
				<span className="text-success">YES</span>
			) : (
				<span className="text-danger">NO</span>
			)}
		</div>
	);
};

const AuthorizedIcon = ({
	isAuthorized,
	onClick,
}: {
	isAuthorized: boolean;
	onClick: () => void;
}) => {
	const colorRadius = isAuthorized ? "border-success" : "border-danger";
	return (
		<div
			className={`rounded-full px-2 border-1 ${colorRadius} cursor-pointer hover:opacity-80 transition-opacity`}
			onClick={onClick}
		>
			<span className="text-text-muted">Authorized: </span>{" "}
			{isAuthorized ? (
				<span className="text-success">YES</span>
			) : (
				<span className="text-danger">NO</span>
			)}
		</div>
	);
};

const UserCard = ({ user, onUserUpdate, onUserDelete }: UserCardProps) => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleToggleAdmin = async () => {
		try {
			const updatedUser = await updateUser(user.id, { isAdmin: !user.isAdmin });
			onUserUpdate(updatedUser);
		} catch (error) {
			console.error("Error toggling admin status:", error);
		}
	};

	const handleToggleAuthorized = async () => {
		try {
			const updatedUser = await updateUser(user.id, {
				isAuthorized: !user.isAuthorized,
			});
			onUserUpdate(updatedUser);
		} catch (error) {
			console.error("Error toggling authorized status:", error);
		}
	};

	const handleDeleteClick = () => {
		setShowDeleteModal(true);
	};

	const handleDeleteConfirm = async () => {
		try {
			await deleteUser(user.id);
			onUserDelete(user.id);
			setShowDeleteModal(false);
		} catch (error) {
			console.error("Error deleting user:", error);
		}
	};

	return (
		<>
			<div
				className="w-fit bg-bg-dark flex my-2 gap-2 py-2 px-4 rounded-full"
				key={user.id}
			>
				<p>
					{user.name}{" "}
					<span className="text-text-muted text-sm">({user.email})</span>
				</p>
				<div className="flex items-center gap-2 text-sm">
					<AdminIcon
						isAdmin={user.isAdmin || false}
						onClick={handleToggleAdmin}
					/>
					<AuthorizedIcon
						isAuthorized={user.isAuthorized || false}
						onClick={handleToggleAuthorized}
					/>
					<DeleteIcon
						onClick={handleDeleteClick}
						className="w-4 h-4 text-text-muted cursor-pointer hover:text-danger ml-2"
					/>
				</div>
			</div>

			<ConfirmDeleteUserModal
				isOpen={showDeleteModal}
				onClose={() => setShowDeleteModal(false)}
				onConfirm={handleDeleteConfirm}
				userName={user.name}
				userEmail={user.email}
			/>
		</>
	);
};

export default UserCard;
