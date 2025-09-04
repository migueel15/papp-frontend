import { useEffect } from "react";

interface UseKeyboardShortcutOptions {
	key: string;
	callback: () => void;
	disabled?: boolean;
}

const useKeyboardShortcut = (options: UseKeyboardShortcutOptions) => {
	const { key, callback, disabled = false } = options;

	useEffect(() => {
		if (disabled) return;

		const handler = (event: KeyboardEvent) => {
			// Solo activar si la tecla coincide y no hay modificadores
			if (
				event.key.toLowerCase() === key.toLowerCase() &&
				!event.ctrlKey &&
				!event.metaKey &&
				!event.altKey
			) {
				// No activar si el usuario está escribiendo en un input o textarea
				const target = event.target as HTMLElement;
				if (
					target.tagName === "INPUT" ||
					target.tagName === "TEXTAREA" ||
					target.contentEditable === "true"
				) {
					return;
				}

				event.preventDefault();
				callback();
			}
		};

		document.addEventListener("keydown", handler);

		return () => {
			document.removeEventListener("keydown", handler);
		};
	}, [key, callback, disabled]);
};

export default useKeyboardShortcut;
