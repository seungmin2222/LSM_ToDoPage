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
import MetricCard from './MetricCard';

export default function KanbanMetrics() {
  const { columns, columnOrder } = useKanbanStore((state) => state.board);
  const deleteColumn = useKanbanStore((state) => state.deleteColumn);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const { handleDragEnd } = useDragAndDrop({
    columns,
    columnOrder,
    enableTaskDrag: false,
  });

  const metrics = columnOrder.map((columnId) => {
    const column = columns[columnId];
    return {
      id: columnId,
      label: column.title,
      value: column.taskIds.length,
    };
  });

  return (
    <header className="mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">To-Do List</h1>
          <p className="mt-1 text-sm text-gray-400">
            작업을 효율적으로 관리하세요
          </p>
        </div>
      </div>
      <div className="flex overflow-x-auto pb-4">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="mt-4 flex gap-2">
            <SortableContext items={columnOrder}>
              {metrics.map((metric) => (
                <MetricCard
                  key={metric.id}
                  id={metric.id}
                  label={metric.label}
                  value={metric.value}
                  onDelete={() => deleteColumn(metric.id)}
                />
              ))}
            </SortableContext>
          </div>
        </DndContext>
      </div>
    </header>
  );
}
