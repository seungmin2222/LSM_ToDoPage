import { useKanbanStore } from '@/stores/kanban';
import { Column, PreviewState } from '@/types/kanban';
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';

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

  const [previewState, setPreviewState] = useState<PreviewState | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    return event.active.id;
  };

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
        setPreviewState({
          activeId,
          sourceColumnId: activeData.task.columnId,
          targetColumnId,
          newIndex,
        });
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setPreviewState(null);
      return;
    }

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (activeId === overId) {
      setPreviewState(null);
      return;
    }

    const activeData = active.data.current;

    if (!activeData) {
      setPreviewState(null);
      return;
    }

    if (activeData.type === 'Column') {
      const oldIndex = columnOrder.indexOf(activeId);
      const newIndex = columnOrder.indexOf(overId);

      reorderColumn(oldIndex, newIndex);
    } else if (activeData.type === 'Task' && previewState) {
      moveTask(
        previewState.activeId,
        previewState.sourceColumnId,
        previewState.targetColumnId,
        previewState.newIndex
      );
    }

    setPreviewState(null);
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    previewState,
  };
};
