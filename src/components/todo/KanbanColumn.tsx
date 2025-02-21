'use client';

import { useKanbanStore } from '@/stores/kanban';
import { MenuItem } from '@/types/kanban';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRef, useState } from 'react';
import KanbanDropdownMenu from './KanbanDropdownMenu';
import KanbanTask from './KanbanTask';
import KanbanTaskForm from './KanbanTaskForm';

interface KanbanColumnProps {
  id: string;
  title: string;
  taskIds: string[];
}

export default function KanbanColumn({
  id,
  title,
  taskIds,
}: KanbanColumnProps) {
  const updateColumn = useKanbanStore((state) => state.updateColumn);
  const deleteColumn = useKanbanStore((state) => state.deleteColumn);
  const tasks = useKanbanStore((state) => state.board.tasks);

  const [showForm, setShowForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [dropdownPosition, setDropdownPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'Column',
    },
  });

  const handleStartEditing = () => {
    setIsEditing(true);
    setEditedTitle(title);
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    });
  };

  const handleTitleSubmit = () => {
    if (editedTitle.trim()) {
      updateColumn(id, editedTitle.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(title);
    }
  };

  const menuItems: MenuItem[] = [
    {
      label: '컬럼명 수정',
      onClick: handleStartEditing,
    },
    {
      label: '컬럼 삭제',
      onClick: () => {
        if (window.confirm('정말로 이 컬럼을 삭제하시겠습니까?')) {
          deleteColumn(id);
        }
      },
      variant: 'danger',
    },
  ];

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="w-80 flex-shrink-0"
    >
      <div
        {...attributes}
        {...listeners}
        className="group mb-3 flex items-center justify-between rounded-lg border border-gray-700 p-3 transition-colors [&:hover:not(:has(button:hover))]:bg-gray-700"
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={handleKeyDown}
            className="w-full rounded border border-gray-600 bg-gray-900 px-2 py-1 text-white focus:border-blue-500 focus:outline-none"
          />
        ) : (
          <h3 className="max-w-[180px] overflow-hidden truncate font-medium text-white">
            {title}
          </h3>
        )}
        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setDropdownPosition({ x: rect.left, y: rect.bottom });
                setShowOptions(!showOptions);
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-500 transition-colors hover:bg-blue-600 hover:text-white"
            >
              ・・・
            </button>
            {showOptions && (
              <KanbanDropdownMenu
                items={menuItems}
                onClose={() => setShowOptions(false)}
                position={dropdownPosition}
              />
            )}
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-500 transition-colors hover:bg-blue-600 hover:text-white"
          >
            ＋
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <SortableContext items={taskIds}>
          {taskIds.map((taskId) => (
            <KanbanTask
              key={taskId}
              taskId={taskId}
              columnId={id}
              task={tasks[taskId]}
            />
          ))}
        </SortableContext>
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800/50 p-3 text-left text-gray-400 transition-all hover:bg-gray-700"
        >
          ＋ 새 태스크 추가
        </button>
      </div>

      {showForm && (
        <KanbanTaskForm onClose={() => setShowForm(false)} columnId={id} />
      )}
    </div>
  );
}
