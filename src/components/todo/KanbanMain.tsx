'use client';

import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useKanbanStore } from '@/stores/kanban';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import KanbanFooter from './KanbanFooter';
import KanbanHeader from './KanbanHeader';

export default function KanbanMain() {
  const { columns, columnOrder } = useKanbanStore((state) => state.board);

  const { handleDragOver, handleDragEnd } = useDragAndDrop({
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

  return (
    <main className="rounded-xl bg-gray-800 p-6">
      <KanbanHeader />
      <DndContext
        sensors={sensors}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
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
                />
              );
            })}
          </SortableContext>
        </div>
      </DndContext>
      <KanbanFooter />
    </main>
  );
}
