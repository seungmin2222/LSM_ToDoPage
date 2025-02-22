import KanbanBoard from '@/components/kanban/board/KanbanBoard';
import KanbanMetrics from '@/components/metrics/KanbanMetrics';

export default function KanbanPage() {
  return (
    <div className="min-h-screen select-none bg-gray-900 p-6">
      <KanbanMetrics />
      <KanbanBoard />
    </div>
  );
}
