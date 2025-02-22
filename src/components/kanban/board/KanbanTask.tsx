'use client';

import { useKanbanStore } from '@/stores/kanban';
import { Task } from '@/types/kanban';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import KanbanTaskDetail from '../forms/KanbanTaskDetail';
import KanbanTaskForm from '../forms/KanbanTaskForm';

interface KanbanTaskProps {
  taskId: string;
  columnId: string;
  task: Task;
}

export default function KanbanTask({
  taskId,
  columnId,
  task,
}: KanbanTaskProps) {
  const deleteTask = useKanbanStore((state) => state.deleteTask);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: taskId,
    data: {
      type: 'Task',
      task: task,
    },
  });

  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFormOpen(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('정말로 이 일정을 삭제하시겠습니까?')) {
      deleteTask(taskId);
    }
  };

  const handleCardClick = () => {
    setIsDetailOpen(true);
  };

  const handleEditFromDetail = () => {
    setIsDetailOpen(false);
    setIsFormOpen(true);
  };

  const handleDeleteFromDetail = (taskId: string) => {
    if (window.confirm('정말로 이 일정을 삭제하시겠습니까?')) {
      deleteTask(taskId);
      setIsDetailOpen(false);
    }
  };

  const formattedStartDate = format(
    new Date(task.dueDate.start),
    'yyyy-MM-dd',
    {
      locale: ko,
    }
  );
  const formattedEndDate = format(new Date(task.dueDate.end), 'yyyy-MM-dd', {
    locale: ko,
  });

  return (
    <>
      <div
        ref={setNodeRef}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          opacity: isDragging ? 0.5 : 1,
        }}
        {...attributes}
        {...listeners}
        className="group cursor-pointer rounded-lg border border-gray-700 bg-gray-900 p-3 transition-all hover:bg-gray-700"
        onClick={handleCardClick}
      >
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <div className="w-full truncate text-white">{task.title}</div>
            <div className="mt-1 text-sm text-gray-400">
              {formattedStartDate === formattedEndDate
                ? formattedStartDate
                : `${formattedStartDate} → ${formattedEndDate}`}
            </div>
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="rounded border border-gray-400/50 px-2 py-1 text-gray-400 opacity-0 transition-all hover:border-white hover:text-white group-hover:opacity-100"
          >
            ✎
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded border border-red-400/50 px-2 py-1 text-red-400 opacity-0 transition-all hover:border-red-300 hover:text-red-300 group-hover:opacity-100"
          >
            Ｘ
          </button>
        </div>
      </div>
      {isFormOpen && (
        <KanbanTaskForm
          onClose={() => setIsFormOpen(false)}
          columnId={columnId}
          initialData={task}
        />
      )}
      {isDetailOpen && (
        <KanbanTaskDetail
          taskId={taskId}
          onEdit={handleEditFromDetail}
          onDelete={handleDeleteFromDetail}
          onClose={() => setIsDetailOpen(false)}
        />
      )}
    </>
  );
}
