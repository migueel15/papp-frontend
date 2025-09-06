import type { TaskSectionType } from "../models/task"

const TaskSection = ({
	section,
	currentSection,
	onClick
}: {
	section: TaskSectionType
	currentSection: TaskSectionType
	onClick: (newSection: TaskSectionType) => void
}) => {
	const isCurrent = section === currentSection
	const color = isCurrent ? "text-text" : "text-text-muted"


	return (
		<div className={`flex flex-col gap-2 cursor-pointer ${color}`} onClick={() => onClick(section)}>
			<p className="px-2 select-none">{section.charAt(0).toUpperCase() + section.slice(1)}</p>
			{isCurrent && <p className="h-[1px] bg-text-muted rounded-full" />}
		</div>
	)
}

export default TaskSection
