interface SwipeIndicatorsProps {
  taskStatus: 'todo' | 'done' | 'in_progress';
}

const SwipeIndicators = ({ taskStatus }: SwipeIndicatorsProps) => (
  <>
    {/* Indicador izquierdo - Marcar como completada (solo si es 'todo') */}
    {taskStatus === 'todo' && (
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-success flex flex-col items-center z-0 opacity-70">
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-xs font-medium">Completar</span>
      </div>
    )}
    
    {/* Indicador derecho - Marcar como pendiente (solo si es 'done') */}
    {taskStatus === 'done' && (
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warning flex flex-col items-center z-0 opacity-70">
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
        <span className="text-xs font-medium">Pendiente</span>
      </div>
    )}
  </>
)

export default SwipeIndicators