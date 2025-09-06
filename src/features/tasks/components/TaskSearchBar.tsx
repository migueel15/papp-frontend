import SearchIcon from "@/assets/icons/search.svg?react";
import { useEffect, useRef } from "react";
import type { TaskFilter } from "../models/task";
const TaskSearchBar = ({
	onFilterTask
}: {
	onFilterTask: (filter: TaskFilter) => void
}) => {

	const searchInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
				e.preventDefault();
				searchInputRef.current?.focus()
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [])

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			searchInputRef.current.value = ""
			onFilterTask({ title: "" })
			searchInputRef.current?.blur();
		}


	};

	return (
		<div className="flex items-center bg-bg rounded-md py-2 px-2 text-text-muted text-sm ml-auto mr-4 md:mr-0">
			<SearchIcon width={15} height={15} />
			<input
				ref={searchInputRef}
				type="text"
				placeholder="Search"
				onChange={(e) =>
					onFilterTask({
						title: e.target.value,
					})
				}
				onKeyDown={handleKeyDown}
				className="w-30 md:w-50 ml-2"
			/>
		</div>

	)
}

export default TaskSearchBar
