'use client';

import { useKanbanStore } from '@/stores/kanban';
import MetricCard from './MetricCard';

export default function KanbanMetrics() {
  const boards = useKanbanStore((state) => state.boards);
  const deleteBoard = useKanbanStore((state) => state.deleteBoard);

  const metrics = boards.map((board) => ({
    id: board.boardId,
    label: board.title,
    value: board.items.length,
  }));

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
        <div className="mt-4 flex gap-2">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.id}
              label={metric.label}
              value={metric.value}
              onDelete={() => deleteBoard(metric.id)}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
