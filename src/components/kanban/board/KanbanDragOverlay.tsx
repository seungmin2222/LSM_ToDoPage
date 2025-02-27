import { Column, Task } from '@/types/kanban';

type TaskOverlayProps = {
  task: Task;
};

type ColumnOverlayProps = {
  column: Column;
};

export const TaskOverlay = ({ task }: TaskOverlayProps) => {
  return (
    <div className="cursor-grabbing rounded-lg border border-gray-700 bg-gray-900 p-3 shadow-xl">
      <div className="w-full truncate text-white">{task.title}</div>
      {task.dueDate && (
        <div className="mt-1 text-sm text-gray-400">
          {new Date(task.dueDate.start).toLocaleDateString()}
          {task.dueDate.start !== task.dueDate.end &&
            ` → ${new Date(task.dueDate.end).toLocaleDateString()}`}
        </div>
      )}
    </div>
  );
};

export const ColumnOverlay = ({ column }: ColumnOverlayProps) => {
  return (
    <div className="w-80 flex-shrink-0">
      <div className="rounded-lg border border-gray-700 p-3">
        <h3 className="max-w-[180px] overflow-hidden truncate font-medium text-white">
          {column.title}
        </h3>
      </div>
    </div>
  );
};
