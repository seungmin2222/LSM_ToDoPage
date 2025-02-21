'use client';

import { useKanbanStore } from '@/stores/kanban';
import KanbanColumn from './KanbanColumn';
import KanbanFooter from './KanbanFooter';
import KanbanHeader from './KanbanHeader';

export default function KanbanMain() {
  const { columns, columnOrder } = useKanbanStore((state) => state.board);

  return (
    <main className="rounded-xl bg-gray-800 p-6">
      <KanbanHeader />
      <div className="mt-8 flex gap-2 overflow-x-auto pb-4">
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
      </div>
      <KanbanFooter />
    </main>
  );
}
