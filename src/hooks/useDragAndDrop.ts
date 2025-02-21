import { useKanbanStore } from '@/stores/kanban';
import { Column } from '@/types/kanban';
import { DragEndEvent, DragOverEvent } from '@dnd-kit/core';

interface UseDragAndDropProps {
  columns: {
    [key: string]: Column;
  };
  columnOrder: string[];
  enableTaskDrag?: boolean;
}

export const useDragAndDrop = ({
  columns,
  columnOrder,
  enableTaskDrag = true,
}: UseDragAndDropProps) => {
  const moveTask = useKanbanStore((state) => state.moveTask);
  const reorderColumn = useKanbanStore((state) => state.reorderColumn);

  const handleDragOver = (event: DragOverEvent) => {
    if (!enableTaskDrag) return;

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (activeId === overId) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;

    if (activeData.type === 'Task' && activeData.task) {
      let targetColumnId = '';
      let newIndex = 0;

      if (overData.type === 'Task' && overData.task) {
        targetColumnId = overData.task.columnId;
        newIndex = columns[overData.task.columnId].taskIds.indexOf(overId);
      } else if (overData.type === 'Column') {
        targetColumnId = overId;
        newIndex = columns[targetColumnId].taskIds.length;
      }

      if (targetColumnId) {
        moveTask(activeId, activeData.task.columnId, targetColumnId, newIndex);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (activeId === overId) return;

    const activeData = active.data.current;

    if (!activeData) return;

    if (activeData.type === 'Column') {
      const oldIndex = columnOrder.indexOf(activeId);
      const newIndex = columnOrder.indexOf(overId);

      reorderColumn(oldIndex, newIndex);
    }
  };

  return {
    handleDragOver,
    handleDragEnd,
  };
};
