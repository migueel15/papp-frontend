import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'
import type { Task } from '../models/task'
import SwipeIndicators from './SwipeIndicators'
import Status from './Status'
import Priority from './Priority'
import EditIcon from "@/assets/icons/edit.svg?react"
import DeleteIcon from "@/assets/icons/trash.svg?react"
import { getBackgroundColor, triggerHapticFeedback, getNewStatus } from '../utils/swipeHelpers'

interface SwipeableTaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: 'todo' | 'done') => void;
  onDelete: (taskId: string) => void;
  onEdit: () => void;
}

const SwipeableTaskCard = ({ task, onStatusChange, onDelete, onEdit }: SwipeableTaskCardProps) => {
  const [{ x, backgroundColor }, api] = useSpring(() => ({
    x: 0,
    backgroundColor: 'rgb(243, 244, 246)', // bg-bg-light
  }))

  const bind = useDrag(({ down, movement: [mx], direction: [xDir], cancel }) => {
    const threshold = 100 // Distancia mínima para activar acción
    
    if (down && Math.abs(mx) > threshold) {
      cancel() // Cancela el drag
      
      // Determinar la dirección del swipe
      const swipeDirection = xDir > 0 ? 'right' : 'left'
      const newStatus = getNewStatus(task.status, swipeDirection)
      
      if (newStatus) {
        onStatusChange(task.id, newStatus)
        triggerHapticFeedback()
      }
    }

    // Animación durante el swipe
    api.start({
      x: down ? mx : 0,
      backgroundColor: down ? getBackgroundColor(mx, task.status) : 'rgb(243, 244, 246)',
      immediate: down,
    })
  }, {
    axis: 'x', // Solo permitir swipe horizontal
    rubberband: true, // Efecto elástico en los extremos
  })

  return (
    <div className="relative overflow-hidden rounded-lg mb-3 shadow-sm border border-border-muted">
      {/* Indicadores de swipe en el fondo */}
      <SwipeIndicators taskStatus={task.status} />
      
      {/* Contenido de la tarjeta con animación */}
      <animated.div
        {...bind()}
        style={{ x, backgroundColor }}
        className="relative z-10 p-4 cursor-grab active:cursor-grabbing select-none"
      >
        {/* Header con título y acciones */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start flex-1">
            <h3 className="text-lg font-semibold text-text flex-1">{task.title}</h3>
          </div>
          <div className="flex gap-2 ml-2">
            <EditIcon 
              className="w-4 h-4 text-text-muted cursor-pointer hover:text-text" 
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }} 
            />
            <DeleteIcon 
              className="w-4 h-4 text-text-muted cursor-pointer hover:text-danger" 
              onClick={(e) => {
                e.stopPropagation()
                onDelete(task.id)
              }} 
            />
          </div>
        </div>

        {/* Fecha de vencimiento */}
        {task.dueDate && (
          <div className="text-sm text-text-muted mb-2">
            {task.dueDate.toLocaleString("es-ES", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </div>
        )}

        {/* Status y Priority */}
        <div className="flex items-center gap-3">
          <Status value={task.status} />
          <Priority value={task.priority} />
        </div>
      </animated.div>
    </div>
  )
}

export default SwipeableTaskCard