import type { Task } from '../models/task'

/**
 * Calcula el color de fondo progresivo basado en el movimiento del swipe
 */
export const getBackgroundColor = (movement: number, currentStatus: string): string => {
  const intensity = Math.min(Math.abs(movement) / 100, 1)
  
  if (movement > 50 && currentStatus === 'todo') {
    // Verde progresivo para completar tarea
    const lightness = 90 - intensity * 50
    return `hsl(109, 58%, ${lightness}%)`
  } else if (movement < -50 && currentStatus === 'done') {
    // Amarillo progresivo para marcar como pendiente
    const lightness = 90 - intensity * 41  
    return `hsl(35, 77%, ${lightness}%)`
  }
  
  return 'rgb(243, 244, 246)' // bg-bg-light por defecto
}

/**
 * Activa feedback háptico suave en dispositivos compatibles
 */
export const triggerHapticFeedback = (): void => {
  if ('vibrate' in navigator) {
    navigator.vibrate(50) // Vibración suave de 50ms
  }
}

/**
 * Determina si una tarea puede ser swipeada en una dirección específica
 */
export const canSwipe = (task: Task, direction: 'left' | 'right'): boolean => {
  if (direction === 'right' && task.status === 'todo') return true
  if (direction === 'left' && task.status === 'done') return true
  return false
}

/**
 * Obtiene el nuevo estado basado en el estado actual y la dirección del swipe
 */
export const getNewStatus = (currentStatus: string, direction: 'left' | 'right'): 'todo' | 'done' | null => {
  if (direction === 'right' && currentStatus === 'todo') return 'done'
  if (direction === 'left' && currentStatus === 'done') return 'todo'
  return null
}