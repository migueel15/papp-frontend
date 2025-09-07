import type { Label } from "../models/task"

const Labels = ({
	labels
}: {
	labels: Label[]
}) => {
	return (
		<div className="flex gap-2 overflow-x-scroll max-w-60">
			{labels && labels.map((l) => {
				return <p key={l.id} className="inline-flex items-center rounded-full bg-bg-dark/45 py-1 px-2 text-xs border-1" style={{ color: l.color }}>{l.name}</p>
			})}
		</div>
	)
}

export default Labels
