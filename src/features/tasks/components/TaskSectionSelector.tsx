import { Select } from "@headlessui/react"
import type { TaskSectionType } from "../models/task"
import TaskSection from "./TaskSection"

const TaskSectionSelector = ({
	currentSection = "overview",
	updateSection
}: {
	currentSection: TaskSectionType
	updateSection: (newSection: TaskSectionType) => void
}) => {

	return (
		<div className="mb-5">
			<div className="hidden md:flex gap-5">
				<TaskSection section="overview" currentSection={currentSection} onClick={updateSection} />
				<TaskSection section="upcoming" currentSection={currentSection} onClick={updateSection} />
				<TaskSection section="today" currentSection={currentSection} onClick={updateSection} />
				<TaskSection section="campus" currentSection={currentSection} onClick={updateSection} />
			</div>

			<div className="md:hidden mb-2">
				<Select name="status">
					<option value="overview" onClick={() => updateSection("overview")}>Overview</option>
					<option value="upcoming" onClick={() => updateSection("upcoming")}>Upcoming</option>
					<option value="today" onClick={() => updateSection("today")}>Today</option>
					<option value="campus" onClick={() => updateSection("campus")}>Campus</option>
				</Select>
			</div>

			<p className="bg-text-muted/20 w-full h-[1px] -mt-[1px]" />

		</div>
	)
}

export default TaskSectionSelector
