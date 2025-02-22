import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';

interface MetricCardProps {
  id: string;
  label: string;
  value: number;
  onDelete: () => void;
}

export default function MetricCard({
  id,
  label,
  value,
  onDelete,
}: MetricCardProps) {
  const [isDragging, setIsDragging] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      data: {
        type: 'Column',
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = () => {
    if (!isDragging && window.confirm(`'${label}' 컬럼을 삭제하시겠습니까?`)) {
      onDelete();
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="flex flex-shrink-0 cursor-grab gap-4"
    >
      <div className="group relative flex-shrink-0 justify-items-center rounded-lg bg-gray-800 px-4 py-3 text-center transition-all duration-300 hover:scale-105 hover:bg-gray-700 hover:shadow-lg">
        <button
          onClick={handleDelete}
          className="absolute -right-[5px] -top-[5px] hidden h-6 w-6 items-center justify-center rounded-full border border-red-400/50 bg-gray-800 text-xs text-red-400 opacity-0 transition-all hover:border-red-300 hover:bg-red-500 hover:text-white group-hover:flex group-hover:opacity-100"
        >
          Ｘ
        </button>
        <div className="min-w-[4rem] px-1">
          <p className="text-sm font-medium text-gray-400">{label}</p>
          <p className="mt-1 text-xl font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}
