import { Column, Task } from '@/types/kanban';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useState } from 'react';

type ActiveItem =
  | { type: 'Task'; data: Task }
  | { type: 'Column'; data: Column }
  | null;

export const useKanbanDrag = (
  tasks: Record<string, Task>,
  columns: Record<string, Column>
) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const getActiveItem = (): ActiveItem => {
    if (!activeId) return null;

    const id = String(activeId);

    if (tasks[id]) {
      return {
        type: 'Task',
        data: tasks[id],
      };
    }

    if (columns[id]) {
      return {
        type: 'Column',
        data: columns[id],
      };
    }

    return null;
  };

  return {
    activeId,
    setActiveId,
    getActiveItem,
  };
};
