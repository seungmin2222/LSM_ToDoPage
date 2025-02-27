'use client';

import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useKanbanDrag } from '@/hooks/useKanbanDrag';
import { useKanbanStore } from '@/stores/kanban';
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import { ColumnOverlay, TaskOverlay } from './KanbanDragOverlay';
import KanbanHeader from './KanbanHeader';
import KanbanScrollGuide from './KanbanScrollGuide';

export default function KanbanBoard() {
  const { columns, columnOrder, tasks } = useKanbanStore(
    (state) => state.board
  );

  const { activeId, setActiveId, getActiveItem } = useKanbanDrag(
    tasks,
    columns
  );

  const { handleDragStart, handleDragOver, handleDragEnd, previewState } =
    useDragAndDrop({
      columns,
      columnOrder,
    });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
    handleDragStart(event);
  };

  const renderOverlay = () => {
    const activeItem = getActiveItem();
    if (!activeItem) return null;

    if (activeItem.type === 'Task') {
      return <TaskOverlay task={activeItem.data} />;
    }

    if (activeItem.type === 'Column') {
      return <ColumnOverlay column={activeItem.data} />;
    }

    return null;
  };

  return (
    <main className="rounded-xl bg-gray-800 p-6">
      <KanbanHeader />
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragOver={handleDragOver}
        onDragEnd={(event) => {
          handleDragEnd(event);
          setActiveId(null);
        }}
      >
        <div className="mt-8 flex gap-3 overflow-x-auto pb-4">
          <SortableContext items={columnOrder}>
            {columnOrder.map((columnId) => {
              const column = columns[columnId];
              return (
                <KanbanColumn
                  key={columnId}
                  id={columnId}
                  title={column.title}
                  taskIds={column.taskIds}
                  previewState={previewState}
                />
              );
            })}
          </SortableContext>
        </div>

        <DragOverlay>{activeId && renderOverlay()}</DragOverlay>
      </DndContext>
      <KanbanScrollGuide />
    </main>
  );
}
