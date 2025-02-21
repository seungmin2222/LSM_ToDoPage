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

  const handleClick = () => {
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
      onClick={handleClick}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="flex flex-shrink-0 cursor-grab gap-4"
    >
      <div className="relative flex-shrink-0 justify-items-center rounded-lg bg-gray-800 px-4 py-3 text-center transition-all duration-200 hover:scale-110 hover:bg-gray-700">
        <div className="min-w-10">
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-xl font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}
