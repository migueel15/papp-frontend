import type { Label } from "../models/task"
import PlusSmallIcon from "@/assets/icons/plus-small.svg?react"
import useTask from "../useTask"

const TaskHeader = ({
	title,
	onCreateTask,
	labels
}: {
	title: string
	onCreateTask: () => void
	labels: Label[]
}) => {
	return (
		<div className="flex items-center">
			<h2 className="p-4">{title.charAt(0).toUpperCase() + title.slice(1)}</h2>

			<button
				onClick={onCreateTask}
				className="ml-auto m-4 px-2 py-2 bg-primary text-bg-dark rounded-md hover:bg-primary/90 transition-colors hidden md:flex items-center justify-center text-sm"
			>
				<PlusSmallIcon width={20} height={20} />
				<p>Add new task</p>
			</button>


		</div>
	)
}

export default TaskHeader
