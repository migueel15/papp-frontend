interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-white active:scale-95"
      aria-label="Crear nueva tarea"
    >
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        strokeWidth={2.5}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M12 4v16m8-8H4" 
        />
      </svg>
    </button>
  );
};

export default FloatingActionButton;