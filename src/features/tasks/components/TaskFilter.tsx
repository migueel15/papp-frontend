import { Menu, MenuButton, MenuItem, MenuItems, Select, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import FilterIcon from "@/assets/icons/filter.svg?react"
import { useEffect, useState } from 'react'
import type { TaskStatus } from '../models/task.dto'
import type { Task, TaskFilter } from '../models/task'
import { status } from "@/features/tasks/models/task"



const TaskFilterModal = (
	{ onFilterUpdate }: { onFilterUpdate: (filter: TaskFilter) => void }
) => {

	const [selectedStatus, setSelectedStatus] = useState<{ name: string, value: string }[]>([])

	useEffect(() => {
		const statusArray: Task["status"][] = selectedStatus.map((s) => s.value as Task["status"])
		onFilterUpdate({
			status: statusArray
		})
	}, [selectedStatus])

	return (

		<>

			<Menu>
				<MenuButton className="bg-bg p-2 rounded-md text-sm text-text-muted outline-none">
					<FilterIcon width={15} height={15} />
				</MenuButton>
				<MenuItems anchor="bottom end" className="outline-none bg-bg p-2 rounded-md">

					<Select name="status" aria-label="Project status">
						<option value="active">Active</option>
						<option value="paused">Paused</option>
						<option value="delayed">Delayed</option>
						<option value="canceled">Canceled</option>
					</Select>

					<Listbox value={selectedStatus} onChange={setSelectedStatus} multiple>
						<ListboxButton>Status</ListboxButton>
						<ListboxOptions anchor="bottom end" className="bg-bg p-2 rounded-md">
							{status.map((s) => (
								<ListboxOption key={s.name} value={s}>
									{s.name}
								</ListboxOption>
							))}
						</ListboxOptions>
					</Listbox>

				</MenuItems>

			</Menu>
		</>
	)
}

export default TaskFilterModal
