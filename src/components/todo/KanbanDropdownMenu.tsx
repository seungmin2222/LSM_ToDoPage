import { KanbanDropdownMenuProps } from '@/types/kanban';
import { createPortal } from 'react-dom';

export default function KanbanDropdownMenu({
  items,
  onClose,
  position,
}: KanbanDropdownMenuProps) {
  return createPortal(
    <dialog
      open
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 m-0 h-full w-full bg-transparent p-0"
    >
      <div
        className="absolute w-36 rounded-lg border border-gray-700 bg-gray-800 py-1 shadow-lg"
        style={{
          top: `${position.y + 8}px`,
          left: `${position.x}px`,
        }}
      >
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.onClick();
              onClose();
            }}
            className={`flex w-full items-center px-4 py-2 text-sm ${
              item.variant === 'danger' ? 'text-red-400' : 'text-gray-300'
            } hover:bg-gray-700`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </dialog>,
    document.body
  );
}
