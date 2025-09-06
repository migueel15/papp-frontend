import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import FilterIcon from "@/assets/icons/filter.svg?react";
import { useEffect, useState } from "react";

import type { Label, Task, TaskFilter } from "../models/task";
import { status } from "@/features/tasks/models/task";

const TaskFilterModal = ({
	onFilterUpdate,
	labels
}: {
	onFilterUpdate: (filter: TaskFilter) => void;
	labels: Label[]
}) => {
	const [selectedStatus, setSelectedStatus] = useState<
		{ name: string; value: string }[]
	>([]);

	const [selectedLabels, setSelectedLabels] = useState<Label[]>([])

	const toggleStatus = (statusItem: { name: string; value: string }) => {
		setSelectedStatus((prev) => {
			const exists = prev.find((s) => s.value === statusItem.value);
			if (exists) {
				return prev.filter((s) => s.value !== statusItem.value);
			}
			return [...prev, statusItem];
		});
	};
	const toggleLabels = (labelItem: Label) => {
		setSelectedLabels((prev) => {
			const exists = prev.find((l) => l.name === labelItem.name);
			if (exists) {
				return prev.filter((l) => l.name !== labelItem.name);
			}
			return [...prev, labelItem];
		});
	};

	useEffect(() => {
		const statusArray: Task["status"][] = selectedStatus.map(
			(s) => s.value as Task["status"],
		);
		onFilterUpdate({
			status: statusArray,
		});
	}, [selectedStatus]);

	useEffect(() => {
		const labelsArray: Label["name"][] = selectedLabels.map(
			(l) => l.name as Label["name"])
		onFilterUpdate({
			labels: labelsArray
		})

	}, [selectedLabels])

	return (
		<Popover>
			<PopoverButton
				className="bg-bg p-2 rounded-md text-sm text-text-muted outline-none"
			>
				<FilterIcon width={15} height={15} />
			</PopoverButton>
			<PopoverPanel
				anchor="bottom start"

				className="outline-none bg-bg p-2 rounded-md min-w-48 z-50 [--anchor-gap:--spacing(2)]"
			>
				<div className="p-2">
					<details className="text-sm font-medium mb-2" open={true}>
						<summary className="select-none">
							Filter by Status
						</summary>

						{status.map((s) => (
							<button
								key={s.value}
								onClick={() => toggleStatus(s)}
								className={`flex items-center w-full px-2 py-1 text-sm rounded hover:bg-bg-dark transition-colors ${selectedStatus.find((selected) => selected.value === s.value)
									? "text-primary"
									: "text-text-muted"
									}`}
							>
								<input
									type="checkbox"
									checked={
										selectedStatus.find(
											(selected) => selected.value === s.value,
										) !== undefined
									}
									onChange={() => { }}
									className="mr-2"
								/>
								{s.name}
							</button>
						))}
					</details>

					<details className="text-sm font-medium mb-2">
						<summary className="select-none">
							Filter by Label
						</summary>

						{labels.map((l) => (
							<button
								key={l.id}
								onClick={() => toggleLabels(l)}
								className={`flex items-center w-full px-2 py-1 text-sm rounded hover:bg-bg-dark transition-colors ${selectedLabels.find((selected) => selected.name === l.name)
									? "text-primary"
									: "text-text-muted"
									}`}
							>
								<input
									type="checkbox"
									checked={
										selectedLabels.find(
											(selected) => selected.name === l.name,
										) !== undefined
									}
									onChange={() => { }}
									className="mr-2"
								/>
								{l.name}
							</button>

						))}
					</details>
				</div>
			</PopoverPanel>
		</Popover>
	);
};

export default TaskFilterModal;
